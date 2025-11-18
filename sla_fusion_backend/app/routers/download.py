from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse
import os
from pathlib import Path

router = APIRouter()

@router.get("/download/{file_id}")
async def download_file(file_id: str):
    """
    Endpoint para baixar um arquivo pelo seu ID.
    """
    from ..config import settings
    
    # Procura o arquivo no diretório de uploads
    upload_dir = Path(settings.UPLOAD_FOLDER)
    
    # Lista todos os arquivos que começam com o file_id
    matching_files = list(upload_dir.glob(f"{file_id}_*"))
    
    if not matching_files:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Arquivo não encontrado"
        )
    
    # Pega o primeiro arquivo correspondente
    file_path = matching_files[0]
    
    # Verifica se o arquivo existe
    if not file_path.is_file():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Arquivo não encontrado"
        )
    
    # Retorna o arquivo para download
    return FileResponse(
        str(file_path),
        filename=file_path.name.split('_', 1)[1],  # Remove o ID do nome do arquivo
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
