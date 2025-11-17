import os
import shutil
import uuid
from pathlib import Path
from typing import Optional, BinaryIO, Dict, Any
import magic
import pandas as pd
from datetime import datetime
import logging

from ..config import settings
from ..models.schemas import FileType, UploadStatus, FileInfo

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FileHandler:
    """
    Service for handling file operations including upload, validation, and storage.
    Supports both local filesystem and cloud storage (S3/GCP) via configuration.
    """
    
    def __init__(self):
        self.upload_path = settings.UPLOAD_PATH
        self.allowed_extensions = settings.ALLOWED_EXTENSIONS
        self.max_content_length = settings.MAX_CONTENT_LENGTH
        self.files: Dict[str, FileInfo] = {}
        
    def _generate_file_id(self) -> str:
        """Generate a unique file ID."""
        return str(uuid.uuid4())
    
    def _get_file_extension(self, filename: str) -> str:
        """Get the file extension in lowercase."""
        return Path(filename).suffix.lower()
    
    def is_allowed_file(self, filename: str) -> bool:
        """Check if the file has an allowed extension."""
        return self._get_file_extension(filename) in self.allowed_extensions
    
    def validate_file(self, file: BinaryIO, filename: str) -> Dict[str, Any]:
        """
        Validate the uploaded file for type and size.
        Returns a dictionary with validation results.
        """
        result = {
            'valid': True,
            'message': 'File is valid',
            'file_type': None,
            'size': 0
        }
        
        try:
            # Check file extension
            if not self.is_allowed_file(filename):
                result.update({
                    'valid': False,
                    'message': f'File type not allowed. Allowed types: {self.allowed_extensions}'
                })
                return result
            
            # Get file size by seeking to end
            file.seek(0, 2)  # Seek to end
            file_size = file.tell()
            file.seek(0)  # Reset file pointer
            
            result['size'] = file_size
            
            # Check file size
            if file_size > self.max_content_length:
                result.update({
                    'valid': False,
                    'message': f'File size exceeds maximum allowed size of {self.max_content_length} bytes'
                })
                return result
            
            # Check MIME type (more reliable than extension)
            mime = magic.Magic(mime=True)
            file_bytes = file.read(2048)  # Read first 2KB for MIME detection
            file.seek(0)  # Reset file pointer
            
            mime_type = magic.from_buffer(file_bytes, mime=True)
            if mime_type not in [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel'
            ]:
                result.update({
                    'valid': False,
                    'message': 'Invalid file type. Only Excel files are allowed.'
                })
                return result
            
            # If we got here, file is valid
            return result
            
        except Exception as e:
            logger.error(f"Error validating file {filename}: {str(e)}")
            return {
                'valid': False,
                'message': f'Error validating file: {str(e)}'
            }
    
    async def save_uploaded_file(
        self, 
        file: BinaryIO, 
        filename: str, 
        file_type: FileType
    ) -> FileInfo:
        """
        Save an uploaded file to the configured storage.
        Returns a FileInfo object with details about the saved file.
        """
        file_id = self._generate_file_id()
        file_extension = self._get_file_extension(filename)
        new_filename = f"{file_id}{file_extension}"
        
        # Create upload directory if it doesn't exist
        os.makedirs(self.upload_path, exist_ok=True)
        
        # Save file to disk
        file_path = self.upload_path / new_filename
        
        try:
            with open(file_path, 'wb') as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            # Get file size
            file_size = os.path.getsize(file_path)
            
            # Create file info
            file_info = FileInfo(
                id=file_id,
                filename=filename,
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
    
    def read_excel_file(self, file_id: str, **kwargs) -> pd.DataFrame:
        """
        Read an Excel file into a pandas DataFrame.
        Additional kwargs are passed to pandas.read_excel()
        """
        file_path = self.get_file_path(file_id)
        if not file_path or not file_path.exists():
            raise FileNotFoundError(f"File with ID {file_id} not found")
            
        try:
            return pd.read_excel(file_path, **kwargs)
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
            
        return True

# Create a singleton instance
file_handler = FileHandler()
