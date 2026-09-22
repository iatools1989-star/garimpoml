import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/products';

export const revalidate = 3600; // ISR 1h

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get('categoria');
  const q = searchParams.get('q');

  let list = [...PRODUCTS];
  if (categoria && categoria !== 'todos') {
    if (categoria === 'live') list = list.filter(p => p.isLive);
    else list = list.filter(p => p.categoria === categoria);
  }
  if (q) list = list.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));

  return NextResponse.json({
    total: list.length,
    revalidate: 3600,
    source: 'mock: src/lib/products.ts → troque por prisma.product.findMany() em prod',
    products: list
  });
}
