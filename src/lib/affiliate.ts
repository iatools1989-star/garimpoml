import { extractMLB, isValidMLUrl } from './utils';

export const COMISSOES: Record<string, { min: number; max: number; label: string }> = {
  tech: { min: 1, max: 4, label: 'Eletrônicos 1–4%' },
  casa: { min: 4, max: 7, label: 'Casa 4–7%' },
  beleza: { min: 7, max: 16, label: 'Beleza 7–16%' },
  moda: { min: 6, max: 8, label: 'Moda 6–8%' },
  esportes: { min: 4, max: 6, label: 'Esportes 4–6%' },
  livros: { min: 5, max: 7, label: 'Livros 5–7%' },
};

export interface GenerateLinkParams {
  originalUrl: string;
  affiliateId: string;
  midia: string;
  cupom?: string;
  campaign?: string;
}

/**
 * Gera Link Especial conforme Termos 1.6 / 1.8
 * - Mantém domínio mercadolivre.com.br visível
 * - Não usa shortener externo (proibido)
 * - Inclui matt_tool (afiliado) + matt_word (campanha/cupom)
 * - forceInApp=true para rastreio em app
 */
export function generateAffiliateLink(params: GenerateLinkParams) {
  const { originalUrl, affiliateId, cupom, campaign } = params;
  if (!isValidMLUrl(originalUrl)) throw new Error('URL inválida: deve ser de mercadolivre.com.br com MLB ID');
  if (!affiliateId || affiliateId.length < 5) throw new Error('ID de afiliado inválido');

  const mlbId = extractMLB(originalUrl)!;
  const url = new URL(originalUrl);

  // Limpa params proibidos / mantém VIP
  const base = `https://www.mercadolivre.com.br/p/${mlbId}`;
  const final = new URL(base);
  final.searchParams.set('matt_tool', affiliateId);
  if (cupom || campaign) final.searchParams.set('matt_word', (cupom || campaign)!);
  final.searchParams.set('forceInApp', 'true');
  // utm para analytics interno (permitido, não é search ad)
  final.searchParams.set('utm_source', 'garimpoml');
  final.searchParams.set('utm_medium', params.midia || 'vitrine');

  return {
    affiliateUrl: final.toString(),
    mlbId,
    slug: `${mlbId.toLowerCase()}-${(cupom || 'oferta').toLowerCase()}`,
    cookieHours: 24,
    liveCookieDays: 7,
  };
}

export function validateTransaction(clickAt: Date, purchaseAt: Date, isLive: boolean, addedToCartDuringLive: boolean) {
  const diffMs = purchaseAt.getTime() - clickAt.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  if (isLive && addedToCartDuringLive) return diffHours <= 24 * 7; // 7 dias
  return diffHours <= 24;
}

export const MIDIA_OPTIONS = [
  { value: 'instagram', label: 'Instagram', icon: '📸', allowedPaid: true },
  { value: 'tiktok', label: 'TikTok', icon: '🎵', allowedPaid: true },
  { value: 'youtube', label: 'YouTube', icon: '▶️', allowedPaid: false }, // YouTube Ads proibido, orgânico ok
  { value: 'blog', label: 'Blog / SEO', icon: '📝', allowedPaid: false },
  { value: 'whatsapp', label: 'WhatsApp', icon: '💬', allowedPaid: true },
  { value: 'telegram', label: 'Telegram', icon: '✈️', allowedPaid: true },
] as const;

export const REGRAS_BLOQUEIO = [
  'Auto-compra (mesmo IP/conta)',
  'Link sem clique voluntário (pop-up, iframe, cookie forçado)',
  'Shortener externo (bit.ly etc)',
  'Google/Bing Shopping & Search Ads',
  'Lance em marca “Mercado Livre/Meli”',
  'Conteúdo proibido (usados, remédios, etc)',
  'Sorteio condicionado à compra',
  'Cancelamento/devolução/fraude',
];
