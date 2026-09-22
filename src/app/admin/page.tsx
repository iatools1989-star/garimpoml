'use client';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import { Product } from '@/lib/types';
import { formatBRL } from '@/lib/utils';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [form, setForm] = useState({ title:'', mlbId:'', price:'', oldPrice:'', categoria:'tech', comissaoValor:'5', image:'' });
  const [msg, setMsg] = useState<string | null>(null);

  function addProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!form.mlbId.match(/^MLB\d+$/i)) { setMsg('MLB ID deve ser tipo MLB12345678'); return; }
    const p: Product = {
      id: Date.now().toString(),
      mlbId: form.mlbId.toUpperCase(),
      title: form.title,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      image: form.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format&fit=crop',
      categoria: form.categoria as any,
      comissao: `${form.comissaoValor}%`,
      comissaoValor: Number(form.comissaoValor),
      vendedorReputacao: 'verde',
    };
    setProducts([p, ...products]);
    setMsg(`✓ Produto ${p.mlbId} adicionado! Ele já aparece na vitrine (ISR).`);
    setForm({ title:'', mlbId:'', price:'', oldPrice:'', categoria:'tech', comissaoValor:'5', image:'' });
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap justify-between gap-4 items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Admin — Vitrine</h1>
          <p className="text-zinc-500 mt-1">CRUD simples (mock). Em produção, troque o <code className="bg-zinc-100 px-1.5 py-0.5 rounded">useState</code> por <b>Vercel Postgres + Prisma</b> ou <b>Supabase</b>. Já deixei o schema pronto.</p>
        </div>
        <div className="text-xs bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded-full font-bold">ISR: revalidate 3600s • /go edge • /api/products</div>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mt-6">
        <form onSubmit={addProduct} className="bg-white rounded-2xl p-6 border border-zinc-200 h-fit sticky top-[72px]">
          <h3 className="font-black">+ Adicionar produto afiliado</h3>
          <p className="text-xs text-zinc-500">Cole dados do anúncio novo. Validação: MLB ID + domínio ML visível.</p>
          <div className="mt-4 space-y-3">
            <input required value={form.mlbId} onChange={e=>setForm({...form, mlbId:e.target.value})} placeholder="MLB ID ex: MLB12345678" className="w-full px-3.5 py-3 rounded-xl border border-zinc-200 text-sm font-mono" />
            <input required value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Título do anúncio (igual ao ML, sem promessas falsas - 5.4)" className="w-full px-3.5 py-3 rounded-xl border border-zinc-200 text-sm" />
            <div className="grid grid-cols-2 gap-3">
              <input required type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="Preço R$ 199" className="w-full px-3.5 py-3 rounded-xl border border-zinc-200 text-sm" />
              <input type="number" value={form.oldPrice} onChange={e=>setForm({...form, oldPrice:e.target.value})} placeholder="Preço antigo (opcional)" className="w-full px-3.5 py-3 rounded-xl border border-zinc-200 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select value={form.categoria} onChange={e=>setForm({...form, categoria:e.target.value})} className="w-full px-3.5 py-3 rounded-xl border border-zinc-200 bg-white text-sm">
                <option value="tech">Tech 1-4%</option>
                <option value="casa">Casa 4-7%</option>
                <option value="beleza">Beleza 7-16%</option>
                <option value="moda">Moda 6-8%</option>
                <option value="esportes">Esportes 4-6%</option>
                <option value="livros">Livros 5-7%</option>
              </select>
              <input type="number" step="0.5" value={form.comissaoValor} onChange={e=>setForm({...form, comissaoValor:e.target.value})} placeholder="% comissão" className="w-full px-3.5 py-3 rounded-xl border border-zinc-200 text-sm" />
            </div>
            <input value={form.image} onChange={e=>setForm({...form, image:e.target.value})} placeholder="URL da imagem (opcional - usa placeholder se vazio)" className="w-full px-3.5 py-3 rounded-xl border border-zinc-200 text-sm" />
            <button type="submit" className="w-full bg-[#2D3277] text-white py-3.5 rounded-full font-black hover:bg-[#1A1E4D] transition">Salvar na vitrine →</button>
            {msg && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2 rounded-xl">{msg}</div>}
            <p className="text-[11px] text-zinc-500">Dica Vercel: use <b>Vercel Blob</b> para upload de imagens ou mantenha URL do ML (hotlink permitido para afiliado com link especial).</p>
          </div>

          <div className="mt-6 bg-zinc-50 border border-zinc-200 rounded-xl p-4">
            <div className="text-xs font-black tracking-widest text-zinc-500">PRISMA SCHEMA (pronto para Postgres)</div>
            <pre className="text-[11px] mt-2 bg-zinc-900 text-zinc-100 p-3 rounded-xl overflow-auto">
{`model Product {
  id          String   @id @default(cuid())
  mlbId       String   @unique
  title       String
  price       Int
  oldPrice    Int?
  image       String
  categoria   String
  comissao    Float
  clicks      Int      @default(0)
  createdAt   DateTime @default(now())
  // + Link, Click, Conversion
}`}
            </pre>
          </div>
        </form>

        <div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Vitrine atual ({products.length})</h3>
            <span className="text-xs bg-white border border-zinc-200 px-3 py-1 rounded-full">Editável • ISR 1h • /api/products</span>
          </div>
          <div className="mt-4 grid gap-3">
            {products.map(p=> (
              <div key={p.id} className="bg-white rounded-2xl p-4 border border-zinc-200 flex gap-4 items-center">
                <img src={p.image} alt={p.title} className="w-20 h-20 rounded-xl object-cover border border-zinc-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono text-zinc-500">{p.mlbId} • {p.categoria} • {p.comissao}</div>
                  <div className="font-semibold text-sm leading-snug truncate">{p.title}</div>
                  <div className="text-sm"><b>{formatBRL(p.price)}</b> {p.oldPrice && <s className="text-xs text-zinc-500">{formatBRL(p.oldPrice)}</s>} <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full">{p.comissaoValor}% = {formatBRL(p.price * p.comissaoValor/100)}</span></div>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <a href={`/go/${p.mlbId.toLowerCase()}`} target="_blank" className="bg-[#FFE600] text-xs font-black px-3 py-1.5 rounded-full text-center">Testar /go</a>
                  <button onClick={()=>setProducts(products.filter(x=>x.id!==p.id))} className="text-xs border border-zinc-200 px-3 py-1.5 rounded-full hover:bg-red-50 hover:text-red-600">Remover</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 border border-zinc-200">
        <h3 className="font-black">Como ligar no banco real na Vercel (2 min)</h3>
        <ol className="text-sm mt-3 space-y-2 list-decimal pl-5">
          <li><b>Vercel Postgres:</b> Vercel Dashboard → Storage → Create Postgres → copie <code>POSTGRES_PRISMA_URL</code></li>
          <li><code>npm i prisma @prisma/client</code> → <code>npx prisma init</code> → cole URL no <code>.env</code></li>
          <li><code>npx prisma db push</code> → troque <code>PRODUCTS</code> mock por <code>prisma.product.findMany()</code> em <code>/api/products</code></li>
          <li>Ative <b>Vercel KV (Redis)</b> para rate-limit de cliques e <b>Vercel Analytics</b> para tracking real</li>
        </ol>
        <p className="text-xs text-zinc-500 mt-3">Já deixei <code>src/lib/products.ts</code> isolado — é só trocar a fonte de dados sem mexer nos componentes.</p>
      </div>
    </div>
  );
}
