@echo off
chcp 65001 >nul
title GarimpoML - Integrar Perfil Social 84129889
color 0A
echo ====================================================
echo   Integrando seu Perfil Social 84129889
echo   sigu4567772 - Guilherme Silva
echo ====================================================
echo.
echo [1/3] Verificando...
git status --short
echo.
echo [2/3] Commit...
git add .
git commit -m "feat: integra perfil social sigu4567772 ID 84129889 destaque vitrine"
echo.
echo [3/3] Enviando...
set /p GH_TOKEN= Cole seu token ghp_... : 
git remote set-url origin https://iatools1989-star:%GH_TOKEN%@github.com/iatools1989-star/garimpoml.git
git push
git remote set-url origin https://github.com/iatools1989-star/garimpoml.git
set GH_TOKEN=
echo.
echo Pronto! Seu perfil agora e o 1o card da vitrine.
echo Configure na Vercel: NEXT_PUBLIC_AFFILIATE_ID=84129889
pause
