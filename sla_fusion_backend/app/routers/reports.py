from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse, StreamingResponse
from pathlib import Path
from io import BytesIO
from datetime import datetime
import logging

from ..config import settings
from ..services.merge_service import merge_service
from ..services.analytics_service import analytics_service

try:
    from reportlab.lib.pagesizes import A4, landscape
    from reportlab.pdfgen import canvas
    from reportlab.lib.units import mm
except Exception:
    # reportlab may not be installed in some environments
    reportlab = None

router = APIRouter()
logger = logging.getLogger(__name__)


def get_upload_dir() -> Path:
    return Path(settings.UPLOAD_PATH)


@router.get("/download/file/{filename}")
async def download_file_by_name(filename: str):
    upload_dir = get_upload_dir()
    file_path = upload_dir / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    # Choose media type by extension
    ext = file_path.suffix.lower()
    media_type = "application/octet-stream"
    if ext == ".xlsx":
        media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    elif ext == ".pdf":
        media_type = "application/pdf"
    elif ext == ".png":
        media_type = "image/png"

    return FileResponse(str(file_path), filename=file_path.name, media_type=media_type)


@router.get("/merged/{merge_id}/excel")
async def download_merged_excel(merge_id: str):
    merge_result = merge_service.get_merge_result(merge_id)
    if not merge_result or not merge_result.merged_file_url:
        raise HTTPException(status_code=404, detail="Merged result not found")

    filename = merge_result.merged_file_url.split('/')[-1]
    return await download_file_by_name(filename)


@router.get("/merged/{merge_id}/pdf")
async def generate_merged_pdf(merge_id: str):
    # Generate a summary PDF server-side using analytics_service
    if reportlab is None:
        raise HTTPException(status_code=500, detail="PDF generation library not available on server")

    try:
        analytics = await analytics_service.generate_analytics(merge_id)
    except Exception as e:
        logger.error(f"Error generating analytics for PDF: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    buffer = BytesIO()
    # Create PDF
    c = canvas.Canvas(buffer, pagesize=landscape(A4))
    width, height = landscape(A4)
    margin = 15 * mm

    c.setFont("Helvetica-Bold", 18)
    c.drawString(margin, height - margin - 20, f"Relatório SLA - Merge {merge_id}")
    c.setFont("Helvetica", 10)
    c.drawString(margin, height - margin - 40, f"Gerado em: {datetime.utcnow().isoformat()} UTC")

    # Summary metrics
    metrics_y = height - margin - 70
    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin, metrics_y, "Resumo")
    c.setFont("Helvetica", 10)
    metrics_y -= 16
    sla = analytics.sla_compliance
    c.drawString(margin, metrics_y, f"Total de registros: {analytics.total_records}")
    metrics_y -= 14
    c.drawString(margin, metrics_y, f"Registros Meli: {analytics.meli_records}")
    metrics_y -= 14
    c.drawString(margin, metrics_y, f"SLA Compliance: {sla.get('percentage', sla.get('percentage', 'N/A'))}%")

    # Table of top sellers
    table_y = metrics_y - 30
    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin, table_y, "Top Vendedores")
    table_y -= 18
    c.setFont("Helvetica-Bold", 10)
    c.drawString(margin, table_y, "Pos")
    c.drawString(margin + 40, table_y, "Vendedor")
    c.drawString(margin + 260, table_y, "Atrasos")
    c.drawString(margin + 340, table_y, "SLA %")
    c.setFont("Helvetica", 10)
    table_y -= 12

    for idx, seller in enumerate(analytics.seller_ranking[:15], start=1):
        if table_y < margin + 40:
            c.showPage()
            table_y = height - margin - 40
        c.drawString(margin, table_y, str(idx))
        c.drawString(margin + 40, table_y, str(seller.get('seller_name', '')))
        c.drawString(margin + 260, table_y, str(seller.get('delayed_orders_count', 0)))
        c.drawString(margin + 340, table_y, f"{seller.get('sla_compliance_percentage', 0)}%")
        table_y -= 14

    c.showPage()
    c.save()
    buffer.seek(0)

    return StreamingResponse(buffer, media_type='application/pdf', headers={
        'Content-Disposition': f'attachment; filename="relatorio_{merge_id}.pdf"'
    })
