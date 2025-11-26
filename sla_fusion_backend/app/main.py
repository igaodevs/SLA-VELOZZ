from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import os
from pathlib import Path

from .config import settings
from .routers import upload, merge, download, analytics
from .routers import reports

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
    allow_origins=settings.ALLOWED_ORIGINS or ( ["*"] if settings.DEBUG else [] ),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directory if it doesn't exist
os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)

# Mount static files (only in DEBUG/development)
if settings.DEBUG:
    app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_FOLDER), name="uploads")

# Include routers
app.include_router(upload.router, prefix="/api/v1", tags=["File Upload"])
app.include_router(merge.router, prefix="/api/v1", tags=["File Merge"])
app.include_router(download.router, prefix="/api/v1", tags=["File Download"])
app.include_router(analytics.router, prefix="/api/v1", tags=["Analytics"])
app.include_router(reports.router, prefix="/api/v1", tags=["Reports"])

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": "1.0.0"
    }

# Root endpoint with basic information
@app.get("/")
async def root():
    return {
        "app": settings.APP_NAME,
        "version": "1.0.0",
        "endpoints": {
            "upload": "/api/v1/upload/{file_type}",
            "merge": "/api/v1/merge/",
            "download": "/api/v1/download/{file_id}",
            "docs": "/docs",
            "health": "/health"
        }
    }

# Error handlers
@app.exception_handler(404)
async def not_found_exception_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": f"Endpoint '{request.url}' not found. Available endpoints: /api/v1/upload/{'{file_type}'}, /api/v1/merge/, /api/v1/download/{'{file_id}'}"}
    )

@app.exception_handler(500)
async def server_error_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Please try again later or contact support."}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
