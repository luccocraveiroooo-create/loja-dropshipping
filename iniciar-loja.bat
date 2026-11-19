@echo off
title PrimeStore - Loja Virtual Dropshipping
echo ======================================================
echo    INICIANDO SUA LOJA VIRTUAL DE ALTA CONVERSAO...
echo ======================================================
echo.
cd /d "%~dp0"
set PATH=%~dp0..\node-env\node-v20.18.0-win-x64;%PATH%

echo Abrindo loja no seu navegador...
start http://localhost:3000

echo Servidor ativo em: http://localhost:3000
echo Pressione Ctrl + C para encerrar.
npm run dev
