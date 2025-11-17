from pydantic import BaseSettings
from typing import Optional
import os
from pathlib import Path

class Settings(BaseSettings):
    # Application settings
    APP_NAME: str = "SLA Fusion API"
    DEBUG: bool = True
    
    # File upload settings
    UPLOAD_FOLDER: str = "uploads"
    MAX_CONTENT_LENGTH: int = 200 * 1024 * 1024  # 200MB
    ALLOWED_EXTENSIONS: set = {".xlsx", ".xls"}
    
    # JWT Settings (for future authentication)
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Storage settings (local by default, can be overridden to use S3/GCP)
    STORAGE_TYPE: str = "local"  # 'local', 's3', or 'gcp'
    
    # Create upload directory if it doesn't exist
    @property
    def UPLOAD_PATH(self):
        path = Path(self.UPLOAD_FOLDER)
        path.mkdir(parents=True, exist_ok=True)
        return path

# Initialize settings
settings = Settings()
