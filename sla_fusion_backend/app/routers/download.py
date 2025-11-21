from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

from ..services.file_handler import file_handler

router = APIRouter()

@router.get("/download/{file_id}")
async def download_file(file_id: str):
    """
    Endpoint para baixar um arquivo pelo seu ID.
    """
    file_info = file_handler.get_file_info(file_id)
    if not file_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Arquivo não encontrado"
        )

    file_path = file_handler.get_file_path(file_id)
    if not file_path or not file_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Arquivo não encontrado"
        )

    return FileResponse(
        str(file_path),
        filename=file_info.filename,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
