import os
import shutil
import uuid
import sys
import io
import time
import concurrent.futures
from pathlib import Path
from typing import Optional, BinaryIO, Dict, Any, List, Union, Tuple
from datetime import datetime
import logging

from fastapi import HTTPException, status, UploadFile

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    # On Windows, python-magic's loader may not find the bundled libmagic DLL
    if sys.platform in ('win32', 'cygwin'):
        for p in sys.path:
            candidate = os.path.join(p, 'magic', 'libmagic')
            if os.path.isdir(candidate):
                os.environ['PATH'] = candidate + os.pathsep + os.environ.get('PATH', '')
                break
    
    import magic
    import pandas as pd
    import openpyxl
    from openpyxl.utils import get_column_letter
    from openpyxl.styles import Font
    
    # Configure pandas for better performance with large files
    pd.set_option('io.excel.xlsx.reader', 'openpyxl')
    pd.set_option('display.max_columns', None)
    pd.set_option('display.max_rows', 100)
    
    # Configure openpyxl for better performance
    openpyxl_version = tuple(map(int, openpyxl.__version__.split('.')))
    if openpyxl_version >= (3, 1, 0):
        from openpyxl.utils.exceptions import InvalidFileException
    else:
        class InvalidFileException(Exception):
            pass

except ImportError as e:
    logger.error(f"Error importing required libraries: {e}")
    raise

from ..config import settings
from ..models.schemas import FileType, UploadStatus, FileInfo

