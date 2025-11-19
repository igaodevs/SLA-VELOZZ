import pandas as pd
import logging
from typing import List, Dict, Any, Optional, Tuple
from datetime import datetime
import re
from pathlib import Path

from ..models.schemas import FileType, MergeRequest, MergeResponse
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
        """
        Check if a row contains Meli-related information.
        Looks for 'meli' in text fields or specific Meli codes.
        """
        # Common ways Meli appears in spreadsheets
        meli_keywords = [
            'meli',
            'mercado livre',  # with space
            'mercadolivre',   # without space
            'mercadolibre',
            'ml.com',
        ]
        
        for _, value in row.items():
            if not pd.isna(value) and isinstance(value, str):
                # Check for Meli keywords (case-insensitive)
                if any(keyword in value.lower() for keyword in meli_keywords):
                    return True
                
                # Check for Meli codes (e.g., ML1234567890)
                if re.search(r'\bML\d{10}\b', value, re.IGNORECASE):
                    return True
                    
        return False
    
    def _filter_meli_records(self, df: pd.DataFrame) -> pd.DataFrame:
        """Filter a DataFrame to only include Meli-related records."""
        if df.empty:
            return df
            
        # Apply the Meli filter to each row
        meli_mask = df.apply(self._is_meli_record, axis=1)
        return df[meli_mask].copy()
    
    def _clean_dataframe(self, df: pd.DataFrame) -> pd.DataFrame:
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
        
        return df_clean
    
    def _merge_dataframes(
        self, 
        mother_df: pd.DataFrame, 
        single_dfs: List[pd.DataFrame],
        options: Optional[Dict[str, Any]] = None
    ) -> pd.DataFrame:
        """
        Merge multiple DataFrames into a single DataFrame.
        The mother DataFrame's structure is preserved.
        """
        if options is None:
            options = {}
            
        # Decide once whether we apply the Meli filter
        apply_meli_filter = options.get("apply_meli_filter", True)

        # Start with the mother DataFrame, optionally filtered by Meli
        if apply_meli_filter:
            result_df = self._filter_meli_records(mother_df)
        else:
            result_df = mother_df.copy()
        
        # Process each single DataFrame
        for df in single_dfs:
            if df.empty:
                continue
                
            # Optionally filter for Meli records on the single sheets as well
            meli_df = self._filter_meli_records(df) if apply_meli_filter else df
            
            if not meli_df.empty:
                # Align columns with mother DataFrame
                for col in result_df.columns:
                    if col not in meli_df.columns:
                        meli_df[col] = None
                
                # Reorder columns to match mother DataFrame
                meli_df = meli_df[result_df.columns]
                
                # Append to result
                result_df = pd.concat([result_df, meli_df], ignore_index=True)
        
        # Clean the final merged DataFrame
        result_df = self._clean_dataframe(result_df)
        
        return result_df
    
    async def merge_files(self, merge_request: MergeRequest) -> MergeResponse:
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
            
            # Read all single files
            single_dfs = []
            for file_id in merge_request.single_file_ids:
                single_file = file_handler.get_file_info(file_id)
                if not single_file:
                    logger.warning(f"Single file {file_id} not found, skipping")
                    continue
                    
                df = file_handler.read_excel_file(file_id)
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

                # Try to map common backend column names to the ones expected by the frontend.
                # These mappings are heuristic and can be adjusted to your real spreadsheet layout.
                column_map = {
                    'vendedor': ['vendedor', 'seller', 'nome_vendedor'],
                    'data': ['data', 'data_pedido', 'data_venda'],
                    'status': ['status', 'status_sla', 'sla_status'],
                    'dias': ['dias', 'dias_atraso', 'dias_de_atraso'],
                }

                for target, candidates in column_map.items():
                    if target not in df_preview.columns:
                        for col in candidates:
                            if col in df_preview.columns:
                                df_preview[target] = df_preview[col]
                                break
                        # If still not present, create an empty/default column
                        if target not in df_preview.columns:
                            if target in ['dias']:
                                df_preview[target] = 0
                            else:
                                df_preview[target] = ''

                # Ensure there is an id column for stable keys in the frontend
                if 'id' not in df_preview.columns:
                    df_preview['id'] = range(1, len(df_preview) + 1)

                preview_data = df_preview.head(500).to_dict(orient="records")
            except Exception as preview_err:
                logger.warning(f"Failed to build preview data: {preview_err}")

            # Save the merged result
            timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
            filename = f"merged_result_{timestamp}.xlsx"
            file_path = file_handler.save_dataframe(merged_df, filename)

            # Create response
            # Expose a download URL for the merged file (served by reports router)
            response = MergeResponse(
                merge_id=merge_id,
                status="completed",
                merged_file_url=f"/api/v1/download/file/{file_path.name}",
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
