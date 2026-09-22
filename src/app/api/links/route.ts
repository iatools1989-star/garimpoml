import { NextRequest, NextResponse } from 'next/server';
import { generateAffiliateLink } from '@/lib/affiliate';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { originalUrl, affiliateId, midia = 'vitrine', cupom } = body;

    if (!originalUrl || !affiliateId) {
      return NextResponse.json({ error: 'originalUrl e affiliateId são obrigatórios' }, { status: 400 });
    }

    const result = generateAffiliateLink({ originalUrl, affiliateId, midia, cupom });

    // Aqui você salvaria no banco: prisma.link.create({ data: {...} })
    // Mock: retorna direto
    return NextResponse.json({
      success: true,
      ...result,
      affiliateUrl: result.affiliateUrl,
      shortGoUrl: `/go/${result.mlbId.toLowerCase()}?aff=${affiliateId}${cupom ? `&cupom=${cupom}` : ''}`,
      compliance: {
        cookieHours: 24,
        liveCookieDays: 7,
        disclaimer: '#publi #afiliado obrigatório (CONAR 5.1)',
        domainVisible: 'mercadolivre.com.br',
      }
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erro ao gerar link' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    usage: 'POST /api/links { originalUrl, affiliateId, midia, cupom }',
    example: {
      originalUrl: 'https://www.mercadolivre.com.br/p/MLB12345678',
      affiliateId: 'afiliado_789012',
      midia: 'whatsapp',
      cupom: 'GARIMPO10'
    },
    rules: 'Domínio ML visível, sem shortener, clique voluntário, #publi obrigatório'
  });
}
