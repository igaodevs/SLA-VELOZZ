from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Dict, List, Any
import pandas as pd
import os
from datetime import datetime

from ..models.schemas import AnalyticsResponse
from ..config import settings

router = APIRouter()

class AnalyticsRequest(BaseModel):
    file_ids: List[str]
    filters: Dict[str, Any] = {}

@router.post("/analytics", response_model=AnalyticsResponse)
async def get_analytics(request: AnalyticsRequest):
    try:
        # Lê os arquivos indicados e concatena
        dfs = []
        for fid in request.file_ids:
            matches = [f for f in os.listdir(settings.UPLOAD_FOLDER) if f.startswith(f"{fid}_")]
            if not matches:
                continue
            file_path = os.path.join(settings.UPLOAD_FOLDER, matches[0])
            try:
                df = pd.read_excel(file_path)
                dfs.append(df)
            except Exception:
                continue

        if not dfs:
            # Retorna estrutura vazia quando não há dados
            return AnalyticsResponse(
                seller_ranking=[],
                sla_compliance={"on_time": 0.0, "delayed": 0.0, "total_orders": 0},
                total_records=0,
                meli_records=0
            )

        df_all = pd.concat(dfs, ignore_index=True, sort=False)
        total_records = int(len(df_all))

        # Conta registros que contenham 'meli' em qualquer coluna textual
        try:
            meli_mask = df_all.apply(lambda row: row.astype(str).str.contains('meli', case=False, na=False).any(), axis=1)
            meli_records = int(meli_mask.sum())
        except Exception:
            meli_records = 0

        # Tentativa de gerar ranking por vendedor (coluna 'vendedor' ou 'seller')
        seller_col = None
        for candidate in ['vendedor', 'seller', 'seller_name']:
            if candidate in df_all.columns:
                seller_col = candidate
                break

        seller_ranking = []
        if seller_col is not None:
            grp = df_all.groupby(seller_col)
            for seller, g in grp:
                total_sales = int(len(g))
                avg_delay = None
                if 'dias' in g.columns:
                    try:
                        avg_delay = float(g['dias'].dropna().astype(float).mean())
                    except Exception:
                        avg_delay = None
                seller_ranking.append({"seller": seller, "total_sales": total_sales, "avg_delay": avg_delay})
            # Ordena por total_sales desc
            seller_ranking = sorted(seller_ranking, key=lambda x: x['total_sales'], reverse=True)

        # SLA compliance básico (se existir coluna 'dias')
        sla_compliance = {"on_time": 0.0, "delayed": 0.0, "total_orders": total_records}
        if 'dias' in df_all.columns and total_records > 0:
            try:
                on_time = int((df_all['dias'].fillna(0) <= 0).sum())
                delayed = total_records - on_time
                sla_compliance['on_time'] = round(on_time / total_records * 100, 2)
                sla_compliance['delayed'] = round(delayed / total_records * 100, 2)
            except Exception:
                pass

        return AnalyticsResponse(
            seller_ranking=seller_ranking,
            sla_compliance=sla_compliance,
            total_records=total_records,
            meli_records=meli_records
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao gerar análises: {str(e)}"
        )
