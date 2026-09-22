import { NextRequest, NextResponse } from 'next/server';

// Garante execução no Edge para latência mínima na Vercel
export const runtime = 'edge';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const affiliateId = req.nextUrl.searchParams.get('aff') || process.env.NEXT_PUBLIC_AFFILIATE_ID || 'afiliado_demo';
  const cupom = req.nextUrl.searchParams.get('cupom') || req.nextUrl.searchParams.get('matt_word') || 'GARIMPO';
  const via = req.nextUrl.searchParams.get('via') || 'vitrine';

  // Validação MLB
  const mlbId = slug.toUpperCase().startsWith('MLB') ? slug.toUpperCase() : `MLB${slug.toUpperCase()}`;
  if (!/^MLB\d+$/i.test(mlbId)) {
    return NextResponse.json({ error: 'MLB ID inválido. Use /go/MLB12345678' }, { status: 400 });
  }

  // Log para analytics (Vercel Analytics / Log Drains)
  console.log(`[GO] ${new Date().toISOString()} | ${mlbId} | aff=${affiliateId} | via=${via} | ip=${req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'}`);

  // Monta URL final AFILIADA — domínio ML visível (Termo 1.8)
  const target = new URL(`https://www.mercadolivre.com.br/p/${mlbId}`);
  target.searchParams.set('matt_tool', affiliateId);
  target.searchParams.set('matt_word', cupom);
  target.searchParams.set('forceInApp', 'true');
  target.searchParams.set('utm_source', 'garimpoml');
  target.searchParams.set('utm_medium', via);
  target.searchParams.set('utm_campaign', 'vitrine_nextjs');

  // Também registra clique via cookie 24h (server-side)
  const res = NextResponse.redirect(target.toString(), 302);
  res.cookies.set(`aff_${mlbId}`, affiliateId, {
    maxAge: 60 * 60 * 24, // 24h cookie Window (1.6)
    path: '/',
    sameSite: 'lax',
    httpOnly: false, // precisa ser lido no client para analytics
  });
  // Cookie para Live (7 dias se add ao carrinho durante live — 1.6.1)
  res.cookies.set(`aff_live_${mlbId}`, '1', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  // Headers de compliance / cache
  res.headers.set('Cache-Control', 'no-store'); // sempre conta clique
  res.headers.set('X-Affiliate-Redirect', 'garimpoml-vercel');
  res.headers.set('X-Cookie-Window', '24h (+7d Live)');

  return res;
}
