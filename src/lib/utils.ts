export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function calcComissao(price: number, percent: number) {
  return price * (percent / 100);
}

export function calcDesconto(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

export function extractMLB(url: string): string | null {
  const m = url.match(/MLB\d+/i);
  return m ? m[0].toUpperCase() : null;
}

export function isValidMLUrl(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.includes('mercadolivre.com.br') && extractMLB(url) !== null;
  } catch { return false; }
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40);
}
