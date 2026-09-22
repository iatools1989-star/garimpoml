import { NextResponse } from 'next/server';

export async function GET() {
  // Em produção: SELECT COUNT(*), SUM(comissao) FROM clicks/conversions WHERE affiliateId = ?
  // Mock realista
  return NextResponse.json({
    totalClicks: 18492,
    validClicks: 17203,
    conversions: 142,
    conversaoRate: 3.8,
    comissaoPendente: 1840.22,
    comissaoAprovada: 999.90,
    ticketMedio: 187,
    cookieAtivoHoras: 24,
    periodo: 'últimos 30 dias',
    topProducts: [
      { title: 'Air Fryer Mondial 4,2L', clicks: 3420, conv: 42, comissao: 5 },
      { title: 'iPhone 15 128GB', clicks: 2980, conv: 18, comissao: 2.5 },
      { title: 'Kit Skincare 16%', clicks: 2102, conv: 31, comissao: 16 },
    ],
    observacoes: 'Validação ML até último dia do mês seguinte + até 60 dias para crédito Mercado Pago. Mínimo R$30 com 3 buyers.'
  });
}
