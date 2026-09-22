'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (p: string) => pathname === p ? 'bg-[#2D3277] text-white' : 'text-[#1A1E4D] hover:bg-black/5';

  return (
    <header className="sticky top-0 z-50 bg-[#FFE600] border-b border-black/[0.06] backdrop-blur">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2D3277] text-[#FFE600] grid place-items-center rounded-xl font-black text-xl">◆</div>
          <span className="font-black text-[22px] tracking-tight text-[#1A1E4D]">Garimpo<span className="font-light">ML</span><span className="ml-2 bg-[#2D3277] text-white text-[10px] px-2 py-0.5 rounded-full tracking-widest">AFILIADOS</span></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
          <Link href="/" className={`px-3 py-2 rounded-full transition ${isActive('/')}`}>Vitrine</Link>
          <Link href="/gerador" className={`px-3 py-2 rounded-full transition ${isActive('/gerador')}`}>Gerador</Link>
          <Link href="/dashboard" className={`px-3 py-2 rounded-full transition ${isActive('/dashboard')}`}>Dashboard</Link>
          <Link href="/admin" className={`px-3 py-2 rounded-full transition ${isActive('/admin')}`}>Admin</Link>
          <Link href="/gerador" className="ml-2 bg-[#2D3277] text-white px-5 py-2.5 rounded-full font-bold hover:bg-[#1A1E4D] transition">+ Criar vitrine →</Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-xl bg-white border border-black/10">
          <span className="text-xl">{open ? '✕' : '☰'}</span>
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-black/10 px-4 py-4 flex flex-col gap-2">
          <Link href="/" onClick={() => setOpen(false)} className="py-2 font-semibold">Vitrine</Link>
          <Link href="/gerador" onClick={() => setOpen(false)} className="py-2 font-semibold">Gerador de Links</Link>
          <Link href="/dashboard" onClick={() => setOpen(false)} className="py-2 font-semibold">Dashboard</Link>
          <Link href="/admin" onClick={() => setOpen(false)} className="py-2 font-semibold">Admin / Produtos</Link>
          <Link href="/gerador" onClick={() => setOpen(false)} className="mt-2 bg-[#FFE600] text-center py-3 rounded-full font-black">Começar agora</Link>
          <p className="text-xs text-zinc-500 mt-2">Cookie 24h • Live 7 dias • Mercado Pago</p>
        </div>
      )}
    </header>
  );
}
