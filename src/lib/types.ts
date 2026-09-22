export type Categoria = 'tech' | 'casa' | 'beleza' | 'moda' | 'esportes' | 'livros';
export type MidiaAprovada = 'instagram' | 'tiktok' | 'youtube' | 'blog' | 'whatsapp' | 'telegram';

export interface Product {
  id: string;
  mlbId: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  categoria: Categoria;
  comissao: string; // ex: "7%"
  comissaoValor: number; // percentual numérico para cálculo
  vendedorReputacao: 'amarela' | 'verde' | 'vermelha';
  destaque?: boolean;
  isLive?: boolean;
  estoque?: number;
  avaliacoes?: number;
  tag?: string;
}

export interface AffiliateLink {
  id: string;
  originalUrl: string;
  mlbId: string;
  shortSlug: string;
  affiliateId: string;
  midia: MidiaAprovada;
  cupom?: string;
  createdAt: string;
  clicks: number;
  conversions: number;
  comissaoEstimada: number;
  productId?: string;
}

export interface ClickEvent {
  id: string;
  linkId: string;
  productId: string;
  timestamp: string;
  userAgent?: string;
  ipHash?: string;
  isValid: boolean;
  reason?: string;
}

export interface Stats {
  totalClicks: number;
  validClicks: number;
  conversions: number;
  conversaoRate: number;
  comissaoPendente: number;
  comissaoAprovada: number;
  ticketMedio: number;
  cookieAtivoHoras: number;
}
