# 🚀 Guia Completo para Iniciantes — Do Zero ao Deploy na Vercel
### GarimpoML | Next.js + Mercado Livre Afiliados
**Para quem nunca usou Git/GitHub. Passo a passo com copia e cola.**

---

## 📋 ANTES DE COMEÇAR — Checklist de 2 minutos

Marque o que você já tem:
- [ ] Conta no **GitHub** (grátis) → https://github.com/signup
- [ ] Conta na **Vercel** (grátis, login com GitHub) → https://vercel.com/signup
- [ ] **Node.js** instalado (você já tem `v20.20.2` ✅)
- [ ] **Git** instalado (você já tem `v2.47.3` ✅)
- [ ] Conta no **Mercado Livre + Mercado Pago** (para pegar ID de afiliado depois)

> Se não tem GitHub/Vercel, cria agora. É grátis e leva 1 min cada. Use o mesmo e-mail.

---

## PARTE 1: TESTAR LOCALMENTE (SEM GitHub ainda) — 5 MIN

Vamos garantir que tudo funciona no seu computador antes de subir.

### 1.1 Abra o terminal na pasta do projeto
Se você baixou o projeto, abra o terminal e digite:
```bash
cd garimpoml
```

> No nosso ambiente aqui, o projeto já está em `/home/user/garimpoml` e o servidor já está rodando em `http://localhost:3000`

### 1.2 Instale as dependências (só 1 vez)
```bash
npm install
```
Vai demorar ~40s. É normal.

### 1.3 Configure seu ID de afiliado (temporário)
Crie um arquivo `.env.local` na raiz:
```bash
# Windows: use o Bloco de Notas
# Mac/Linux: use o terminal
echo "NEXT_PUBLIC_AFFILIATE_ID=afiliado_teste" > .env.local
echo "NEXT_PUBLIC_SITE_URL=http://localhost:3000" >> .env.local
```
> Depois que for aprovado no programa do Mercado Livre, você troca `afiliado_teste` pelo seu ID real.

### 1.4 Rode o projeto
```bash
npm run dev
```
Abra no navegador: **http://localhost:3000**

Você deve ver:
- Hero amarelo "Sua vitrine que converte em 24h"
- Vitrine com 12 produtos
- Filtros (Tech, Casa, Beleza)

**Teste o gerador:**
1. Vá em `Gerador` no menu
2. Cole: `https://www.mercadolivre.com.br/p/MLB12345678`
3. Clique `Gerar Link Especial` → copia o link
4. Clique `Testar` → deve abrir o Mercado Livre

**Teste o redirect /go:**
Abra: `http://localhost:3000/go/MLB12345678?aff=seu_teste`
Deve redirecionar para `mercadolivre.com.br/p/MLB12345678?matt_tool=seu_teste...`

Se funcionou → **PARTE 2**

Para parar o servidor: `Ctrl + C` no terminal.

---

## PARTE 2: CRIAR CONTA E REPOSITÓRIO NO GITHUB — 3 MIN

### 2.1 Crie o repositório (pela web — mais fácil para iniciante)

1. Acesse https://github.com/new
2. Preencha:
   - **Repository name:** `garimpoml` (ou `vitrine-afiliados-ml`)
   - **Description:** `Vitrine Next.js para afiliados Mercado Livre`
   - **Public** ✅ (deixe público, é grátis)
   - ❌ **NÃO marque** "Add a README file" (nosso projeto já tem)
   - ❌ **NÃO marque** "Add .gitignore" (já temos)
3. Clique `Create repository`
4. **COPIE a URL que aparece** na próxima página. Vai ser algo como:
   ```
   https://github.com/SEU-USUARIO/garimpoml.git
   ```
   > Guarde! Vamos usar no próximo passo.

