import pandas as pd
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
import numpy as np

from ..models.schemas import AnalyticsResponse
from .merge_service import merge_service
from .file_handler import file_handler

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AnalyticsService:
    """
    Service for generating analytics and insights from merged Excel data.
    Handles calculations for seller rankings, SLA compliance, and other metrics.
    """
    
    def __init__(self):
        self.analytics_cache: Dict[str, Dict[str, Any]] = {}
    
    def _detect_date_columns(self, df: pd.DataFrame) -> List[str]:
        """Identify columns that likely contain date information."""
        date_columns = []
        
        # Common date column names
        date_keywords = ['date', 'time', 'hora', 'data', 'created', 'updated', 'entrega']
        
        for col in df.columns:
            col_lower = str(col).lower()
            
            # Check column name for date indicators
            if any(keyword in col_lower for keyword in date_keywords):
                date_columns.append(col)
                continue
                
            # Check column data type
            if pd.api.types.is_datetime64_any_dtype(df[col]):
                date_columns.append(col)
                continue
                
            # Check if column can be converted to datetime
            try:
                if pd.to_datetime(df[col], errors='coerce').notna().any():
                    date_columns.append(col)
            except:
                pass
                
        return date_columns
    
    def _detect_numeric_columns(self, df: pd.DataFrame) -> List[str]:
        """Identify columns that contain numeric data."""
        numeric_columns = []
        
        for col in df.columns:
            if pd.api.types.is_numeric_dtype(df[col]):
                numeric_columns.append(col)
                
        return numeric_columns
    
    def _detect_seller_columns(self, df: pd.DataFrame) -> List[str]:
        """Identify columns that likely contain seller information."""
        seller_keywords = ['seller', 'vendedor', 'fornecedor', 'provider', 'loja', 'store']
        seller_columns = []
        
        for col in df.columns:
            col_lower = str(col).lower()
            if any(keyword in col_lower for keyword in seller_keywords):
                seller_columns.append(col)
                
        return seller_columns or list(df.columns[:2])  # Default to first two columns if no seller columns found
    
    def _calculate_seller_ranking(self, df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Calculate seller ranking based on delays and SLA compliance."""
        if df.empty:
            return []
            
        # Try to identify seller and date columns
        seller_columns = self._detect_seller_columns(df)
        date_columns = self._detect_date_columns(df)
        
        if not seller_columns or not date_columns:
            return []
            
        # Use the first seller column and first date column
        seller_col = seller_columns[0]
        date_col = date_columns[0]
        
        try:
            # Ensure date column is datetime
            df[date_col] = pd.to_datetime(df[date_col], errors='coerce')
            
            # Get current date for SLA calculation
            current_date = datetime.now()
            
            # Calculate delays (days between date and now, or between two date columns)
            if len(date_columns) > 1:
                # If we have two date columns, calculate the difference between them
                df['delay_days'] = (df[date_columns[1]] - df[date_columns[0]]).dt.days
            else:
                # Otherwise, calculate days from date to now
                df['delay_days'] = (current_date - df[date_col]).dt.days
            
            # Group by seller and calculate metrics
            seller_stats = df.groupby(seller_col).agg(
                total_orders=('delay_days', 'count'),
                avg_delay=('delay_days', 'mean'),
                max_delay=('delay_days', 'max'),
                delayed_orders=('delay_days', lambda x: (x > 0).sum())
            ).reset_index()
            
            # Calculate SLA compliance percentage
            seller_stats['sla_compliance'] = (
                (seller_stats['total_orders'] - seller_stats['delayed_orders']) / 
                seller_stats['total_orders'] * 100
            ).round(2)
            
            # Sort by number of delayed orders (descending)
            seller_stats = seller_stats.sort_values('delayed_orders', ascending=False)
            
            # Convert to list of dicts for JSON serialization
            return seller_stats.rename(columns={
                seller_col: 'seller_name',
                'total_orders': 'total_orders',
                'avg_delay': 'average_delay_days',
                'max_delay': 'max_delay_days',
                'delayed_orders': 'delayed_orders_count',
                'sla_compliance': 'sla_compliance_percentage'
            }).to_dict('records')
            
        except Exception as e:
            logger.error(f"Error calculating seller ranking: {str(e)}", exc_info=True)
            return []
    
    def _calculate_sla_metrics(self, df: pd.DataFrame) -> Dict[str, float]:
        """Calculate overall SLA compliance metrics."""
        if df.empty:
            return {
                'total_orders': 0,
                'on_time_orders': 0,
                'delayed_orders': 0,
                'sla_compliance_percentage': 0.0,
                'average_delay_days': 0.0
            }
            
        date_columns = self._detect_date_columns(df)
        
        if not date_columns:
            return {
                'total_orders': len(df),
                'on_time_orders': 0,
                'delayed_orders': 0,
                'sla_compliance_percentage': 0.0,
                'average_delay_days': 0.0
            }
            
        try:
            # Use the first date column
            date_col = date_columns[0]
            df[date_col] = pd.to_datetime(df[date_col], errors='coerce')
            
            # Calculate delays
            current_date = datetime.now()
            df['delay_days'] = (current_date - df[date_col]).dt.days
            
            # Calculate metrics
            total_orders = len(df)
            delayed_orders = (df['delay_days'] > 0).sum()
            on_time_orders = total_orders - delayed_orders
            
            return {
                'total_orders': int(total_orders),
                'on_time_orders': int(on_time_orders),
                'delayed_orders': int(delayed_orders),
                'sla_compliance_percentage': round((on_time_orders / total_orders * 100) if total_orders > 0 else 0, 2),
                'average_delay_days': round(df['delay_days'].mean(), 2) if not df['delay_days'].empty else 0.0
            }
            
        except Exception as e:
            logger.error(f"Error calculating SLA metrics: {str(e)}", exc_info=True)
            return {
                'total_orders': len(df),
                'on_time_orders': 0,
                'delayed_orders': 0,
                'sla_compliance_percentage': 0.0,
                'average_delay_days': 0.0
            }
    
    async def generate_analytics(self, merge_id: str) -> AnalyticsResponse:
        """
        Generate analytics for a merged dataset.
        Returns an AnalyticsResponse with seller rankings and SLA metrics.
        """
        # Check if we have cached results
        if merge_id in self.analytics_cache:
            cached = self.analytics_cache[merge_id]
            
            # If cache is less than 1 hour old, return cached results
            if (datetime.utcnow() - cached['timestamp']) < timedelta(hours=1):
                return cached['response']
        
        # Get the merge result
        merge_result = merge_service.get_merge_result(merge_id)
        if not merge_result or not merge_result.merged_file_url:
            raise ValueError(f"No merged data found for merge ID: {merge_id}")
        
        try:
            # Extract file ID from URL (assuming format /download/filename)
            file_id = merge_result.merged_file_url.split('/')[-1].split('.')[0]
            
            # Read the merged file
            df = file_handler.read_excel_file(file_id)
            
            # Generate analytics
            seller_ranking = self._calculate_seller_ranking(df)
            sla_metrics = self._calculate_sla_metrics(df)
            
            # Count Meli records
            meli_records = sum(1 for _, row in df.iterrows() if merge_service._is_meli_record(row))
            
            # Create response
            response = AnalyticsResponse(
                seller_ranking=seller_ranking,
                sla_compliance={
                    'percentage': sla_metrics['sla_compliance_percentage'],
                    'on_time': sla_metrics['on_time_orders'],
                    'delayed': sla_metrics['delayed_orders'],
                    'total': sla_metrics['total_orders'],
                    'average_delay_days': sla_metrics['average_delay_days']
                },
                total_records=len(df),
                meli_records=meli_records,
                generated_at=datetime.utcnow()
            )
            
            # Cache the results
            self.analytics_cache[merge_id] = {
                'response': response,
                'timestamp': datetime.utcnow()
            }
            
            return response
            
        except Exception as e:
            logger.error(f"Error generating analytics: {str(e)}", exc_info=True)
            raise ValueError(f"Failed to generate analytics: {str(e)}")

# Create a singleton instance
analytics_service = AnalyticsService()
