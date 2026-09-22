'use client';
import { useMemo, useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import ProductCard from './ProductCard';

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'tech', label: 'Tech 2-4%' },
  { id: 'casa', label: 'Casa 4-7%' },
  { id: 'beleza', label: 'Beleza 7-16%' },
  { id: 'moda', label: 'Moda 6-8%' },
  { id: 'live', label: '🔴 Live 7 dias' },
];

export default function Vitrine() {
  const [active, setActive] = useState('todos');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'relevancia' | 'menor' | 'maior' | 'comissao'>('relevancia');

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (active !== 'todos') {
      if (active === 'live') list = list.filter(p => p.isLive);
      else list = list.filter(p => p.categoria === active);
    }
    if (q) list = list.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
    if (sort === 'menor') list.sort((a,b)=>a.price-b.price);
    if (sort === 'maior') list.sort((a,b)=>b.price-a.price);
    if (sort === 'comissao') list.sort((a,b)=>b.comissaoValor-a.comissaoValor);
    return list;
  }, [active, q, sort]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f=> (
            <button key={f.id} onClick={()=>setActive(f.id)} className={`px-4 py-2 rounded-full text-sm font-bold border transition ${active===f.id ? 'bg-[#2D3277] text-white border-[#2D3277]' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}>{f.label}</button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar produto..." className="px-4 py-2 rounded-full border border-zinc-200 bg-white text-sm w-[220px] focus:outline-none focus:ring-2 focus:ring-[#FFE600]" />
          <select value={sort} onChange={e=>setSort(e.target.value as any)} className="px-3 py-2 rounded-full border border-zinc-200 bg-white text-sm font-semibold">
            <option value="relevancia">Relevância</option>
            <option value="comissao">Maior comissão</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {filtered.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-zinc-300 mt-6">
          <p className="font-bold">Nenhum produto encontrado</p>
          <p className="text-sm text-zinc-500">Tente outro filtro ou busca.</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500 items-center">
        <span className="flex gap-1.5 items-center"><span className="w-3.5 h-3.5 rounded-full bg-[#FFE600] grid place-items-center text-[9px] font-black">!</span> Legenda CONAR: conteúdo com #publi #afiliado. Preço/estoque no momento do clique em mercadolivre.com.br</span>
        <span className="ml-auto font-bold">Mostrando {filtered.length} de {PRODUCTS.length} • Todos novos • Reputação amarela+</span>
      </div>
    </div>
  );
}
