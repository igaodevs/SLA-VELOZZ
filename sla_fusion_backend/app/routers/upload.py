from fastapi import APIRouter, UploadFile, File, HTTPException, status, Form, BackgroundTasks
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, validator
import logging
from datetime import datetime
import asyncio

from ..models.schemas import FileUploadResponse, FileType, UploadStatus
from ..services.file_handler import file_handler

router = APIRouter()
logger = logging.getLogger(__name__)

# Tamanho do chunk para upload em partes (10MB)
CHUNK_SIZE = 10 * 1024 * 1024

class FileUploadData(BaseModel):
    name: Optional[str] = Field(None, description="Nome de exibição opcional para o arquivo")
    chunk_index: Optional[int] = Field(None, description="Índice do chunk atual")
    total_chunks: Optional[int] = Field(None, description="Número total de chunks")
    file_id: Optional[str] = Field(None, description="ID do arquivo para upload em partes")

# Dicionário para armazenar o estado de uploads em andamento
active_uploads: Dict[str, Dict[str, Any]] = {}

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
    try:
        # Verifica se é um upload em partes
        is_chunked = chunk_index is not None and total_chunks is not None and total_chunks > 1
        
        if is_chunked:
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
        
        # Processamento de arquivo único (não chunkado)
        validation = file_handler.validate_file(file.file, file.filename)
        if not validation.get("valid", False):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=validation.get("message", "Arquivo inválido")
            )
        
        # Se for um arquivo grande (> 50MB), processa em background
        file_size = validation.get('size', 0)
        if file_size > 50 * 1024 * 1024:  # 50MB
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
                'file_id': file_id or file_handler._generate_file_id()
            }

        # Processa arquivos pequenos normalmente
        saved_info = await file_handler.save_uploaded_file(
            file=file,
            filename=file.filename,
            file_type=file_type,
            name=name or file.filename,
        )

        return _create_upload_response(saved_info)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao processar o upload: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar o arquivo: {str(e)}"
        )

async def _process_chunk(file_id: str, file: UploadFile, chunk_index: int, total_chunks: int):
    """Processa um chunk de um arquivo grande."""
    try:
        upload_info = active_uploads.get(file_id)
        if not upload_info:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sessão de upload inválida ou expirada"
            )
        
        # Salva o chunk em um arquivo temporário
        temp_file = f"{file_id}_part_{chunk_index}"
        temp_path = file_handler.upload_path / temp_file
        
        with open(temp_path, 'wb') as buffer:
            content = await file.read()
            buffer.write(content)
        
        upload_info['chunks_received'] += 1
        upload_info['temp_files'].append(temp_path)
        
        # Se todos os chunks foram recebidos, combina os arquivos
        if upload_info['chunks_received'] == upload_info['total_chunks']:
            await _combine_chunks(file_id, upload_info)
            return _create_upload_response(upload_info.get('saved_info'))
        
        return {
            'status': 'chunk_uploaded',
            'chunk_index': chunk_index,
            'file_id': file_id
        }
    except Exception as e:
        logger.error(f"Erro ao processar chunk {chunk_index}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar parte do arquivo: {str(e)}"
        )

async def _combine_chunks(file_id: str, upload_info: Dict[str, Any]):
    """Combina os chunks em um único arquivo."""
    try:
        temp_files = upload_info.get('temp_files', [])
        if not temp_files:
            raise ValueError("Nenhum chunk encontrado para combinar")
        
        # Ordena os arquivos temporários pelo índice do chunk
        temp_files.sort()
        
        # Cria o arquivo final
        final_path = file_handler.upload_path / f"{file_id}.xlsx"
        with open(final_path, 'wb') as outfile:
            for temp_file in temp_files:
                with open(temp_file, 'rb') as infile:
                    shutil.copyfileobj(infile, outfile)
        
        # Limpa os arquivos temporários
        for temp_file in temp_files:
            try:
                os.remove(temp_file)
            except:
                pass
        
        # Salva as informações do arquivo
        file_size = os.path.getsize(final_path)
        saved_info = FileInfo(
            id=file_id,
            filename=upload_info['filename'],
            name=upload_info['name'],
            size=file_size,
            upload_time=datetime.utcnow(),
            status=UploadStatus.UPLOADED,
            file_type=upload_info['file_type']
        )
        
        file_handler.files[file_id] = saved_info
        upload_info['saved_info'] = saved_info
        
        return saved_info
    except Exception as e:
        logger.error(f"Erro ao combinar chunks: {str(e)}", exc_info=True)
        raise

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

def _create_upload_response(saved_info) -> FileUploadResponse:
    """Cria a resposta de upload padrão."""
    return FileUploadResponse(
        file_id=saved_info.id,
        filename=saved_info.filename,
        name=saved_info.name,
        file_type=saved_info.file_type,
        status=saved_info.status,
        size=saved_info.size,
        message="Arquivo processado com sucesso"
    )
