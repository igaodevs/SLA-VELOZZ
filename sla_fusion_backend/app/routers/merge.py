from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import pandas as pd
import os
from datetime import datetime
import uuid

from ..models.schemas import MergeRequest, MergeResponse
from ..config import settings

router = APIRouter()

class MergeRequestData(BaseModel):
    mother_file_id: str
    single_file_ids: List[str]
    options: Optional[Dict[str, Any]] = {}

@router.post("/merge", response_model=MergeResponse)
async def merge_files(request: MergeRequest):
    try:
        # Implementa a lógica básica de mesclagem de arquivos reais
        merge_id = str(uuid.uuid4())

        # Localiza os arquivos enviados com base nos IDs fornecidos
        file_ids = [request.mother_file_id] + request.single_file_ids
        dfs = []

        for fid in file_ids:
            # Procura por arquivo que comece com o ID na pasta de uploads
            matches = [f for f in os.listdir(settings.UPLOAD_FOLDER) if f.startswith(f"{fid}_")]
            if not matches:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Arquivo com id {fid} não encontrado")

            # Usa o primeiro arquivo que casar com o ID
            file_path = os.path.join(settings.UPLOAD_FOLDER, matches[0])

            # Tenta ler o Excel
            try:
                df = pd.read_excel(file_path)
                dfs.append(df)
            except Exception as exc:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Erro ao ler o arquivo {matches[0]}: {str(exc)}")

        # Mescla simples: concatena verticalmente alinhando colunas
        if not dfs:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nenhum arquivo válido para mesclagem")

        merged_df = pd.concat(dfs, ignore_index=True, sort=False)

        # Salva o arquivo mesclado
        output_filename = f"merged_{merge_id}.xlsx"
        output_path = os.path.join(settings.UPLOAD_FOLDER, output_filename)
        merged_df.to_excel(output_path, index=False)

        # Constrói URL de download (se BASE_URL estiver configurado, usa-o, senão retorna caminho relativo)
        base_url = getattr(settings, 'BASE_URL', '')
        if base_url:
            download_url = f"{base_url.rstrip('/')}/uploads/{output_filename}"
        else:
            download_url = f"/uploads/{output_filename}"

        # Gera um preview em JSON para o frontend (limitado para não pesar)
        try:
            preview_records = merged_df.head(500).to_dict(orient="records")
        except Exception:
            preview_records = None

        return MergeResponse(
            merge_id=merge_id,
            status="completed",
            merged_file_url=download_url,
            message="Arquivos mesclados com sucesso",
            preview_data=preview_records
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao mesclar arquivos: {str(e)}"
        )
