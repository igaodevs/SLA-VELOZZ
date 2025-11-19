from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Dict, List, Any
import pandas as pd
import os

from ..models.schemas import AnalyticsResponse
from ..config import settings
from ..services.merge_service import merge_service

router = APIRouter()


class AnalyticsRequest(BaseModel):
    file_ids: List[str]
    filters: Dict[str, Any] = {}


def _normalize_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Normaliza colunas principais para o formato esperado pelos gráficos/backend.

    - vendedor
    - status
    - dias (dias de atraso)
    - zona
    - pedido (pedido/pacote)
    """
    if df.empty:
        return df

    df_norm = df.copy()

    # Padroniza nomes de colunas (sem espaços, minúsculo)
    df_norm.columns = [str(c).strip().lower().replace(" ", "_") for c in df_norm.columns]

    column_map: Dict[str, List[str]] = {
        "vendedor": ["vendedor", "cliente", "conta", "seller", "seller_name"],
        "status": ["status_do_dia", "status_dia", "sla", "status", "status_sla", "sla_status"],
        "dias": ["dias", "dias_atraso", "dias_de_atraso"],
        "zona": ["zona", "regiao", "região", "region"],
        "pedido": ["pedido", "id_pedido", "pedido_id", "pacote", "id_pacote", "pacote_id"],
    }

    for target, candidates in column_map.items():
        if target not in df_norm.columns:
            for col in candidates:
                if col in df_norm.columns:
                    df_norm[target] = df_norm[col]
                    break
            if target not in df_norm.columns:
                # Defaults
                if target in ["dias"]:
                    df_norm[target] = 0
                else:
                    df_norm[target] = ""

    # Normaliza status para valores padronizados
    if "status" in df_norm.columns:
        def _normalize_status(val: Any) -> Any:
            if isinstance(val, str):
                lower = val.lower()
                if "atras" in lower or "fora do prazo" in lower or "fora_do_prazo" in lower:
                    return "Atrasado"
                if "no prazo" in lower or "no_prazo" in lower or "dentro do prazo" in lower:
                    return "No Prazo"
            return val

        df_norm["status"] = df_norm["status"].apply(_normalize_status)

    # Garante tipo numérico para dias
    if "dias" in df_norm.columns:
        df_norm["dias"] = pd.to_numeric(df_norm["dias"], errors="coerce").fillna(0).astype(int)

    return df_norm


@router.post("/analytics", response_model=AnalyticsResponse)
async def get_analytics(request: AnalyticsRequest):
    try:
        # Lê os arquivos indicados e concatena
        dfs: List[pd.DataFrame] = []
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
                meli_records=0,
            )

        df_all = pd.concat(dfs, ignore_index=True, sort=False)
        df_all = _normalize_columns(df_all)

        # Aplica filtro para considerar APENAS registros relacionados ao Mercado Livre (Meli),
        # reutilizando a mesma lógica de detecção usada no serviço de merge.
        try:
            meli_mask = df_all.apply(merge_service._is_meli_record, axis=1)
            df_all = df_all[meli_mask].copy()
            meli_records = int(len(df_all))
        except Exception:
            # Se algo der errado no filtro, consideramos que não há registros Meli válidos
            df_all = df_all.iloc[0:0].copy()
            meli_records = 0

        # Se após o filtro não restar nenhum registro Meli, devolve resposta vazia
        if meli_records == 0:
            return AnalyticsResponse(
                seller_ranking=[],
                sla_compliance={"on_time": 0.0, "delayed": 0.0, "total_orders": 0},
                total_records=0,
                meli_records=0,
            )

        total_records = int(len(df_all))

        # Ranking de vendedores considerando volume e atraso
        seller_ranking: List[Dict[str, Any]] = []
        if "vendedor" in df_all.columns:
            grp = df_all.groupby("vendedor", dropna=False)
            for seller, g in grp:
                total_orders = int(len(g))

                atrasados = g[g["status"] == "Atrasado"] if "status" in g.columns else pd.DataFrame()
                atrasos_count = int(len(atrasados))
                on_time_count = total_orders - atrasos_count

                avg_delay = None
                if "dias" in g.columns:
                    try:
                        avg_delay = float(g["dias"].dropna().astype(float).mean())
                    except Exception:
                        avg_delay = None

                delayed_pct = round((atrasos_count / total_orders) * 100, 2) if total_orders > 0 else 0.0

                # Zona predominante do vendedor (se existir)
                main_zone = None
                if "zona" in g.columns:
                    try:
                        main_zone = (
                            g["zona"].astype(str).str.strip().replace({"": "Sem zona"}).mode().iloc[0]
                        )
                    except Exception:
                        main_zone = None

                seller_ranking.append(
                    {
                        "seller": seller if seller not in [None, ""] else "Sem vendedor",
                        "total_sales": total_orders,
                        "avg_delay": avg_delay,
                        "delayed_pct": delayed_pct,
                        "on_time_orders": on_time_count,
                        "delayed_orders": atrasos_count,
                        "main_zone": main_zone,
                    }
                )

            # Ordena por maior volume e, em caso de empate, maior % de atraso
            seller_ranking = sorted(
                seller_ranking,
                key=lambda x: (x["total_sales"], x.get("delayed_pct", 0.0)),
                reverse=True,
            )

        # SLA global usando status ou, como fallback, dias
        sla_compliance: Dict[str, Any] = {"on_time": 0.0, "delayed": 0.0, "total_orders": total_records}
        if total_records > 0:
            try:
                if "status" in df_all.columns:
                    on_time = int((df_all["status"] == "No Prazo").sum())
                    delayed = int((df_all["status"] == "Atrasado").sum())
                elif "dias" in df_all.columns:
                    on_time = int((df_all["dias"].fillna(0) <= 0).sum())
                    delayed = total_records - on_time
                else:
                    on_time = 0
                    delayed = total_records

                sla_compliance["on_time"] = round(on_time / total_records * 100, 2)
                sla_compliance["delayed"] = round(delayed / total_records * 100, 2)
            except Exception:
                pass

        return AnalyticsResponse(
            seller_ranking=seller_ranking,
            sla_compliance=sla_compliance,
            total_records=total_records,
            meli_records=meli_records,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao processar analytics: {exc}",
        )


@router.post("/analytics/meli-delayed")
async def get_meli_delayed(request: AnalyticsRequest) -> Dict[str, Any]:
    """Retorna todas as linhas Meli em atraso (tabela detalhada).

    - Lê as mesmas planilhas do endpoint /analytics
    - Normaliza colunas principais
    - Filtra somente registros Mercado Livre (Meli)
    - Considera em atraso registros com:
      - status == "Atrasado", OU
      - dias > 0 quando a coluna existe
    """
    try:
        dfs: List[pd.DataFrame] = []
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
            return {
                "total_meli": 0,
                "total_delayed": 0,
                "rows": [],
            }

        df_all = pd.concat(dfs, ignore_index=True, sort=False)
        df_all = _normalize_columns(df_all)

        # Filtra apenas registros Mercado Livre (Meli)
        try:
            meli_mask = df_all.apply(merge_service._is_meli_record, axis=1)
            df_all = df_all[meli_mask].copy()
        except Exception:
            df_all = df_all.iloc[0:0].copy()

        total_meli = int(len(df_all))
        if total_meli == 0:
            return {
                "total_meli": 0,
                "total_delayed": 0,
                "rows": [],
            }

        # Identifica atrasados
        if "status" in df_all.columns:
            delayed_mask = df_all["status"] == "Atrasado"
        elif "dias" in df_all.columns:
            delayed_mask = df_all["dias"].fillna(0).astype(float) > 0
        else:
            delayed_mask = pd.Series([False] * len(df_all))

        df_delayed = df_all[delayed_mask].copy()
        total_delayed = int(len(df_delayed))

        if total_delayed == 0:
            return {
                "total_meli": total_meli,
                "total_delayed": 0,
                "rows": [],
            }

        # Campos principais para retorno
        base_cols = [c for c in ["pedido", "vendedor", "zona", "status", "dias"] if c in df_delayed.columns]
        # Inclui todas as colunas originais também, para máxima visibilidade
        rows = df_delayed.to_dict(orient="records")

        return {
            "total_meli": total_meli,
            "total_delayed": total_delayed,
            "rows": rows,
        }


    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao gerar análises: {str(e)}",
        )
