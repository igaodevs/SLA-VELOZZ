from fastapi import APIRouter, UploadFile, File, HTTPException, status, Form
from typing import Optional
from pydantic import BaseModel, Field

from ..models.schemas import FileUploadResponse, FileType, UploadStatus
from ..services.file_handler import file_handler

router = APIRouter()

class FileUploadData(BaseModel):
    name: Optional[str] = Field(None, description="Nome de exibição opcional para o arquivo")

@router.post("/upload/{file_type}", response_model=FileUploadResponse)
async def upload_file(
    file_type: FileType,
    file: UploadFile = File(...),
    name: Optional[str] = Form(None)
):
    # Valida extensão e tamanho usando o serviço de arquivos
    validation = file_handler.validate_file(file.file, file.filename)
    if not validation.get("valid", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=validation.get("message", "Arquivo inválido")
        )

    try:
        # Salva o arquivo usando o serviço centralizado
        saved_info = await file_handler.save_uploaded_file(
            file=file,
            filename=file.filename,
            file_type=file_type,
            name=name or file.filename,
        )

        # Monta a resposta no formato esperado pelo frontend
        response = FileUploadResponse(
            file_id=saved_info.id,
            filename=saved_info.filename,
            name=saved_info.name,
            file_type=saved_info.file_type,
            status=saved_info.status,
            size=saved_info.size,
            message="Arquivo enviado com sucesso"
        )

        return response

    except HTTPException:
        # Propaga erros de HTTP já tratados pelo serviço
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar o arquivo: {str(e)}"
        )
