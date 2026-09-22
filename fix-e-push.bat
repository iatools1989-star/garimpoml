@echo off
chcp 65001 >nul
title GarimpoML - Fix e Push Automatico
color 0A
echo ====================================================
echo   GarimpoML - Correcao Vercel + Envio GitHub
echo   Plano Hobby: corrige cron para 1x por dia
echo ====================================================
echo.

:: 1. Verifica se esta na pasta certa
if not exist "vercel.json" (
  echo [ERRO] vercel.json nao encontrado!
  echo        Execute este .bat DENTRO da pasta C:\garimpoml
  pause
  exit /b
)

:: 2. Corrige vercel.json automaticamente (troca 0 * * * * -> 0 12 * * *)
echo [1/4] Corrigindo vercel.json para plano Hobby...
powershell -Command "(Get-Content vercel.json) -replace '0 \* \* \* \*', '0 12 * * *' | Set-Content vercel.json -Encoding utf8" 2>nul
if %errorlevel% neq 0 (
  echo       Powershell falhou, usando metodo alternativo...
  echo {> vercel.json.tmp
  echo   "framework": "nextjs",>> vercel.json.tmp
  echo   "buildCommand": "npm run build",>> vercel.json.tmp
  echo   "regions": ["gru1"],>> vercel.json.tmp
  echo   "headers": [>> vercel.json.tmp
  echo     {>> vercel.json.tmp
  echo       "source": "/api/(.*)",>> vercel.json.tmp
  echo       "headers": [{ "key": "Cache-Control", "value": "no-store, max-age=0" }]>> vercel.json.tmp
  echo     }>> vercel.json.tmp
  echo   ],>> vercel.json.tmp
  echo   "crons": [>> vercel.json.tmp
  echo     {>> vercel.json.tmp
  echo       "path": "/api/revalidate?tag=products",>> vercel.json.tmp
  echo       "schedule": "0 12 * * *" >> vercel.json.tmp
  echo     }>> vercel.json.tmp
  echo   ]>> vercel.json.tmp
  echo }>> vercel.json.tmp
  move /y vercel.json.tmp vercel.json >nul
)
echo       OK - vercel.json corrigido para "0 12 * * *" (1x por dia)
echo.

:: 3. Mostra o que mudou
echo [2/4] Verificando alteracoes...
git status --short
echo.

:: 4. Pede o token de forma segura
echo [3/4] GitHub - Autenticacao
echo       Gere um token novo em: https://github.com/settings/tokens/new
echo       Marque apenas [repo] e copie o ghp_...
echo.
set /p GH_TOKEN= Cole seu token ghp_... aqui e tecle ENTER: 

if "%GH_TOKEN%"=="" (
  echo [ERRO] Token vazio! Cancele e tente novamente.
  pause
  exit /b
)

:: 5. Faz commit e push
echo.
echo [4/4] Enviando para o GitHub...
git add vercel.json
git add .
git diff --cached --quiet
if %errorlevel% equ 0 (
  echo       Nenhuma alteracao nova para commit, tentando push direto...
) else (
  git commit -m "fix: cron diario para plano Hobby Vercel"
  if %errorlevel% neq 0 (
    echo [AVISO] Erro no commit, mas vou tentar o push mesmo assim...
  )
)

:: Configura remote com token temporariamente
git remote set-url origin https://iatools1989-star:%GH_TOKEN%@github.com/iatools1989-star/garimpoml.git

echo       Enviando...
git push

if %errorlevel% equ 0 (
  echo.
  echo ====================================================
  echo   SUCESSO! Enviado para o GitHub com sucesso!
  echo ====================================================
  echo   Limpando token da URL por seguranca...
  git remote set-url origin https://github.com/iatools1989-star/garimpoml.git
  echo   OK! Vercel vai fazer deploy automatico em 1-2 min.
  echo   Acompanhe em: https://vercel.com/dashboard
) else (
  echo.
  echo ====================================================
  echo   ERRO no push - Token invalido ou sem permissao repo
  echo ====================================================
  echo   Dicas:
  echo   - Gere um NOVO token em https://github.com/settings/tokens/new
  echo   - Marque a caixinha [repo]
  echo   - Copie o ghp_... inteiro sem espacos
  git remote set-url origin https://github.com/iatools1989-star/garimpoml.git
)

:: Limpa variavel da memoria
set GH_TOKEN=
echo.
pause
