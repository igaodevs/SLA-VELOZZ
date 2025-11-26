import os
import shutil
import asyncio
import logging
from datetime import datetime
from typing import Optional, Dict, Any, List
from pathlib import Path

from fastapi import (
    APIRouter, 
    UploadFile, 
    File, 
    HTTPException, 
    status, 
    Form, 
    BackgroundTasks,
    Depends
)
from fastapi.concurrency import run_in_threadpool
from pydantic import BaseModel, Field

from ..models.schemas import FileUploadResponse, FileType, UploadStatus, FileInfo
from ..services.file_handler import file_handler

router = APIRouter(prefix="/api/v1", tags=["uploads"])
logger = logging.getLogger(__name__)

# Configurações de upload
CHUNK_SIZE = 5 * 1024 * 1024  # 5MB chunks
MAX_FILE_SIZE = 200 * 1024 * 1024  # 200MB
UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)

# Dicionário para armazenar o estado de uploads em andamento
active_uploads: Dict[str, Dict[str, Any]] = {}

# Utilitários
class UploadChunkRequest(BaseModel):
    chunk_index: int
    total_chunks: int
    file_id: Optional[str] = None
    name: Optional[str] = None

def _get_upload_dir() -> Path:
    """Retorna o diretório de upload, criando se não existir."""
    upload_dir = Path(UPLOAD_FOLDER)
    upload_dir.mkdir(parents=True, exist_ok=True)
    return upload_dir

async def _process_large_file(
    file: UploadFile,
    filename: str,
    file_type: FileType,
    name: str,
    file_size: int
) -> FileInfo:
    """Processa um arquivo grande em segundo plano."""
    try:
        # Usa o file_handler para salvar o arquivo em chunks
        saved_info = await file_handler.save_uploaded_file(
            file=file,
            filename=filename,
            file_type=file_type,
            name=name,
            chunk_size=CHUNK_SIZE
        )
        return saved_info
    except Exception as e:
        logger.error(f"Erro ao processar arquivo grande {filename}: {str(e)}", exc_info=True)
        raise

@router.post("/upload/{file_type}", response_model=FileUploadResponse)
async def upload_file(
    file_type: FileType,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    name: Optional[str] = Form(None),
    chunk_index: Optional[int] = Form(None),
    total_chunks: Optional[int] = Form(None),
    file_id: Optional[str] = Form(None)
):
    """
    Endpoint para upload de arquivos, com suporte a upload em partes (chunks).
    
    - Para arquivos pequenos: envia em uma única requisição
    - Para arquivos grandes: divide em chunks e envia em múltiplas requisições
    """
    try:
        # Validações iniciais
        if not file:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Nenhum arquivo enviado"
            )
        
        # Verifica se é um upload em partes (chunked)
        is_chunked = chunk_index is not None and total_chunks is not None and total_chunks > 1
        
        if is_chunked:
            return await _handle_chunked_upload(
                file=file,
                file_type=file_type,
                name=name,
                chunk_index=chunk_index,
                total_chunks=total_chunks,
                file_id=file_id
            )
        
        # Processamento de arquivo único (não chunkado)
        return await _handle_single_upload(
            file=file,
            file_type=file_type,
            name=name,
            background_tasks=background_tasks
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao processar o upload: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar o arquivo: {str(e)}"
        )

async def _handle_single_upload(
    file: UploadFile,
    file_type: FileType,
    name: Optional[str],
    background_tasks: BackgroundTasks
) -> FileUploadResponse:
    """Processa um upload de arquivo único."""
    # Valida o arquivo
    validation = file_handler.validate_file(file, file.filename)
    if not validation.get("valid", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=validation.get("message", "Arquivo inválido")
        )
    
    file_size = validation.get('size', 0)
    
    # Se for um arquivo grande (> 50MB), processa em background
    if file_size > 50 * 1024 * 1024:  # 50MB
        file_id = file_handler._generate_file_id()
        background_tasks.add_task(
            _process_large_file,
            file=file,
            filename=file.filename,
            file_type=file_type,
            name=name or file.filename,
            file_size=file_size
        )
        
        return {
            'status': 'processing',
            'message': 'Arquivo grande em processamento em segundo plano',
            'file_id': file_id
        }
    
    # Processa arquivos pequenos normalmente
    saved_info = await file_handler.save_uploaded_file(
        file=file,
        filename=file.filename,
        file_type=file_type,
        name=name or file.filename,
    )
    
    return _create_upload_response(saved_info)