### 2.2 Se ainda não configurou o Git no seu computador (só 1 vez na vida)
Abra o terminal e digite (troque pelo seu nome/email do GitHub):
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```
Verifique:
```bash
git config --list
```

---

## PARTE 3: SUBIR O PROJETO PARA O GITHUB — 5 MIN (COPIA E COLA)

> Abra o terminal **DENTRO da pasta `garimpoml`** (`cd garimpoml`)

Execute **linha por linha**, esperando cada uma terminar:

```bash
# 1. Iniciar o Git no projeto (cria pasta .git)
git init

# 2. Dizer ao Git que usaremos branch "main"
git branch -M main

# 3. Adicionar TODOS os arquivos para envio
git add .

# 4. Ver o que será enviado (opcional, só para conferir)
git status
# Deve mostrar vários arquivos verdes (src/, package.json etc)
# Se aparecer .env.local → PROBLEMA! Ele não deve subir. Nosso .gitignore já bloqueia.

# 5. Criar o primeiro "save" (commit)
git commit -m "feat: vitrine GarimpoML Next.js + API afiliados pronta para Vercel"

# 6. Conectar seu projeto local ao GitHub (COLE SUA URL AQUI)
git remote add origin https://github.com/SEU-USUARIO/garimpoml.git
# ⚠️ TROQUE SEU-USUARIO pelo seu usuário real!

# 7. Enviar para o GitHub
git push -u origin main
```

### 🔴 Deu erro de senha/autenticação?

O GitHub não aceita mais senha normal. Você precisa de um **Personal Access Token (PAT)**:

1. Vá em https://github.com/settings/tokens/new
2. **Note:** `garimpoml deploy`
3. **Expiration:** 90 days
4. Marque ✅ `repo` (primeira caixinha)
5. Clique `Generate token` → **COPIE O TOKEN** (só aparece 1 vez!)
6. Use o token como senha quando pedir:
   - Username: `SEU-USUARIO`
   - Password: `cole o token aqui`

Ou faça login via navegador quando o Git pedir (GitHub CLI).

**Se funcionou**, volte ao GitHub e atualize a página — seus arquivos devem aparecer!

---

## PARTE 4: DEPLOY NA VERCEL (CONECTAR GITHUB) — 4 MIN

### 4.1 Importar projeto
1. Acesse https://vercel.com/new
2. Clique `Continue with GitHub` (autorize se pedir)
3. Em `Import Git Repository`, procure `garimpoml` e clique `Import`

### 4.2 Configurar projeto (NÃO CLIQUE EM DEPLOY AINDA)
Na tela `Configure Project`:
- **Framework Preset:** `Next.js` (já deve vir selecionado)
- **Root Directory:** `./` (deixe padrão)
- **Build Command:** `npm run build` (padrão)

### 4.3 Adicionar Variáveis de Ambiente (MUITO IMPORTANTE)
Clique em `Environment Variables` e adicione:

| Key | Value | Onde pegar |
|-----|-------|------------|
| `NEXT_PUBLIC_AFFILIATE_ID` | `afiliado_789012` (temporário) | Depois troque pelo seu ID real do ML |
| `NEXT_PUBLIC_SITE_URL` | `https://garimpoml-SEUUSER.vercel.app` | Vercel vai gerar, pode deixar vazio por enquanto e editar depois |

> Clique `Add` para cada uma.

### 4.4 Deploy
Clique `Deploy` → aguarde 1-2 min → 🎉 `Congratulations!`

Clique `Visit` ou no print da vitrine. Sua URL será algo como:
```
https://garimpoml-seuuser.vercel.app
https://garimpoml-git-main-seuuser.vercel.app
```

**Teste na URL da Vercel:**
- Abre a vitrine?
- `https://sua-url.vercel.app/go/MLB12345678?aff=teste` redireciona?
- `/gerador` gera link?
- `/dashboard` mostra métricas?

Se sim → **PARTE 5**

---

## PARTE 5: COMO ATUALIZAR O SITE DEPOIS (30 SEGUNDOS)

Agora que está conectado, **toda vez que você der `git push`, a Vercel atualiza sozinha!**

Exemplo: você trocou um preço em `src/lib/products.ts`

