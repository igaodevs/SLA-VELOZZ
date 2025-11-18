from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends, Form
from fastapi.responses import JSONResponse
import os
from datetime import datetime
import uuid
from typing import List, Optional
from pydantic import BaseModel, Field

from ..models.schemas import FileUploadResponse, FileType, UploadStatus
from ...config import settings

router = APIRouter()

class FileUploadData(BaseModel):
    name: Optional[str] = Field(None, description="Nome de exibição opcional para o arquivo")

@router.post("/upload/{file_type}", response_model=FileUploadResponse)
async def upload_file(
    file_type: FileType,
    file: UploadFile = File(...),
    name: Optional[str] = Form(None)
):
    display_name = name
    
    # Verifica a extensão do arquivo
    if not file.filename.lower().endswith(('.xlsx', '.xls')):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Apenas arquivos Excel (.xlsx, .xls) são permitidos"
        )
    
    # Gera um ID único para o arquivo
    file_id = str(uuid.uuid4())
    
    # Cria o diretório de upload se não existir
    os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)
    
    # Salva o arquivo
    file_path = os.path.join(settings.UPLOAD_FOLDER, f"{file_id}_{file.filename}")
    
    try:
        # Salva o conteúdo do arquivo
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Obtém o tamanho do arquivo
        file_size = os.path.getsize(file_path)
        
        # Cria a resposta com o nome de exibição, se fornecido
        response = FileUploadResponse(
            file_id=file_id,
            filename=file.filename,
            name=display_name or file.filename,  # Usa o nome de exibição se fornecido
            file_type=file_type,
            status=UploadStatus.UPLOADED,
            size=file_size,
            message="Arquivo enviado com sucesso"
        )
        
        return response
        
    except Exception as e:
        # Remove o arquivo em caso de erro
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar o arquivo: {str(e)}"
        )