async def _handle_chunked_upload(
    file: UploadFile,
    file_type: FileType,
    name: Optional[str],
    chunk_index: int,
    total_chunks: int,
    file_id: Optional[str]
) -> Dict[str, Any]:
    """Processa um chunk de um upload em partes."""
    if not file_id:
        file_id = file_handler._generate_file_id()
        active_uploads[file_id] = {
            'filename': file.filename,
            'file_type': file_type,
            'name': name or file.filename,
            'chunks_received': 0,
            'total_chunks': total_chunks,
            'temp_files': []
        }
    
    # Processa o chunk atual
    return await _process_chunk(
        file_id=file_id,
        file=file,
        chunk_index=chunk_index,
        total_chunks=total_chunks
    )

async def _process_chunk(
    file_id: str, 
    file: UploadFile, 
    chunk_index: int, 
    total_chunks: int
) -> Dict[str, Any]:
    """
    Processa um chunk de um upload em partes.
    
    Args:
        file_id: ID único do arquivo
        file: Arquivo enviado
        chunk_index: Índice do chunk atual (0-based)
        total_chunks: Número total de chunks
        
    Returns:
        Dict com informações sobre o processamento do chunk
    """
    try:
        upload_info = active_uploads.get(file_id)
        if not upload_info:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sessão de upload inválida ou expirada"
            )
        
        # Cria diretório temporário se não existir
        temp_dir = _get_upload_dir() / "temp"
        temp_dir.mkdir(exist_ok=True)
        
        # Salva o chunk em um arquivo temporário
        temp_filename = f"{file_id}_part_{chunk_index:04d}"
        temp_path = temp_dir / temp_filename
        
        # Salva o chunk de forma assíncrona
        try:
            with open(temp_path, 'wb') as buffer:
                while True:
                    chunk = await file.read(CHUNK_SIZE)
                    if not chunk:
                        break
                    buffer.write(chunk)
        except Exception as e:
            logger.error(f"Erro ao salvar chunk {chunk_index}: {str(e)}")
            if temp_path.exists():
                temp_path.unlink()
            raise
        
        # Atualiza informações do upload
        upload_info['chunks_received'] += 1
        upload_info['temp_files'].append(temp_path)
        
        # Se todos os chunks foram recebidos, combina os arquivos
        if upload_info['chunks_received'] == upload_info['total_chunks']:
            try:
                saved_info = await _combine_chunks(file_id, upload_info)
                return _create_upload_response(saved_info)
            except Exception as e:
                logger.error(f"Erro ao combinar chunks: {str(e)}", exc_info=True)
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Erro ao combinar partes do arquivo: {str(e)}"
                )
        
        return {
            'status': 'chunk_uploaded',
            'chunk_index': chunk_index,
            'file_id': file_id,
            'chunks_received': upload_info['chunks_received'],
            'total_chunks': upload_info['total_chunks']
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao processar chunk {chunk_index}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar parte do arquivo: {str(e)}"
        )

