'use client';
import { useState } from 'react';
import { MIDIA_OPTIONS } from '@/lib/affiliate';

export default function LinkGenerator() {
  const [url, setUrl] = useState('https://www.mercadolivre.com.br/apple-iphone-15-128gb-preto/p/MLB12345678');
  const [affiliateId, setAffiliateId] = useState('afiliado_789012');
  const [midia, setMidia] = useState('instagram');
  const [cupom, setCupom] = useState('GARIMPO10');
  const [result, setResult] = useState<string>('https://www.mercadolivre.com.br/sec/aff-MLB12345678?matt_tool=789012&matt_word=GARIMPO10&forceInApp=true');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function gerar() {
    setError(null); setLoading(true);
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url, affiliateId, midia, cupom })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao gerar');
      setResult(data.affiliateUrl);
    } catch (e: any) {
      setError(e.message);
    } finally { setLoading(false); }
  }

  async function copiar() {
    await navigator.clipboard.writeText(result);
    setCopied(true); setTimeout(()=>setCopied(false), 1800);
  }

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden grid lg:grid-cols-[1.15fr_0.85fr]">
      <div className="p-6 sm:p-8">
        <h3 className="font-black text-xl tracking-tight">Gere seu Link Especial</h3>
        <p className="text-sm text-zinc-500 mt-1">Sem encurtador proibido. Domínio <b>mercadolivre.com.br</b> sempre visível (Termo 1.8).</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase">1. URL do anúncio (VIP/PDP)</label>
            <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.mercadolivre.com.br/..." className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#FFE600] focus:border-[#FFE600] text-sm" />
            <p className="text-[11px] text-zinc-500 mt-1">⚠️ Só produtos <b>novos, ativos</b>, vendedor amarelo+. Sem usados/serviços/imóveis.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase">2. Mídia Aprovada *</label>
              <select value={midia} onChange={e=>setMidia(e.target.value)} className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-zinc-200 bg-white text-sm">
                {MIDIA_OPTIONS.map(o=> <option key={o.value} value={o.value}>{o.icon} {o.label} {o.allowedPaid ? '• pode Ads' : '• orgânico'}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase">3. Cupom / Campanha</label>
              <input value={cupom} onChange={e=>setCupom(e.target.value)} placeholder="GARIMPO10" className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-zinc-200 text-sm" />
            </div>
          </div>

          <div>
            <label className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase">4. Seu ID de Afiliado</label>
            <input value={affiliateId} onChange={e=>setAffiliateId(e.target.value)} placeholder="afiliado_123456" className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-zinc-200 text-sm font-mono" />
            <p className="text-[11px] text-zinc-500 mt-1">Após aprovação em <a href="https://www.mercadolivre.com.br/afiliados" target="_blank" className="underline font-bold text-[#2D3277]">mercadolivre.com.br/afiliados</a> + Mercado Pago ativo em 30 dias.</p>
          </div>

          <button onClick={gerar} disabled={loading} className="w-full bg-[#2D3277] hover:bg-[#1A1E4D] text-white py-4 rounded-full font-black text-[15px] transition disabled:opacity-60">
            {loading ? 'Gerando...' : '✨ Gerar Link Especial + Cupom'}
          </button>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-xl">{error}</div>}

          <div>
            <label className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase">Link gerado (cookie 24h)</label>
            <div className="mt-2 font-mono text-xs bg-[#FFE600] border-2 border-dashed border-black/10 p-3 rounded-xl break-all text-[#1A1E4D] font-bold">{result}</div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button onClick={copiar} className="bg-[#2D3277] text-white py-2.5 rounded-full font-bold text-sm">{copied ? '✓ Copiado!' : '📋 Copiar link'}</button>
              <a href={result} target="_blank" className="bg-white border border-[#2D3277] text-[#2D3277] py-2.5 rounded-full font-bold text-sm text-center">👁️ Testar</a>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">✅ Não é shortener. Botão deixa claro destino <b>mercadolivre.com.br</b>. Clique voluntário (sem pop-up/iframe).</p>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1E4D] text-white p-6 sm:p-8 flex flex-col gap-4">
        <h4 className="font-black text-lg">Regras que te mantêm no programa</h4>
        <p className="text-sm text-white/60 -mt-2">Violar = suspensão sem aviso + perda de comissões (2.3.1)</p>
        <ul className="space-y-2.5 text-sm leading-snug">
          <li className="flex gap-2.5"><span className="w-6 h-6 rounded-full bg-[#00A650] grid place-items-center text-xs shrink-0">✓</span><span><b>NUNCA compre com seu link</b> (mesmo IP/conta)</span></li>
          <li className="flex gap-2.5"><span className="w-6 h-6 rounded-full bg-[#00A650] grid place-items-center text-xs shrink-0">✓</span><span>Link <b>sem edição</b> e sem bit.ly — domínio ML visível</span></li>
          <li className="flex gap-2.5"><span className="w-6 h-6 rounded-full bg-[#00A650] grid place-items-center text-xs shrink-0">✓</span><span>Inclua <b>#publi #afiliado</b> em TODO post (CONAR 5.1)</span></li>
          <li className="flex gap-2.5"><span className="w-6 h-6 rounded-full bg-red-500 grid place-items-center text-xs shrink-0">✕</span><span><b>PROIBIDO Google/Bing Search/Shopping & YouTube Ads</b></span></li>
          <li className="flex gap-2.5"><span className="w-6 h-6 rounded-full bg-red-500 grid place-items-center text-xs shrink-0">✕</span><span><b>PROIBIDO dar lance em “Mercado Livre/Meli”</b></span></li>
          <li className="flex gap-2.5"><span className="w-6 h-6 rounded-full bg-red-500 grid place-items-center text-xs shrink-0">✕</span><span>Cookies forçados, pop-under, robô, scraping</span></li>
          <li className="flex gap-2.5"><span className="w-6 h-6 rounded-full bg-[#00A650] grid place-items-center text-xs shrink-0">✓</span><span><b>LIVE:</b> sem menor, sem IA fake, sem pré-gravado, sem redirecionar fora</span></li>
        </ul>

        <div className="mt-2 bg-white/10 border border-white/15 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <div className="text-[11px] tracking-widest font-black opacity-70">COOKIE ATIVO</div>
            <div className="text-2xl font-black">24H</div>
            <div className="text-xs opacity-70">compra = sua comissão</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] opacity-70">LIVE</div>
            <div className="text-2xl font-black text-[#FFE600]">7 dias</div>
            <div className="text-xs opacity-70">add carrinho ao vivo</div>
          </div>
        </div>
        <p className="text-[11px] opacity-50 leading-relaxed">Pagamento: validação até último dia do mês seguinte + até 60 dias para crédito Mercado Pago. Mínimo R$30 com 3 compradores distintos.</p>
      </div>
    </div>
  );
}
