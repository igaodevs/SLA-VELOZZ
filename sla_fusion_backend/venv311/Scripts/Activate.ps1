# Minimal Activate.ps1 for venv311
param()

$venv = Split-Path -Parent $MyInvocation.MyCommand.Path
$venvRoot = Split-Path $venv -Parent

# Set VIRTUAL_ENV variable
$env:VIRTUAL_ENV = $venvRoot

# Prepend Scripts and Library\bin to PATH
$oldPath = $env:PATH
$scriptsPath = Join-Path $venvRoot 'Scripts'
$env:PATH = "$scriptsPath;$oldPath"

Write-Host "Activated virtualenv at: $venvRoot" -ForegroundColor Green
Write-Host "Use 'deactivate' to exit this environment only if you created a deactivate function." -ForegroundColor DarkCyan
