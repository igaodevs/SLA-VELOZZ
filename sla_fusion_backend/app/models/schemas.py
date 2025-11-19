from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Dict, Any
from enum import Enum
from datetime import datetime

class FileType(str, Enum):
    MOTHER = "mother"
    SINGLE_1 = "single_1"
    SINGLE_2 = "single_2"

class UploadStatus(str, Enum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class FileInfo(BaseModel):
    id: str = Field(..., description="Unique identifier for the file")
    filename: str = Field(..., description="Name of the file")
    name: Optional[str] = Field(default=None, description="Optional display name for the file")
    size: int = Field(..., description="Size of the file in bytes")
    upload_time: datetime = Field(..., description="Timestamp when the file was uploaded")
    status: UploadStatus = Field(..., description="Current status of the file")
    file_type: FileType = Field(..., description="Type of the file")

class FileUploadResponse(BaseModel):
    file_id: str = Field(..., description="Unique identifier for the uploaded file")
    filename: str = Field(..., description="Original filename")
    name: Optional[str] = Field(default=None, description="Optional display name for the file")
    file_type: FileType = Field(..., description="Type of the uploaded file")
    status: UploadStatus = Field(..., description="Current status of the file")
    upload_time: datetime = Field(default_factory=datetime.utcnow)
    size: int = Field(..., description="File size in bytes")
    message: Optional[str] = Field(None, description="Additional status message")

class MergeRequest(BaseModel):
    mother_file_id: str = Field(..., description="ID of the mother file")
    single_file_ids: List[str] = Field(..., description="List of single file IDs to merge")
    options: Optional[Dict[str, Any]] = Field(
        default_factory=dict,
        description="Additional merge options"
    )

class MergeResponse(BaseModel):
    merge_id: str = Field(..., description="Unique identifier for the merge operation")
    status: str = Field(..., description="Status of the merge operation")
    merged_file_url: Optional[str] = Field(None, description="URL to download the merged file")
    message: Optional[str] = Field(None, description="Additional status message")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    preview_data: Optional[List[Dict[str, Any]]] = Field(
        default=None,
        description="Optional preview of merged rows as JSON records for the frontend table"
    )

class AnalyticsResponse(BaseModel):
    seller_ranking: List[Dict[str, Any]] = Field(..., description="Ranking of sellers by delays")
    sla_compliance: Dict[str, float] = Field(..., description="SLA compliance percentages")
    total_records: int = Field(..., description="Total number of records processed")
    meli_records: int = Field(..., description="Number of records containing 'meli'")
    generated_at: datetime = Field(default_factory=datetime.utcnow)

class ErrorResponse(BaseModel):
    detail: str = Field(..., description="Error message")
    error_type: str = Field(..., description="Type of error")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
