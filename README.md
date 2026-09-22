# GarimpoML — Plataforma Afiliados Mercado Livre (Next.js + Vercel)

Vitrine Next.js 16 completa para monetizar com o **Programa de Afiliados e Criadores do Mercado Livre** (Termos 30228). 100% dentro das regras: Link Especial visível, cookie 24h (+7 dias Live), #publi CONAR, sem shortener/iframe.

## 🚀 Stack Vercel-Ready
- **Next.js 16 App Router** + Tailwind 4 + TypeScript
- **Edge Redirects** em `/go/[MLB]` (302 → mercadolivre.com.br com `matt_tool`)
- **API Routes**: `/api/links` (gerador), `/api/click` (tracking), `/api/stats` (dashboard), `/api/products` (ISR 1h)
- Pronto para **Vercel Postgres + Prisma + Vercel KV + Analytics**

## 📦 Rodar local
```bash
npm install
cp .env.example .env.local # coloque seu NEXT_PUBLIC_AFFILIATE_ID
npm run dev # http://localhost:3000
npm run build # testa build de produção
```

## 🌐 Deploy na Vercel (1 clique)
1. Push para GitHub
2. [Import na Vercel](https://vercel.com/new) → selecione o repo `garimpoml`
3. Env vars: `NEXT_PUBLIC_AFFILIATE_ID` e `NEXT_PUBLIC_SITE_URL`
4. Deploy — pronto em `https://seu-projeto.vercel.app`

Ou via CLI:
```bash
npm i -g vercel
vercel --prod
```

## 🔗 Como funciona o Link Especial
```
Vitrine: /go/MLB12345678?aff=SEU_ID&cupom=GARIMPO10
   ↓ 302 redirect (edge, no-store, cookie 24h)
ML: https://www.mercadolivre.com.br/p/MLB12345678?matt_tool=SEU_ID&matt_word=GARIMPO10&forceInApp=true
```

- **Cookie 24h** válido para qualquer compra no período
- **Live 7 dias** se adicionar ao carrinho durante transmissão
- **Domínio sempre visível** `mercadolivre.com.br` (Termo 1.8)

## 🗂️ Estrutura
```
src/
  app/
    page.tsx          # Vitrine + Hero + Gerador
    gerador/page.tsx  # Gerador dedicado + cURL
    dashboard/page.tsx# Métricas + comissões
    admin/page.tsx    # CRUD mock → migrar para Prisma
    api/
      links/route.ts  # POST {originalUrl, affiliateId, midia, cupom}
      click/route.ts  # POST {productId, mlbId}
      stats/route.ts  # GET métricas
      products/route.ts # GET ?categoria=&q= (ISR 3600)
    go/[slug]/route.ts # Edge redirect afiliado
  components/
    Header.tsx, ProductCard.tsx, LinkGenerator.tsx, Vitrine.tsx
  lib/
    affiliate.ts # generateAffiliateLink()
    products.ts  # PRODUCTS mock
    types.ts, utils.ts
```

## 🛡️ Compliance (Termos 30228)
- **PROIBIDO**: shortener (bit.ly), iframe, pop-up, cookie forçado, extensão/robô, scraping
- **PROIBIDO Ads**: Google Search/Shopping, Bing, YouTube Ads. Só Meta/TikTok/Pinterest da sua conta
- **PROIBIDO lances** em marca "Mercado Livre/Meli"
- **Obrigatório** #publi em todo post
- Veja `src/lib/affiliate.ts` e `src/app/go/[slug]/route.ts` comentados com artigos

## 🔄 Migrar para Banco Real
```bash
npm i prisma @prisma/client
npx prisma init
# cole POSTGRES_PRISMA_URL no .env
# modele Product, Link, Click, Conversion
npx prisma db push
# troque src/lib/products.ts por prisma.product.findMany()
```

## 📊 Próximos passos
- [ ] Vercel Postgres + Prisma (prod)
- [ ] Vercel KV para rate-limit + deduplicação de cliques
- [ ] Vercel Blob para upload de imagens
- [ ] Webhook para Telegram/WhatsApp bot
- [ ] Vercel Analytics + Speed Insights

## ⚖️ Aviso Legal
Vitrine independente de afiliado. Não somos representantes do Mercado Livre. Marcas são do ML. Comissões conforme tabela oficial 27913.

---
Feito em Guanambi, BA — para afiliados brasileiros.