async def _combine_chunks(file_id: str, upload_info: Dict[str, Any]) -> FileInfo:
    """
    Combina os chunks de um arquivo em um único arquivo.
    
    Args:
        file_id: ID do arquivo
        upload_info: Informações do upload
        
    Returns:
        FileInfo: Informações sobre o arquivo salvo
    """
    temp_files = upload_info.get('temp_files', [])
    if not temp_files:
        raise ValueError("Nenhum chunk encontrado para combinar")
    
    # Ordena os arquivos temporários pelo índice do chunk
    temp_files_sorted = sorted(temp_files, key=lambda x: int(x.name.split('_part_')[-1]))
    
    # Caminho final do arquivo
    file_extension = Path(upload_info['filename']).suffix or '.xlsx'
    final_filename = f"{file_id}{file_extension}"
    final_path = _get_upload_dir() / final_filename
    
    # Combina os chunks em um único arquivo
    try:
        with open(final_path, 'wb') as outfile:
            for temp_file in temp_files_sorted:
                try:
                    with open(temp_file, 'rb') as infile:
                        shutil.copyfileobj(infile, outfile)
                except Exception as e:
                    logger.error(f"Erro ao ler chunk {temp_file}: {str(e)}")
                    raise
    except Exception as e:
        logger.error(f"Erro ao escrever arquivo final: {str(e)}")
        if final_path.exists():
            final_path.unlink()
        raise
    finally:
        # Limpa os arquivos temporários
        for temp_file in temp_files_sorted:
            try:
                if temp_file.exists():
                    temp_file.unlink()
            except Exception as e:
                logger.warning(f"Não foi possível remover arquivo temporário {temp_file}: {str(e)}")
    
    # Obtém o tamanho do arquivo final
    file_size = final_path.stat().st_size
    
    # Cria as informações do arquivo
    saved_info = FileInfo(
        id=file_id,
        filename=upload_info['filename'],
        name=upload_info['name'],
        size=file_size,
        upload_time=datetime.utcnow(),
        status=UploadStatus.UPLOADED,
        file_type=upload_info['file_type'],
        path=str(final_path)
    )
    
    # Atualiza o file_handler
    file_handler.files[file_id] = saved_info
    upload_info['saved_info'] = saved_info
    
    # Limpa informações do upload
    if file_id in active_uploads:
        del active_uploads[file_id]
    
    return saved_info

async def _process_large_file(file: UploadFile, filename: str, file_type: FileType, name: str, file_size: int):
    """Processa um arquivo grande em segundo plano."""
    file_id = file_handler._generate_file_id()
    try:
        # Salva o arquivo em partes
        temp_file = file_handler.upload_path / f"{file_id}.part"
        
        with open(temp_file, 'wb') as buffer:
            while True:
                chunk = await file.read(CHUNK_SIZE)
                if not chunk:
                    break
                buffer.write(chunk)
        
        # Renomeia o arquivo temporário para o nome final
        final_path = file_handler.upload_path / f"{file_id}.xlsx"
        os.rename(temp_file, final_path)
        
        # Salva as informações do arquivo
        saved_info = FileInfo(
            id=file_id,
            filename=filename,
            name=name,
            size=file_size,
            upload_time=datetime.utcnow(),
            status=UploadStatus.UPLOADED,
            file_type=file_type
        )
        
        file_handler.files[file_id] = saved_info
        return saved_info
    except Exception as e:
        logger.error(f"Erro ao processar arquivo grande: {str(e)}", exc_info=True)
        # Tenta limpar arquivos temporários em caso de erro
        try:
            if os.path.exists(temp_file):
                os.remove(temp_file)
        except:
            pass
        raise

def _create_upload_response(saved_info: FileInfo) -> Dict[str, Any]:
    """
    Cria a resposta de upload padrão.
    
    Args:
        saved_info: Informações do arquivo salvo
        
    Returns:
        Dicionário com os dados da resposta
    """
    return {
        "id": saved_info.id,
        "filename": saved_info.filename,
        "name": saved_info.name,
        "size": saved_info.size,
        "upload_time": saved_info.upload_time.isoformat(),
        "status": saved_info.status.value,
        "file_type": saved_info.file_type.value if saved_info.file_type else None,
        "message": "Upload concluído com sucesso",
        "download_url": f"/api/v1/download/{saved_info.id}"
    }
