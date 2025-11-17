from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from pathlib import Path

from .config import settings
from .routers import upload, merge, download, analytics

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description="SLA Fusion Backend API for Excel file processing",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directory if it doesn't exist
os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)

# Mount static files (for serving uploaded files in development)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_FOLDER), name="uploads")

# Include routers
app.include_router(upload.router, prefix="/api/v1", tags=["File Upload"])
app.include_router(merge.router, prefix="/api/v1", tags=["File Merge"])
app.include_router(download.router, prefix="/api/v1", tags=["File Download"])
app.include_router(analytics.router, prefix="/api/v1", tags=["Analytics"])

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
