# SLA-VELOZZ

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/igaodevs-projects/v0-sla-velozz)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/eiYJz21ZefS)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/igaodevs-projects/v0-sla-velozz](https://vercel.com/igaodevs-projects/v0-sla-velozz)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/eiYJz21ZefS](https://v0.app/chat/eiYJz21ZefS)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Backend (Python)

This repository includes a Python backend in `sla_fusion_backend` which targets Python 3.11.3.

Files added to help pin/prepare Python:
- `.python-version` and `runtime.txt` — pinam a versão 3.11.3 para ferramentas que leem esses arquivos.
- `sla_fusion_backend/setup-python.ps1` — um script PowerShell que tenta detectar/instalar Python 3.11.x (via `py` ou `winget`), cria um virtualenv `venv311` e instala as dependências do backend.

Quick setup (Windows PowerShell):
```powershell
# From repo root
.\sla_fusion_backend\setup-python.ps1

# After the script completes, activate the venv and run the backend
& '.\sla_fusion_backend\venv311\Scripts\Activate.ps1'
python -m uvicorn sla_fusion_backend.app.main:app --reload --port 8000
```

Manual steps (if you prefer):
```powershell
# Ensure Python 3.11.3 installed: https://www.python.org/downloads/release/python-3113/
py -3.11 -m venv .\sla_fusion_backend\venv311
& '.\sla_fusion_backend\venv311\Scripts\Activate.ps1'
python -m pip install --upgrade pip
python -m pip install -r .\sla_fusion_backend\requirements.txt
python -m uvicorn sla_fusion_backend.app.main:app --reload --port 8000
```

