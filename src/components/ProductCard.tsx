'use client';
import { Product } from '@/lib/types';
import { calcDesconto, formatBRL } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product, affiliateId = 'afiliado_demo' }: { product: Product; affiliateId?: string }) {
  const [copied, setCopied] = useState(false);
  const desconto = calcDesconto(product.price, product.oldPrice);
  const affiliateUrl = `/go/${product.mlbId.toLowerCase()}?via=card&aff=${affiliateId}`;
  
  const copy = async () => {
    const full = `https://www.mercadolivre.com.br/p/${product.mlbId}?matt_tool=${affiliateId}&matt_word=GARIMPO10&forceInApp=true`;
    await navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
      <div className="relative aspect-square bg-zinc-100 overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
        <span className="absolute top-2.5 left-2.5 bg-[#00A650] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow">💰 {product.comissao} comissão</span>
        <span className="absolute top-2.5 right-2.5 bg-white border border-zinc-200 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">{product.isLive ? '🔴 LIVE 7d' : product.tag || product.categoria.toUpperCase()}</span>
        {desconto > 0 && <span className="absolute bottom-2.5 left-2.5 bg-[#FFE600] text-[#1A1E4D] text-xs font-black px-2 py-1 rounded-full">-{desconto}% OFF</span>}
        {product.isLive && <span className="absolute bottom-2.5 right-2.5 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse">● AO VIVO</span>}
      </div>

      <div className="p-3.5 flex-1 flex flex-col gap-2">
        <h3 className="text-sm leading-snug font-semibold line-clamp-2 min-h-[40px]"><span className="text-[#00A650]">#publi</span> {product.title}</h3>
        
        <div className="flex items-baseline gap-2 flex-wrap">
          <strong className="text-[18px] tracking-tight">{formatBRL(product.price)}</strong>
          {product.oldPrice && <s className="text-xs text-zinc-500">{formatBRL(product.oldPrice)}</s>}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span className={`w-2 h-2 rounded-full ${product.vendedorReputacao === 'verde' ? 'bg-green-500' : product.vendedorReputacao === 'amarela' ? 'bg-yellow-400' : 'bg-red-500'}`}></span>
          Vendedor {product.vendedorReputacao} • ⭐ {product.avaliacoes?.toLocaleString('pt-BR')} • Novo
        </div>

        <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 w-fit">
          ✓ Comissão {product.comissaoValor}% = {formatBRL(product.price * product.comissaoValor / 100)}
        </div>
      </div>

      <div className="p-3.5 pt-0 flex flex-col gap-2">
        <Link
          href={affiliateUrl}
          target="_blank"
          onClick={() => {
            // tracking local
            try { localStorage.setItem(`click_${product.id}`, new Date().toISOString()); } catch {}
            // beacon
            fetch('/api/click', { method: 'POST', body: JSON.stringify({ productId: product.id, mlbId: product.mlbId, affiliateId }), headers: { 'Content-Type': 'application/json' } }).catch(()=>{});
          }}
          className="bg-[#FFE600] hover:bg-[#E6CF00] text-[#1A1E4D] text-center py-2.5 rounded-full font-extrabold text-sm border border-black/5 transition"
        >
          Ver no Mercado Livre →
        </Link>

        <div className="flex items-center gap-2 text-[11px] font-mono bg-zinc-50 border border-dashed border-zinc-200 rounded-xl px-2.5 py-2">
          <span className="truncate text-zinc-500">mercadolivre.com.br/p/{product.mlbId}</span>
          <button onClick={copy} className="ml-auto shrink-0 bg-white border border-zinc-200 px-3 py-1 rounded-full font-bold hover:bg-zinc-900 hover:text-white transition text-xs">
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>

        <p className="text-[11px] leading-snug text-zinc-500 flex gap-1.5">
          <span className="w-4 h-4 rounded-full bg-[#FFE600] grid place-items-center text-[9px] font-black shrink-0 mt-0.5">ⓘ</span>
          Link afiliado. Clique voluntário → 24h cookie. Live 7 dias se add carrinho ao vivo.
        </p>
      </div>
    </div>
  );
}
