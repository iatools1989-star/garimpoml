import { NextRequest, NextResponse } from 'next/server';

// Em produção: salvar no Vercel Postgres / KV / Analytics
// Aqui: apenas log + cookie 24h simulation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, mlbId, affiliateId } = body;
    
    // Validações de fraude básicas (Termo 3.1.2)
    // - Auto-compra: comparar IP/affiliateId (aqui mock)
    // - Bot detection: user-agent
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const isBot = /bot|crawl|spider/i.test(userAgent);

    if (isBot) {
      return NextResponse.json({ success: false, reason: 'Bot detectado — não conta como Transação Válida' }, { status: 202 });
    }

    // Simula persistência
    console.log(`[CLICK] ${new Date().toISOString()} | MLB=${mlbId} | product=${productId} | aff=${affiliateId} | ua=${userAgent.slice(0,60)}`);

    const res = NextResponse.json({
      success: true,
      valid: true,
      cookieHours: 24,
      liveDays: 7,
      message: 'Clique registrado. Cookie 24h ativo. Se comprar, comissão será sua.'
    });

    // Cookie httpOnly para tracking server-side (opcional)
    res.cookies.set(`aff_click_${mlbId}`, affiliateId || 'demo', {
      maxAge: 60 * 60 * 24, // 24h
      path: '/',
      sameSite: 'lax',
    });

    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ info: 'POST /api/click { productId, mlbId, affiliateId } — registra clique voluntário (1.10)' });
}
