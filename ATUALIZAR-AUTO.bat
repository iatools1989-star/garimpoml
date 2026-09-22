@echo off
chcp 65001 >nul
title GarimpoML - Atualizar Piloto Automatico
color 0A
echo ====================================================
echo   GarimpoML - Atualizando Piloto Automatico
echo   Misto 5-10 ofertas/dia - Telegram + WhatsApp
echo ====================================================
echo.
echo [1/3] Verificando alteracoes...
git status --short
echo.
echo [2/3] Fazendo commit...
git add .
git commit -m "feat: piloto automatico misto WhatsApp Telegram 5-10/dia + cron diario"
if %errorlevel% neq 0 (
  echo       Nenhuma alteracao nova ou erro no commit, continuando...
)
echo.
echo [3/3] Enviando para GitHub...
set /p GH_TOKEN= Cole seu token ghp_... : 
git remote set-url origin https://iatools1989-star:%GH_TOKEN%@github.com/iatools1989-star/garimpoml.git
git push
if %errorlevel% equ 0 (
  echo.
  echo ====================================================
  echo   SUCESSO! Atualizado!
  echo ====================================================
  echo   Aguarde 1-2 min na Vercel e acesse:
  echo   https://garimpoml-iatoolsonline.vercel.app/admin/auto
  echo   ou seu dominio vercel.app/admin/auto
) else (
  echo   ERRO no push - verifique token
)
git remote set-url origin https://github.com/iatools1989-star/garimpoml.git
set GH_TOKEN=
pause
