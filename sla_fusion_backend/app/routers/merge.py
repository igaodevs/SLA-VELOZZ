from fastapi import APIRouter, HTTPException, status

from ..models.schemas import MergeRequest, MergeResponse
from ..services.merge_service import merge_service

router = APIRouter()

@router.post("/merge", response_model=MergeResponse)
async def merge_files(request: MergeRequest):
    try:
        # Delegamos a lógica de mesclagem ao serviço centralizado,
        # que limpa os dados e alinha tudo ao padrão da planilha mãe.
        result = await merge_service.merge_files(request)

        if result.status == "error":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result.message or "Erro ao mesclar arquivos"
            )

        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao mesclar arquivos: {str(e)}"
        )
