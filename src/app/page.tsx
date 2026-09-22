import Vitrine from '@/components/Vitrine';
import LinkGenerator from '@/components/LinkGenerator';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#FFE600] px-4 sm:px-6 py-8">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-black/10 px-3 py-1.5 rounded-full text-xs font-bold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Programa Oficial Mercado Livre • CONAR compliant • #publi obrigatório
            </div>
            <h1 className="text-[40px] sm:text-[52px] font-black leading-[0.9] tracking-tight text-[#1A1E4D] mt-4">
              Sua vitrine de afiliados que <span className="bg-[#2D3277] text-[#FFE600] px-2 rounded-lg inline-block -rotate-1">converte</span> em 24h.
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-[#1A1E4D]/80 max-w-[560px]">
              Transforme links do <b className="text-[#2D3277]">Mercado Livre</b> em uma vitrine Next.js profissional. Curadoria, SEO e WhatsApp/Telegram prontos. <b>Sem estoque, sem logística — só comissão de 1% a 16%.</b>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/gerador" className="bg-[#2D3277] text-white px-6 py-3.5 rounded-full font-black inline-flex items-center gap-2 hover:bg-[#1A1E4D] transition">⚡ Gerar meu primeiro link</Link>
              <a href="#vitrine" className="bg-white border-2 border-[#2D3277] text-[#2D3277] px-6 py-3.5 rounded-full font-black">Ver vitrine ↓</a>
            </div>
            <p className="text-xs text-black/60 mt-3 flex flex-wrap gap-4"> <span>✓ Aprovação em até 48h</span> <span>✓ Pagamento via Mercado Pago</span> <span>✓ Mínimo R$30 (3 compradores)</span> <span>✓ Deploy na Vercel</span> </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xl border border-zinc-200">
            <div className="flex justify-between items-center">
              <span className="text-[11px] tracking-widest font-black text-zinc-500">DASHBOARD • ÚLTIMOS 30 DIAS</span>
              <span className="flex gap-1.5"><i className="w-2.5 h-2.5 rounded-full bg-red-400 block"></i><i className="w-2.5 h-2.5 rounded-full bg-yellow-400 block"></i><i className="w-2.5 h-2.5 rounded-full bg-green-400 block"></i></span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4"><div className="text-[11px] tracking-widest font-black text-zinc-500">CLIQUES</div><div className="text-2xl font-black">18.492</div><div className="text-xs font-bold text-green-600">↑ 23% vs mês anterior</div></div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4"><div className="text-[11px] tracking-widest font-black text-zinc-500">COMISSÃO EST.</div><div className="text-2xl font-black">R$ 2.840,12</div><div className="text-xs font-bold text-green-600">↑ 18% • Ticket R$187</div></div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4"><div className="text-[11px] tracking-widest font-black text-zinc-500">CONVERSÃO</div><div className="text-2xl font-black">3,8%</div><div className="text-xs font-bold text-green-600">142 vendas válidas</div></div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4"><div className="text-[11px] tracking-widest font-black text-zinc-500">COOKIE ATIVO</div><div className="text-2xl font-black">24H</div><div className="text-xs font-bold text-[#2D3277]">+ 7 dias na Live</div></div>
            </div>
            <div className="h-[88px] mt-4 bg-gradient-to-t from-[#FFE600]/30 to-white border border-[#FFE600]/30 rounded-xl flex items-end gap-1.5 p-2">
              <span className="flex-1 bg-[#2D3277] rounded-t-lg" style={{height:'30%'}}></span>
              <span className="flex-1 bg-[#2D3277] rounded-t-lg" style={{height:'45%'}}></span>
              <span className="flex-1 bg-[#2D3277] rounded-t-lg" style={{height:'65%'}}></span>
              <span className="flex-1 bg-[#2D3277] rounded-t-lg" style={{height:'80%'}}></span>
              <span className="flex-1 bg-[#2D3277] rounded-t-lg" style={{height:'55%'}}></span>
              <span className="flex-1 bg-[#2D3277] rounded-t-lg" style={{height:'90%'}}></span>
              <span className="flex-1 bg-[#2D3277]/60 rounded-t-lg" style={{height:'70%'}}></span>
            </div>
            <div className="flex justify-between items-center mt-3 text-[11px] font-bold text-zinc-500"><span>● Relatório atualizado diariamente no painel ML</span><span className="bg-red-600 text-white px-2.5 py-1 rounded-full">● LIVE AO VIVO</span></div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div className="bg-white border-y border-zinc-200">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap gap-4 justify-between text-xs font-bold text-zinc-600">
          <span>✓ <b className="text-zinc-900">100% Termos ML 30228</b> — sem encurtador</span>
          <span>🛡️ <b className="text-zinc-900">Links Especiais</b> + Redirect /go</span>
          <span>💳 <b className="text-zinc-900">Mercado Pago</b> — 60 dias</span>
          <span>⚡ <b className="text-zinc-900">Next.js 16 + Vercel</b> — Edge + ISR</span>
        </div>
      </div>

      {/* COMO FUNCIONA */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="text-xs font-black tracking-widest text-[#2D3277] flex items-center gap-2"><span className="w-6 h-1 bg-[#FFE600] rounded-full block"></span> COMO FUNCIONA — SEM MISTÉRIO</div>
        <h2 className="text-3xl font-black tracking-tight mt-2">3 passos para monetizar <span className="text-[#2D3277]">sem tocar no produto</span></h2>
        <p className="text-zinc-500 mt-2 max-w-2xl">Modelo de <b>cessão de direito de imagem + parceria tripartite</b>. Você divulga, o vendedor vende, o Mercado Livre paga. Você não tem estoque, frete ou SAC.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { n:'01', icon:'🔗', t:'Gere Links Especiais', d:'Cole qualquer URL de produto NOVO. Nossa API gera Link Especial rastreável (sem shortener proibido) + cupom.', extra:'→ Comissão travada no carrinho na Live' },
            { n:'02', icon:'▦', t:'Publique na Vitrine Next.js', d:'Sua vitrine vira Perfil Social: SEO, ISR, filtros, selo #publi automático e redirect transparente /go/[mlb].', extra:'Mídia paga só em redes sociais (Meta/TikTok)' },
            { n:'03', icon:'💰', t:'Receba por Venda Válida', d:'Compra em até 24h = sua comissão (1% a 16%). Na Live: add carrinho na transmissão = 7 dias.', extra:'Auto-compra ou fraude = cancelada.' },
          ].map(s=>(
            <div key={s.n} className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm relative">
              <span className="absolute top-4 right-4 bg-[#FFE600] w-8 h-8 grid place-items-center rounded-full font-black text-sm">{s.n}</span>
              <div className="w-12 h-12 bg-[#2D3277] text-white grid place-items-center rounded-xl text-xl">{s.icon}</div>
              <h3 className="font-bold mt-4">{s.t}</h3>
              <p className="text-sm text-zinc-500 mt-1">{s.d}</p>
              <p className="text-xs font-bold text-green-600 mt-2">{s.extra}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VITRINE */}
      <section id="vitrine" className="bg-white border-y border-zinc-200 py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-between gap-4 items-end">
            <div>
              <div className="text-xs font-black tracking-widest text-[#2D3277]">VITRINE DEMO — CLIQUE E TESTE O COOKIE DE 24H</div>
              <h2 className="text-[28px] font-black tracking-tight mt-1">Achadinhos que mais convertem hoje</h2>
              <p className="text-sm text-zinc-500">Todos <b>novos</b>, vendedor amarelo+ e link afiliado via <code className="bg-zinc-100 px-1.5 py-0.5 rounded">/go/[MLB]</code> (Edge Redirect).</p>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full">● 142 vendas nas últimas 24h</span>
              <Link href="/admin" className="bg-[#2D3277] text-white px-4 py-2 rounded-full font-bold text-sm">+ Admin</Link>
            </div>
          </div>
          <div className="mt-6">
            <Vitrine />
          </div>
        </div>
      </section>

      {/* GERADOR */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="text-xs font-black tracking-widest text-[#2D3277] flex items-center gap-2"><span className="w-6 h-1 bg-[#FFE600] rounded-full block"></span> GERADOR OFICIAL — SEM ENCURTADOR PROIBIDO</div>
        <h2 className="text-3xl font-black tracking-tight mt-2">Transforme qualquer URL em <span className="text-[#2D3277]">Link Especial</span> rastreável</h2>
        <p className="text-zinc-500 mt-2 max-w-2xl">Cole o link, escolha sua Mídia aprovada e gere. Mantém domínio <b>mercadolivre.com.br</b> visível e cookie voluntário.</p>
        <div className="mt-6">
          <LinkGenerator />
        </div>
      </section>

      {/* MONETIZAÇÃO */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-6">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { tag:'Afiliado Generalista', title:'🎥 Conteúdo em vídeo', desc:'YouTube/TikTok/Reels. Você cria review/unboxing e licencia imagem para o ML usar em campanhas de Marcas.', bullets:['Cessão de imagem (ML paga)','Qualidade + prazos com ML'], note:'Ex: Top 5 Fones até R$300 → comissão por venda' },
            { tag:'Divulgador de Ofertas ⭐ MAIS VOLUME', title:'🏷️ Cupons & Achadinhos', desc:'Grupos WhatsApp/Telegram + blog. Tabela especial se média >R$50k/mês em 90 dias.', bullets:['Tabela especial negociada','Foco giro rápido + curadoria','Automação via API /go'], note:'💡 É O MODELO DESTA PLATAFORMA', highlight:true },
            { tag:'Lives • 7 dias', title:'🔴 Mercado Livre Live', desc:'Transmissão dentro do app ML. Comissão se add carrinho DURANTE live e comprar em 7 dias.', bullets:['Lock-in do % no add to cart','Sem redirecionamento externo','Proibido IA/menor/pré-gravado'], note:'Ex: Live Esquenta Black' },
          ].map(c=>(
            <div key={c.title} className={`bg-white rounded-2xl p-6 border shadow-sm ${c.highlight ? 'border-[#2D3277] border-2' : 'border-zinc-200'}`}>
              <span className={`text-[11px] font-black px-2.5 py-1 rounded-full ${c.highlight ? 'bg-[#2D3277] text-white' : c.tag.includes('Generalista') ? 'bg-[#FFE600]' : 'bg-green-600 text-white'}`}>{c.tag}</span>
              <h3 className="font-bold mt-3">{c.title}</h3>
              <p className="text-sm text-zinc-500 mt-1">{c.desc}</p>
              <ul className="mt-3 space-y-1 text-sm">{c.bullets.map(b=> <li key={b} className="flex gap-2"><span className="text-green-600 font-black">✓</span>{b}</li>)}</ul>
              <div className="mt-4 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-xs">{c.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TABELA */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <h3 className="font-black text-xl">Tabela de comissões (exemplo 2025/26)</h3>
        <p className="text-sm text-zinc-500">Valores líquidos de tarifas. Consulte <a href="https://www.mercadolivre.com.br/ajuda/27913" target="_blank" className="underline font-bold text-[#2D3277]">tabela oficial 27913</a> — ML pode alterar a qualquer tempo.</p>
        <div className="mt-4 bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-[#2D3277] text-white text-xs tracking-widest"><th className="text-left px-4 py-3">Categoria</th><th className="text-left px-4 py-3">Exemplo</th><th className="text-left px-4 py-3">Comissão</th></tr></thead>
              <tbody>
                {[
                  ['📱 Eletrônicos','iPhone, Samsung','1% – 4%'],
                  ['🖥️ Informática','TV 50", Notebook','3% – 5%'],
                  ['👗 Moda','Tênis, Bolsas','6% – 8%'],
                  ['💄 Beleza','Perfume, Skincare','7% – 16%'],
                  ['🏠 Casa','Sofá, Air Fryer','4% – 7%'],
                  ['⚽ Esportes','Bike, Suplemento','4% – 6%'],
                ].map(([a,b,c])=> <tr key={a} className="border-b border-zinc-100 hover:bg-zinc-50"><td className="px-4 py-3 font-semibold">{a}</td><td className="px-4 py-3 text-zinc-500">{b}</td><td className="px-4 py-3 font-black text-green-600">{c}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-zinc-500 mt-2">Ex: Produto R$1.000 em Beleza a 8% = <b>R$80 comissão</b> (menos IR se aplicável). Só conta Transação Válida.</p>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-[#1A1E4D] rounded-3xl p-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center text-white">
          <div>
            <h2 className="text-3xl font-black leading-tight">Pronto para deploy na Vercel em 1 clique?</h2>
            <p className="text-white/60 mt-2">Conecte o GitHub na Vercel, defina <code className="bg-white/10 px-1.5 py-0.5 rounded">NEXT_PUBLIC_AFFILIATE_ID</code> e <code className="bg-white/10 px-1.5 py-0.5 rounded">NEXT_PUBLIC_SITE_URL</code>.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/gerador" className="bg-[#FFE600] text-[#1A1E4D] px-6 py-3 rounded-full font-black">1. Gere seus links →</Link>
              <Link href="/dashboard" className="bg-white text-[#1A1E4D] px-6 py-3 rounded-full font-black">2. Ver Dashboard →</Link>
            </div>
            <p className="text-xs text-white/40 mt-3">Requisitos: 18+, CPF, conta ML + Mercado Pago, perfil público, não ser concorrente/empregado/vendedor ML, 1 conta por CPF/CNPJ.</p>
          </div>
          <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
            <div className="font-black">✅ Checklist Vercel</div>
            <div className="mt-3 space-y-2 text-sm">
              <label className="flex gap-2"><input type="checkbox" defaultChecked /> Build Next.js 16 ok (npm run build)</label>
              <label className="flex gap-2"><input type="checkbox" defaultChecked /> Domínio Mercadolivre visível (/go)</label>
              <label className="flex gap-2"><input type="checkbox" /> Env NEXT_PUBLIC_AFFILIATE_ID configurada</label>
              <label className="flex gap-2"><input type="checkbox" /> Vercel Analytics + Speed Insights</label>
              <label className="flex gap-2"><input type="checkbox" /> Cron para revalidar vitrine (ISR 1h)</label>
            </div>
            <div className="mt-4 bg-[#FFE600] text-[#1A1E4D] px-3 py-2 rounded-xl text-xs font-black text-center">🎁 BÔNUS: Ao aprovar, peça tabela Divulgador de Ofertas &gt;R$50k/mês</div>
          </div>
        </div>
      </section>
    </>
  );
}
