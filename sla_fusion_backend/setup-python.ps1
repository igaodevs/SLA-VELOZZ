<#
  setup-python.ps1
  - Verifica se Python 3.11.3 está disponível via launcher `py` ou via `python` no PATH.
  - Tenta instalar Python 3.11 via winget caso não exista (pode instalar a última patch 3.11.x disponível).
  - Cria/atualiza um virtualenv em `venv311` usando o interpretador 3.11.

  Uso: executar no PowerShell a partir da raiz do repositório:
    .\sla_fusion_backend\setup-python.ps1

  Nota: para instalação automática via winget é preciso ter permissões e o winget instalado.
#>

Set-StrictMode -Version Latest

function Write-Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Err($msg) { Write-Host "[ERROR] $msg" -ForegroundColor Red }

Write-Info "Verificando disponibilidade do launcher 'py'..."
$py = Get-Command py -ErrorAction SilentlyContinue

if ($null -ne $py) {
    Write-Info "Launcher 'py' encontrado: $($py.Path)"
    try {
        $ver = & py -3.11 --version 2>&1
    } catch {
        $ver = $null
    }
} else {
    $ver = $null
}

if (-not $ver) {
    Write-Info "Tentando detectar 'python' no PATH..."
    $pycmd = Get-Command python -ErrorAction SilentlyContinue
    if ($null -ne $pycmd) {
        Write-Info "python encontrado: $($pycmd.Path)"
        try { $ver = & python --version 2>&1 } catch { $ver = $null }
    }
}

if ($ver) {
    Write-Info "Versão detectada: $ver"
    if ($ver -match '3\.11') {
        Write-Info "Já existe uma instalação 3.11.x. Prosseguindo para criar/atualizar venv311."
    } else {
        Write-Info "Versão não é 3.11.x. Tentaremos instalar/usar 3.11.3 via winget (se disponível)."
    }
} else {
    Write-Info "Nenhuma instalação detectada. Tentando instalar Python 3.11 via winget..."
}

# Tenta instalação automática via winget quando apropriado
if (-not ($ver -and ($ver -match '3\.11'))) {
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if ($null -ne $winget) {
        Write-Info "winget encontrado. Tentando instalar Python 3.11 Runtime (pode instalar a última patch 3.11.x disponível)."
        try {
            winget install --id Python.Python.3.11 -e --source winget --silent
        } catch {
            Write-Err "Instalação via winget falhou. Instale Python 3.11.3 manualmente: https://www.python.org/downloads/release/python-3113/"
        }
    } else {
        Write-Err "winget não encontrado. Instale Python 3.11.3 manualmente: https://www.python.org/downloads/release/python-3113/"
    }
}

# Criar virtualenv com o launcher de 3.11 (py -3.11) se disponível, caso contrário usa 'python'
$venvPath = Join-Path -Path (Get-Location) -ChildPath 'sla_fusion_backend\venv311'
if (Test-Path $venvPath) {
    Write-Info "Virtualenv existente em $venvPath"
} else {
    Write-Info "Criando virtualenv em $venvPath usando Python 3.11..."
    $created = $false
    if (Get-Command py -ErrorAction SilentlyContinue) {
        try {
            & py -3.11 -m venv $venvPath
            $created = $true
        } catch { $created = $false }
    }
    if (-not $created -and (Get-Command python -ErrorAction SilentlyContinue)) {
        try {
            & python -m venv $venvPath
            $created = $true
        } catch { $created = $false }
    }

    if ($created) {
        Write-Info "Virtualenv criado com sucesso. Ative-o com: .\sla_fusion_backend\venv311\Scripts\Activate.ps1"
    } else {
        Write-Err "Não foi possível criar virtualenv. Verifique se Python 3.11 está instalado e acessível (py -3.11 ou python)."
    }
}

Write-Info "Instalar dependências do backend (requirements.txt)..."
if (Test-Path $venvPath) {
    $activate = Join-Path $venvPath 'Scripts\Activate.ps1'
    if (Test-Path $activate) {
        & $activate
        try {
            python -m pip install --upgrade pip
            python -m pip install -r .\sla_fusion_backend\requirements.txt
            Write-Info "Dependências instaladas com sucesso."
        } catch {
            Write-Err "Falha ao instalar dependências. Execute manualmente com o venv ativo: python -m pip install -r .\sla_fusion_backend\requirements.txt"
        }
    } else {
        Write-Err "Script de ativação do venv não encontrado: $activate"
    }
} else {
    Write-Err "Virtualenv não existe. Crie-o antes de instalar dependências."
}

Write-Info "Concluído. Para rodar o backend após ativar o venv: uvicorn sla_fusion_backend.app.main:app --reload --port 8000"
