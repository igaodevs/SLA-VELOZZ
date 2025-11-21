import asyncio
from concurrent.futures import ThreadPoolExecutor
import pandas as pd
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime
import re

from ..models.schemas import FileType, MergeRequest, MergeResponse
from ..config import settings
from .file_handler import file_handler

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MergeService:
    """
    Service for merging Excel files with Meli filtering capabilities.
    Handles the core logic for combining data from multiple Excel files.
    """
    
    def __init__(self):
        self.merged_files: Dict[str, MergeResponse] = {}
    
    def _is_meli_record(self, row: pd.Series) -> bool:
        """Check if a row contains Meli-related information.

        A detecção considera:
        - Palavras-chave relacionadas ao Mercado Livre
        - Códigos com padrão ML + 10 dígitos (ex.: ML1234567890)
        - Códigos somente numéricos com 10 dígitos (ex.: 1234567890)
        """
        # Common ways Meli appears in spreadsheets
        meli_keywords = [
            'meli',
            'mercado livre',  # with space
            'mercadolivre',   # without space
            'mercadolibre',
            'ml.com',
        ]

        # Regex para códigos do Mercado Livre:
        # - "ML" opcional (case-insensitive)
        # - seguido de exatamente 10 dígitos
        meli_code_pattern = re.compile(r'\b(?:ML)?\d{10}\b', re.IGNORECASE)

        for _, value in row.items():
            if not pd.isna(value) and isinstance(value, str):
                lower_val = value.lower()

                # Check for Meli keywords (case-insensitive)
                if any(keyword in lower_val for keyword in meli_keywords):
                    return True

                # Check for Meli codes (com ou sem o prefixo ML)
                if meli_code_pattern.search(value):
                    return True

        return False
    
    def _filter_meli_records(self, df: pd.DataFrame) -> pd.DataFrame:
        """Filter a DataFrame to only include Meli-related records."""
        if df.empty:
            return df
            
        # Apply the Meli filter to each row
        meli_mask = df.apply(self._is_meli_record, axis=1)
        return df[meli_mask].copy()
    
    def _clean_dataframe(self, df: pd.DataFrame, base_columns: Optional[List[str]] = None) -> pd.DataFrame:
        """
        Clean and standardize the DataFrame.
        - Remove duplicate rows
        - Standardize column names
        - Handle missing values
        """
        if df.empty:
            return df
            
        # Make a copy to avoid modifying the original
        df_clean = df.copy()
        
        # Standardize column names (remove extra spaces, lowercase, etc.)
        df_clean.columns = [
            str(col).strip().lower().replace(' ', '_')
            for col in df_clean.columns
        ]
        
        # Drop completely empty rows and columns
        df_clean = df_clean.dropna(how='all')
        df_clean = df_clean.dropna(axis=1, how='all')
        
        # Fill NaN values with appropriate defaults
        for col in df_clean.select_dtypes(include=['object']).columns:
            df_clean[col] = df_clean[col].fillna('')
            
        for col in df_clean.select_dtypes(include=['number']).columns:
            df_clean[col] = df_clean[col].fillna(0)
            
        # Remove duplicate rows
        df_clean = df_clean.drop_duplicates()
        
        if base_columns:
            for col in base_columns:
                if col not in df_clean.columns:
                    df_clean[col] = None

        return df_clean

    def _reorder_columns(self, df: pd.DataFrame, mother_df: pd.DataFrame) -> pd.DataFrame:
        """
        Reorder DataFrame columns so that the mother's schema comes first,
        preserving any additional columns from avulsas at the end.
        """
        mother_columns = list(mother_df.columns)
        remaining_columns = [col for col in df.columns if col not in mother_columns]
        ordered_columns = mother_columns + remaining_columns
        return df.reindex(columns=ordered_columns)
    
    def _get_display_name(self, file_info: Optional[Any], fallback: str) -> str:
        if not file_info:
            return fallback
        return file_info.name or file_info.filename or fallback

    def _merge_dataframes(
        self, 
        mother_df: pd.DataFrame, 
        single_dfs: List[pd.DataFrame],
        options: Optional[Dict[str, Any]] = None
    ) -> pd.DataFrame:
        """
        Merge multiple DataFrames into a single DataFrame.
        Preserves every column coming from mother and single sheets.
        """
        if options is None:
            options = {}
            
        apply_meli_filter = options.get("apply_meli_filter", True)

        frames: List[pd.DataFrame] = []

        base_df = self._filter_meli_records(mother_df) if apply_meli_filter else mother_df.copy()
        if not base_df.empty:
            frames.append(base_df)
        
        for df in single_dfs:
            if df.empty:
                continue
            filtered = self._filter_meli_records(df) if apply_meli_filter else df
            if not filtered.empty:
                frames.append(filtered)

        if not frames:
            return pd.DataFrame()

        merged = pd.concat(frames, ignore_index=True, sort=False)
        merged = self._clean_dataframe(merged, base_columns=list(mother_df.columns))
        merged = self._reorder_columns(merged, mother_df)
        merged = self._enrich_with_deadline_info(merged)
        return merged

    def _first_non_empty_value(self, row: pd.Series, candidates: List[str]) -> Any:
        for col in candidates:
            if col in row and not pd.isna(row[col]):
                value = row[col]
                if isinstance(value, str) and not value.strip():
                    continue
                return value
        return None

    def _parse_date_value(self, value: Any) -> Optional[pd.Timestamp]:
        if value is None or (isinstance(value, str) and not value.strip()):
            return None
        if isinstance(value, pd.Timestamp):
            return value
        if isinstance(value, datetime):
            return pd.Timestamp(value)
        if isinstance(value, (int, float)) and not pd.isna(value):
            try:
                base = datetime(1899, 12, 30)
                return pd.Timestamp(base) + pd.to_timedelta(float(value), unit='D')
            except Exception:
                pass
        try:
            ts = pd.to_datetime(value, errors='coerce', dayfirst=True)
            if pd.isna(ts):
                return None
            return ts
        except Exception:
            return None

    def _normalize_status_from_text(self, value: Any) -> Optional[str]:
        if value is None:
            return None
        string_value = str(value).strip().lower()
        if not string_value:
            return None

        late_keywords = ['fora do prazo', 'fora_do_prazo', 'atras', 'overdue', 'expirado', 'late']
        on_time_keywords = ['no prazo', 'no_prazo', 'dentro do prazo', 'no schedule', 'ok']

        if any(keyword in string_value for keyword in late_keywords):
            return 'Atrasado'
        if any(keyword in string_value for keyword in on_time_keywords):
            return 'No Prazo'
        return None

    def _format_date_output(self, value: Any) -> str:
        if value is None or (isinstance(value, float) and pd.isna(value)):
            return ''
        if isinstance(value, pd.Timestamp):
            if pd.isna(value):
                return ''
            return value.strftime('%d/%m/%Y')
        if isinstance(value, datetime):
            return pd.Timestamp(value).strftime('%d/%m/%Y')
        if isinstance(value, str):
            return value
        return ''

    def _enrich_with_deadline_info(self, df: pd.DataFrame) -> pd.DataFrame:
        if df.empty:
            return df

        df_enriched = df.copy()

        previsao_candidates = [
            'previsao_de_entrega',
            'previsao_entrega',
            'data_prevista',
            'previsao',
            'prazo_final',
            'deadline',
            'sla_previsto',
            'data_prometida',
            'prazo_prometido'
        ]

        entrega_candidates = [
            'data_entrega',
            'entrega',
            'data_entregue',
            'data_real_entrega',
            'entregue_em',
            'confirmacao_entrega',
            'data_status_dia'
        ]

        status_candidates = [
            'status', 'status_do_dia', 'status_dia', 'sla', 'status_sla', 'situacao', 'situacao_sla'
        ]

        referencia_candidates = [
            'data_atualizacao',
            'atualizacao',
            'data_referencia',
            'ultima_atualizacao',
            'data_status_dia'
        ]

        def process_row(row: pd.Series) -> pd.Series:
            expected_raw = self._first_non_empty_value(row, previsao_candidates)
            delivered_raw = self._first_non_empty_value(row, entrega_candidates)
            reference_raw = self._first_non_empty_value(row, referencia_candidates)
            status_raw = self._first_non_empty_value(row, status_candidates)

            expected_date = self._parse_date_value(expected_raw)
            delivered_date = self._parse_date_value(delivered_raw)
            reference_date = self._parse_date_value(reference_raw) or delivered_date or pd.Timestamp.utcnow()

            normalized_status = self._normalize_status_from_text(status_raw)

            days_delay = 0
            is_late_due_to_delivery = False
            is_late_due_to_absence = False

            if expected_date is not None:
                comparison_date = delivered_date or reference_date
                if comparison_date is not None:
                    diff_days = (comparison_date - expected_date).days
                    if diff_days > 0:
                        days_delay = diff_days
                        is_late_due_to_delivery = delivered_date is not None
                        is_late_due_to_absence = delivered_date is None

            is_late = False
            if normalized_status == 'Atrasado':
                is_late = True
            elif normalized_status == 'No Prazo':
                is_late = False
            elif expected_date is not None:
                comparison_date = delivered_date or reference_date
                if comparison_date and comparison_date > expected_date:
                    is_late = True
            elif delivered_date and status_raw:
                is_late = normalized_status == 'Atrasado'

            motivo = ''
            if is_late:
                if is_late_due_to_delivery and delivered_date and expected_date:
                    motivo = 'Entrega confirmada após o prazo'
                elif is_late_due_to_absence and expected_date:
                    motivo = 'Entrega pendente após o prazo previsto'
                else:
                    motivo = 'Status indica atraso'

            row['data_prevista_normalizada'] = expected_date
            row['data_entrega_normalizada'] = delivered_date
            row['dias'] = int(days_delay) if days_delay else 0
            row['fora_do_prazo'] = bool(is_late)
            row['fora_da_data_de_entrega'] = bool(is_late_due_to_delivery or is_late_due_to_absence)
            row['motivo_atraso'] = motivo
            if normalized_status:
                row['status'] = normalized_status
            else:
                row['status'] = 'Atrasado' if is_late else row.get('status', 'No Prazo')
            return row

        df_enriched = df_enriched.apply(process_row, axis=1)
        return df_enriched
    
    async def merge_files(self, merge_request: MergeRequest) -> MergeResponse:
        """
        Offload heavy dataframe work to a worker thread so the event loop
        remains responsive during long merges.
        """
        return await asyncio.to_thread(self._merge_files_sync, merge_request)

    def _merge_files_sync(self, merge_request: MergeRequest) -> MergeResponse:
        """
        Merge multiple Excel files based on the provided request.
        Returns a MergeResponse with the result of the operation.
        """
        merge_id = str(hash(f"{merge_request.mother_file_id}_{merge_request.single_file_ids}"))
        
        try:
            # Read the mother file
            mother_file = file_handler.get_file_info(merge_request.mother_file_id)
            if not mother_file:
                raise ValueError(f"Mother file {merge_request.mother_file_id} not found")
                
            mother_df = file_handler.read_excel_file(merge_request.mother_file_id)
            mother_df['fonte_planilha'] = self._get_display_name(mother_file, "Planilha Mãe")
            mother_df['tipo_planilha'] = 'mae'
            
            # Read all single files
            single_dfs: List[pd.DataFrame] = []

            def _load_single(args: tuple[int, str]) -> Optional[pd.DataFrame]:
                idx, file_id = args
                single_file = file_handler.get_file_info(file_id)
                if not single_file:
                    logger.warning(f"Single file {file_id} not found, skipping")
                    return None
                try:
                    df = file_handler.read_excel_file(file_id)
                    df['fonte_planilha'] = self._get_display_name(single_file, f"Planilha Avulsa {idx}")
                    df['tipo_planilha'] = 'avulsa'
                    return df
                except Exception as exc:
                    logger.error(f"Failed to read single file {file_id}: {exc}")
                    return None

            single_payloads = list(enumerate(merge_request.single_file_ids, start=1))
            if single_payloads:
                max_workers = min(4, len(single_payloads))
                with ThreadPoolExecutor(max_workers=max_workers) as executor:
                    for df in executor.map(_load_single, single_payloads):
                        if df is not None:
                            single_dfs.append(df)
            
            # Merge the DataFrames
            merged_df = self._merge_dataframes(
                mother_df,
                single_dfs,
                options=merge_request.options or {}
            )

            # Prepare a preview for the frontend (used by table and charts)
            preview_data = None
            try:
                df_preview = merged_df.copy()

                column_map = {
                    'vendedor': ['vendedor', 'cliente', 'conta'],
                    'zona': ['zona', 'regiao', 'regio', 'region'],
                    'pedido': ['pedido', 'id_pedido', 'pedido_id', 'pacote', 'id_pacote', 'pacote_id'],
                    'dias': ['dias', 'dias_atraso', 'dias_de_atraso'],
                }

                for target, candidates in column_map.items():
                    if target not in df_preview.columns:
                        for col in candidates:
                            if col in df_preview.columns:
                                df_preview[target] = df_preview[col]
                                break
                        if target not in df_preview.columns:
                            df_preview[target] = 0 if target == 'dias' else ''

                if 'data_prevista_normalizada' in df_preview.columns:
                    df_preview['prazo_previsto'] = df_preview['data_prevista_normalizada'].apply(self._format_date_output)
                else:
                    df_preview['prazo_previsto'] = ''

                if 'data_entrega_normalizada' in df_preview.columns:
                    df_preview['data_entrega_confirmada'] = df_preview['data_entrega_normalizada'].apply(self._format_date_output)
                else:
                    df_preview['data_entrega_confirmada'] = ''

                if 'fonte_planilha' not in df_preview.columns:
                    df_preview['fonte_planilha'] = 'Planilha não identificada'

                if 'motivo_atraso' not in df_preview.columns:
                    df_preview['motivo_atraso'] = ''

                if 'fora_do_prazo' not in df_preview.columns:
                    df_preview['fora_do_prazo'] = False

                delayed_preview = df_preview[df_preview['fora_do_prazo'] == True].copy()
                if delayed_preview.empty:
                    delayed_preview = df_preview.copy()

                delayed_preview = delayed_preview.drop(
                    columns=['data_prevista_normalizada', 'data_entrega_normalizada'],
                    errors='ignore'
                )

                if 'dias' not in delayed_preview.columns:
                    delayed_preview['dias'] = 0

                delayed_preview['dias'] = (
                    pd.to_numeric(delayed_preview['dias'], errors='coerce')
                    .fillna(0)
                    .astype(int)
                )

                delayed_preview = delayed_preview.reset_index(drop=True)
                if 'id' not in delayed_preview.columns:
                    delayed_preview['id'] = range(1, len(delayed_preview) + 1)

                preview_data = delayed_preview.head(1000).to_dict(orient="records")
            except Exception as preview_err:
                logger.warning(f"Failed to build preview data: {preview_err}")

            # Save the merged result
            timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
            filename = f"merged_result_{timestamp}.xlsx"
            file_path = file_handler.save_dataframe(merged_df, filename)

            # Create response
            # Expose a download URL for the merged file (served by reports router)
            download_path = f"/api/v1/download/file/{file_path.name}"
            if settings.BASE_URL:
                base_url = settings.BASE_URL.rstrip("/")
                merged_file_url = f"{base_url}{download_path}"
            else:
                merged_file_url = download_path

            response = MergeResponse(
                merge_id=merge_id,
                status="completed",
                merged_file_url=merged_file_url,
                message=f"Successfully merged {len(single_dfs)} files with mother file",
                timestamp=datetime.utcnow(),
                preview_data=preview_data,
            )
            
            # Store the merge result
            self.merged_files[merge_id] = response
            
            return response
            
        except Exception as e:
            logger.error(f"Error merging files: {str(e)}", exc_info=True)
            return MergeResponse(
                merge_id=merge_id,
                status="error",
                message=f"Error merging files: {str(e)}",
                timestamp=datetime.utcnow()
            )
    
    def get_merge_result(self, merge_id: str) -> Optional[MergeResponse]:
        """Get the result of a previous merge operation."""
        return self.merged_files.get(merge_id)

# Create a singleton instance
merge_service = MergeService()
