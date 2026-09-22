'use client';
import { useEffect, useState } from 'react';
import { formatBRL } from '@/lib/utils';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Mock: busca /api/stats (fallback para mock local)
    fetch('/api/stats').then(r=>r.json()).then(setStats).catch(()=>{
      setStats({
        totalClicks: 18492,
        validClicks: 17203,
        conversions: 142,
        conversaoRate: 3.8,
        comissaoPendente: 1840.22,
        comissaoAprovada: 999.90,
        ticketMedio: 187,
        topProducts: [
          { title: 'Air Fryer Mondial 4,2L', clicks: 3420, conv: 42 },
          { title: 'iPhone 15 128GB', clicks: 2980, conv: 18 },
          { title: 'Kit Skincare', clicks: 2102, conv: 31 },
        ]
      });
    });
  }, []);

  if (!stats) return <div className="max-w-[1280px] mx-auto px-6 py-12">Carregando dashboard...</div>;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap justify-between gap-4 items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Dashboard do Afiliado</h1>
          <p className="text-zinc-500 mt-1">Métricas de cliques, conversões e comissões. Dados do Mercado Livre são validados até o último dia do mês seguinte.</p>
        </div>
        <span className="text-xs font-bold bg-white border border-zinc-200 px-3 py-1.5 rounded-full">● Atualizado diariamente via ML • Fonte: /api/stats</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-2xl p-5 border border-zinc-200"><div className="text-xs font-black tracking-widest text-zinc-500">CLIQUES TOTAIS</div><div className="text-3xl font-black mt-1">{stats.totalClicks.toLocaleString('pt-BR')}</div><div className="text-xs font-bold text-green-600">✓ {stats.validClicks.toLocaleString('pt-BR')} válidos</div></div>
        <div className="bg-white rounded-2xl p-5 border border-zinc-200"><div className="text-xs font-black tracking-widest text-zinc-500">CONVERSÕES</div><div className="text-3xl font-black mt-1">{stats.conversions}</div><div className="text-xs font-bold text-green-600">{stats.conversaoRate}% taxa • Ticket {formatBRL(stats.ticketMedio)}</div></div>
        <div className="bg-white rounded-2xl p-5 border-2 border-[#FFE600]"><div className="text-xs font-black tracking-widest text-zinc-500">COMISSÃO PENDENTE</div><div className="text-3xl font-black mt-1">{formatBRL(stats.comissaoPendente)}</div><div className="text-xs text-zinc-500">Aprovação em até 60 dias</div></div>
        <div className="bg-white rounded-2xl p-5 border border-zinc-200"><div className="text-xs font-black tracking-widest text-zinc-500">APROVADA (SAQUE)</div><div className="text-3xl font-black mt-1 text-green-600">{formatBRL(stats.comissaoAprovada)}</div><div className="text-xs font-bold">{stats.comissaoAprovada >= 30 ? '✓ Disponível (≥R$30 e 3 buyers)' : 'Aguardando mínimo R$30'}</div></div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-4 mt-6">
        <div className="bg-white rounded-2xl p-6 border border-zinc-200">
          <h3 className="font-bold">Top produtos por clique</h3>
          <div className="mt-4 space-y-3">
            {stats.topProducts.map((p:any, i:number)=>(
              <div key={i} className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl p-3">
                <span className="w-8 h-8 rounded-full bg-[#2D3277] text-white grid place-items-center font-black text-sm">{i+1}</span>
                <div className="flex-1"><div className="font-semibold text-sm">{p.title}</div><div className="text-xs text-zinc-500">{p.clicks.toLocaleString()} cliques • {p.conv} vendas • {(p.conv/p.clicks*100).toFixed(1)}% conv</div></div>
                <span className="text-xs font-black bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">+ {formatBRL(p.conv*47)}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-4">💡 Produtos de Beleza/Casa convertem 2× mais que Tech (comissão maior compensa ticket menor).</p>
        </div>

        <div className="bg-[#1A1E4D] text-white rounded-2xl p-6">
          <h3 className="font-black">Como sacar</h3>
          <ol className="text-sm text-white/70 mt-3 space-y-2 list-decimal pl-5">
            <li>ML valida vendas até <b className="text-white">último dia do mês seguinte</b></li>
            <li>Crédito no <b className="text-white">Mercado Pago em até 60 dias</b></li>
            <li>Mínimo <b className="text-white">R$30 com 3 compradores distintos</b></li>
            <li>Se conta MP bloqueada: informe conta alternativa e regularize em 30 dias</li>
          </ol>
          <div className="mt-4 bg-white/10 border border-white/15 rounded-xl p-3 text-xs">
            <div className="font-bold">⚠️ Não sacável:</div>
            <div className="text-white/60">canceladas, devolvidas, reembolsadas, fraude, auto-compra, link sem clique voluntário.</div>
          </div>
          <a href="https://www.mercadolivre.com.br/ajuda/30228" target="_blank" className="mt-4 inline-block bg-[#FFE600] text-[#1A1E4D] px-4 py-2 rounded-full font-black text-sm w-full text-center">Ver Termos 30228 →</a>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl p-6 border border-zinc-200">
        <h3 className="font-bold">Gráfico de cliques (últimos 7 dias) — mock</h3>
        <div className="mt-4 h-40 flex items-end gap-2">
          {[30,45,65,80,55,90,70].map((h,i)=> <div key={i} className="flex-1 bg-[#2D3277] rounded-t-xl relative group" style={{height:`${h}%`}}><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold bg-white border px-2 py-1 rounded-full opacity-0 group-hover:opacity-100">{h*40} cliques</span></div>)}
        </div>
        <div className="flex justify-between text-xs text-zinc-500 mt-2"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span></div>
      </div>
    </div>
  );
}
