# Este arquivo torna o diretório um pacote Python
# Importe os roteadores aqui para facilitar as importações
from .upload import router as upload_router
from .merge import router as merge_router
from .download import router as download_router
from .analytics import router as analytics_router

# Lista de todos os roteadores para facilitar a importação no main.py
routers = [
    upload_router,
    merge_router,
    download_router,
    analytics_router
]