```bash
# 1. Veja o que mudou
git status

# 2. Adicione
git add .

# 3. Salve
git commit -m "atualiza preço Air Fryer"

# 4. Envie → Vercel faz deploy automático!
git push
```

Acompanhe em https://vercel.com/dashboard → seu projeto → `Deployments` (fica verdinho quando termina).

---

## PARTE 6: PEGAR SEU ID REAL DE AFILIADO (PARA GANHAR COMISSÃO)

> Sem isso você testa, mas não ganha.

1. Acesse https://www.mercadolivre.com.br/afiliados
2. Clique `Quero ser afiliado` → login ML → aceite Termos 30228
3. Preencha Mídias: Instagram, TikTok, Blog, WhatsApp (precisa ter perfil público)
4. Aguarde aprovação (até 48h)
5. Aprovado → copie seu `ID matt_tool` (ex: `afiliado_123456`)
6. Vá na Vercel → seu projeto → `Settings` → `Environment Variables` → edite `NEXT_PUBLIC_AFFILIATE_ID` para o ID real → `Save` → `Redeploy`

**Como saber se está ganhando?**
- Mercado Livre → Afiliados → Painel → Relatórios (atualiza diariamente)
- Sua vitrine `/dashboard` vai passar a mostrar dados reais quando ligar Postgres depois

---

## PARTE 7: CHECKLIST DE TESTES ANTES DE DIVULGAR

- [ ] `npm run build` passa sem erro local?
- [ ] `/go/MLB...` redireciona para `mercadolivre.com.br` com `matt_tool`?
- [ ] Botão da vitrine tem `mercadolivre.com.br` visível? (Termo 1.8)
- [ ] Todo post tem `#publi`? (nossa vitrine já coloca)
- [ ] Testou em celular? (responsivo)
- [ ] Não usou Google Ads Search/Shopping? (proibido)
- [ ] Não encurtou link com bit.ly? (proibido)

---

## 🆘 PROBLEMAS COMUNS E SOLUÇÕES

**`git: command not found`**
→ Instale Git: https://git-scm.com/downloads

**`npm: command not found`**
→ Instale Node.js: https://nodejs.org (LTS)

**`failed to push` → `! [rejected] ...`**
→ Você marcou "Add README" ao criar repo. Solução:
```bash
git pull --rebase origin main
git push -u origin main
```

**`remote origin already exists`**
```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/garimpoml.git
```

**Vercel build falhou**
→ Vá em Vercel → Deployments → clique no erro → veja log. 90% é falta de `NEXT_PUBLIC_AFFILIATE_ID`. Adicione e `Redeploy`.

**Quero mudar domínio**
→ Vercel → Settings → Domains → Add `seudominio.com.br` (precisa comprar domínio antes)

---

## 🎯 PRÓXIMOS PASSOS (DEPOIS DO PRIMEIRO DEPLOY)

1. **Trocar produtos mock** por reais: edite `src/lib/products.ts` ou use `/admin` para adicionar
2. **Conectar banco** (Vercel Postgres) para não perder produtos ao dar deploy — veja `README.md` → "Migrar para Banco Real"
3. **Criar grupos** WhatsApp/Telegram e postar 3 ofertas/dia com links `/go`
4. **Fazer 1 Live** no app ML para testar cookie 7 dias

---

## 📦 O QUE FAZER AGORA (COPIA E COLA FINAL)

Se você está no nosso ambiente `/home/user/garimpoml` e quer subir AGORA:

```bash
cd /home/user/garimpoml
git init
git branch -M main
git add .
git commit -m "feat: primeira versão GarimpoML"
# TROQUE A URL ABAIXO PELA SUA:
git remote add origin https://github.com/SEU-USUARIO/garimpoml.git
git push -u origin main
```

Depois vá em https://vercel.com/new e importe.

---

**Dúvida?** Me diga em que passo travou (manda print do erro) que eu te ajudo no próximo comando exato.

Feito com ❤️ para iniciantes — Guanambi, BA → Vercel Edge em `gru1` (São Paulo) = site super rápido no Brasil.