class FileHandler:
    """
    Service for handling file operations including upload, validation, and storage.
    Supports both local filesystem and cloud storage (S3/GCP) via configuration.
    """
    
    def __init__(self):
        self.upload_path = Path(settings.UPLOAD_FOLDER)
        self.allowed_extensions = settings.ALLOWED_EXTENSIONS
        self.max_content_length = settings.MAX_CONTENT_LENGTH
        self.files: Dict[str, FileInfo] = {}
        self._dataframe_cache: Dict[str, pd.DataFrame] = {}
        self._file_locks: Dict[str, asyncio.Lock] = {}
        
        # Ensure upload directory exists
        self.upload_path.mkdir(parents=True, exist_ok=True)
    
    def _get_file_lock(self, file_id: str) -> asyncio.Lock:
        """Get or create a lock for a specific file."""
        if file_id not in self._file_locks:
            self._file_locks[file_id] = asyncio.Lock()
        return self._file_locks[file_id]
    
    def _generate_file_id(self) -> str:
        """Generate a unique file ID with timestamp for better debugging."""
        return f"{int(time.time())}_{uuid.uuid4().hex[:8]}"
    
    def _get_file_extension(self, filename: str) -> str:
        """Get the file extension in lowercase with dot (e.g., '.xlsx')."""
        return Path(filename).suffix.lower()
    
    def is_allowed_file(self, filename: str) -> bool:
        """Check if the file has an allowed extension."""
        return self._get_file_extension(filename) in self.allowed_extensions
    
    def validate_file(self, file: Union[BinaryIO, UploadFile], filename: str) -> Dict[str, Any]:
        """
        Optimized file validation with minimal memory usage.
        Returns a dictionary with validation results.
        """
        result = {
            'valid': True,
            'message': 'File is valid',
            'size': 0
        }
        
        try:
            # Fast check for file extension first
            if not self.is_allowed_file(filename):
                result.update({
                    'valid': False,
                    'message': f'File type not allowed. Allowed types: {self.allowed_extensions}'
                })
                return result
            
            file_obj = file.file if hasattr(file, 'file') else file
            original_position = file_obj.tell()
            
            try:
                # Get file size without reading entire file
                file_size = file_obj.seek(0, 2)
                result['size'] = file_size
                
                # Reset file pointer
                file_obj.seek(original_position)
                
                # Check file size
                if file_size > self.max_content_length:
                    result.update({
                        'valid': False,
                        'message': f'File size ({file_size} bytes) exceeds maximum allowed size of {self.max_content_length} bytes'
                    })
                    return result
                
                # Only check signature for non-empty files
                if file_size > 0:
                    # Read minimal bytes needed for signature check
                    header = file_obj.read(8)
                    file_obj.seek(original_position)  # Reset file pointer
                    
                    # Check for Excel file signatures
                    if not any(header.startswith(sig) for sig in [
                        b'\x50\x4B\x05\x06',  # ZIP-based format (XLSX, XLSM, etc.)
                        b'\x50\x4B\x03\x04',  # ZIP header
                        b'\xD0\xCF\x11\xE0'   # OLE2 (XLS) - first 4 bytes
                    ]):
                        logger.warning(f"File {filename} doesn't match Excel file signature.")
                        # Don't fail here, just log a warning
                
                return result
                
            except Exception as e:
                logger.error(f"Error checking file {filename}: {str(e)}")
                result.update({
                    'valid': False,
                    'message': f'Error validating file: {str(e)}'
                })
                return result
            
        except Exception as e:
            logger.error(f"Error validating file {filename}: {str(e)}", exc_info=True)
            return {
                'valid': False,
                'message': f'Error validating file: {str(e)}',
                'error_type': type(e).__name__
            }
            
        finally:
            # Ensure file pointer is reset if it's a file-like object
            if 'file_obj' in locals() and hasattr(file_obj, 'seek'):
                try:
                    file_obj.seek(0)
                except Exception as e:
                    logger.warning(f"Failed to reset file pointer: {str(e)}")
    
    async def save_uploaded_file(
        self, 
        file: Union[BinaryIO, UploadFile], 
        filename: str, 
        file_type: FileType,
        name: Optional[str] = None,
        chunk_size: int = 1024 * 1024  # 1MB chunks by default
    ) -> FileInfo:
        """
        Optimized file upload handler with streaming support.
        
        Args:
            file: The uploaded file (can be a file-like object or FastAPI's UploadFile)
            filename: Original filename
            file_type: Type of the file (mother, single_1, single_2)
            name: Optional display name for the file (defaults to filename if not provided)
            chunk_size: Size of chunks to process at a time (in bytes)
            
        Returns:
            FileInfo: Information about the saved file
        """
        file_id = self._generate_file_id()
        file_extension = self._get_file_extension(filename)
        new_filename = f"{file_id}{file_extension}"
        
        # Ensure upload directory exists
        self.upload_path.mkdir(parents=True, exist_ok=True)
        
        # Get file object and size
        file_obj = file.file if hasattr(file, 'file') else file
        file_size = 0
        
        # Save file in chunks to avoid high memory usage
        destination = self.upload_path / new_filename
        try:
            with open(destination, 'wb') as buffer:
                while True:
                    chunk = await file_obj.read(chunk_size)
                    if not chunk:
                        break
                    buffer.write(chunk)
                    file_size += len(chunk)
        except Exception as e:
            # Clean up partially uploaded file on error
            if destination.exists():
                try:
                    destination.unlink()
                except:
                    pass
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error saving file: {str(e)}"
            )
        
        # Create file info
        return FileInfo(
            id=file_id,
            filename=filename,
            name=name or filename,
            size=file_size,
            upload_time=datetime.utcnow(),
            status=UploadStatus.UPLOADED,
            file_type=file_type
        )
        
        # Save file to disk
        file_path = self.upload_path / new_filename
        
        try:
            with open(file_path, 'wb') as buffer:
                if hasattr(file, 'file'):  # Handle FastAPI's UploadFile
                    shutil.copyfileobj(file.file, buffer)
                else:  # Handle regular file-like objects
                    shutil.copyfileobj(file, buffer)
            
            # Get file size
            file_size = os.path.getsize(file_path)
            
            # Create file info
            file_info = FileInfo(
                id=file_id,
                filename=filename,
                name=name or filename,  # Use provided name or fallback to filename
                size=file_size,
                upload_time=datetime.utcnow(),
                status=UploadStatus.UPLOADED,
                file_type=file_type
            )
            
            # Store file info
            self.files[file_id] = file_info
            
            logger.info(f"Successfully saved file {filename} as {new_filename} ({file_size} bytes)")
            return file_info
            
        except Exception as e:
            logger.error(f"Error saving file {filename}: {str(e)}")
            # Clean up if file was partially written
            if os.path.exists(file_path):
                os.remove(file_path)
            raise HTTPException(
                status_code=500,
                detail=f"Error saving file: {str(e)}"
            )
    
    def get_file_info(self, file_id: str) -> Optional[FileInfo]:
        """Get information about an uploaded file."""
        return self.files.get(file_id)
    
    def get_file_path(self, file_id: str) -> Optional[Path]:
        """Get the filesystem path for an uploaded file."""
        file_info = self.get_file_info(file_id)
        if not file_info:
            return None
            
        file_extension = self._get_file_extension(file_info.filename)
        return self.upload_path / f"{file_id}{file_extension}"
    
    def read_excel_file(self, file_id: str, use_cache: bool = True, **kwargs) -> pd.DataFrame:
        """
        Read an Excel file into a pandas DataFrame.
        Additional kwargs are passed to pandas.read_excel()
        """
        if use_cache and file_id in self._dataframe_cache:
            return self._dataframe_cache[file_id].copy()

        file_path = self.get_file_path(file_id)
        if not file_path or not file_path.exists():
            raise FileNotFoundError(f"File with ID {file_id} not found")
            
        try:
            df = pd.read_excel(file_path, **kwargs)
            if use_cache:
                self._dataframe_cache[file_id] = df
            return df.copy()
        except Exception as e:
            logger.error(f"Error reading Excel file {file_id}: {str(e)}")
            raise ValueError(f"Error reading Excel file: {str(e)}")
    
    def save_dataframe(self, df: pd.DataFrame, filename: str) -> Path:
        """
        Save a pandas DataFrame to an Excel file.
        Returns the path to the saved file.
        """
        file_id = self._generate_file_id()
        file_path = self.upload_path / f"{file_id}.xlsx"
        
        try:
            with pd.ExcelWriter(file_path, engine='xlsxwriter') as writer:
                df.to_excel(writer, index=False)

            # Register the saved merged file in the handler metadata so other
            # services can reference it by its generated ID.
            try:
                file_size = file_path.stat().st_size
                file_info = FileInfo(
                    id=file_id,
                    filename=file_path.name,
                    name=filename,
                    size=file_size,
                    upload_time=datetime.utcnow(),
                    status=UploadStatus.COMPLETED,
                    file_type=FileType.MOTHER,
                )
                self.files[file_id] = file_info
            except Exception:
                # Non-fatal: registration failing should not break saving
                logger.warning("Failed to register saved dataframe in metadata")

            return file_path
        except Exception as e:
            logger.error(f"Error saving DataFrame to {filename}: {str(e)}")
            if file_path.exists():
                file_path.unlink()
            raise
    
    def cleanup_file(self, file_id: str) -> bool:
        """
        Remove an uploaded file and its metadata.
        Returns True if the file was removed, False otherwise.
        """
        file_path = self.get_file_path(file_id)
        
        # Remove file if it exists
        if file_path and file_path.exists():
            try:
                file_path.unlink()
            except Exception as e:
                logger.error(f"Error removing file {file_path}: {str(e)}")
                return False
        
        # Remove from files dictionary
        if file_id in self.files:
            del self.files[file_id]
        if file_id in self._dataframe_cache:
            del self._dataframe_cache[file_id]
            
        return True

# Create a singleton instance
file_handler = FileHandler()
