import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GarimpoML — Vitrine de Afiliados Mercado Livre | 24h Cookie + Lives 7 dias",
  description: "Plataforma Next.js para monetizar com o Programa de Afiliados e Criadores do Mercado Livre. Links Especiais rastreáveis, dashboard, gerador, compliance CONAR. Deploy na Vercel.",
  keywords: ["mercado livre afiliados", "programa afiliados meli", "vitrine afiliados", "next.js", "vercel"],
  openGraph: {
    title: "GarimpoML — Sua vitrine que converte em 24h",
    description: "Transforme links do Mercado Livre em comissões de 1% a 16%. Cookie 24h + Live 7 dias. 100% dentro dos Termos 30228.",
    type: "website",
  },
  metadataBase: new URL("https://garimpoml.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-[#1A1E4D] text-white mt-12">
          <div className="max-w-[1280px] mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="font-black text-lg">GarimpoML</div>
              <p className="text-white/60 mt-2 leading-relaxed">Vitrine independente de afiliado. Não somos representantes oficiais do Mercado Livre. Mercado Livre, Mercado Pago, Meli são marcas do Mercado Livre.</p>
              <p className="text-xs text-white/40 mt-3">Termos: <a href="https://www.mercadolivre.com.br/ajuda/30228" target="_blank" className="underline">30228</a> • Comissões: <a href="https://www.mercadolivre.com.br/ajuda/27913" target="_blank" className="underline">27913</a> • CONAR #publi obrigatório.</p>
            </div>
            <div>
              <div className="font-bold">Stack Vercel-Ready</div>
              <ul className="text-white/60 mt-2 space-y-1">
                <li>• Next.js 16 App Router + Tailwind 4</li>
                <li>• API Routes + Edge Redirects (/go/[mlb])</li>
                <li>• Pronto para Vercel Postgres / KV / Analytics</li>
                <li>• ISR + Image Optimization + OG</li>
              </ul>
            </div>
            <div>
              <div className="font-bold">Deploy em 1 clique</div>
              <p className="text-white/60 mt-2">Conecte este repo na Vercel → <code className="bg-white/10 px-1.5 py-0.5 rounded">vercel --prod</code> → configure <code className="bg-white/10 px-1.5 py-0.5 rounded">NEXT_PUBLIC_AFFILIATE_ID</code></p>
              <a href="https://vercel.com/new" target="_blank" className="inline-block mt-3 bg-[#FFE600] text-[#1A1E4D] px-4 py-2 rounded-full font-black text-sm">Deploy na Vercel →</a>
            </div>
          </div>
          <div className="border-t border-white/10 text-center text-xs text-white/40 py-4">© 2026 GarimpoML • Feito para afiliados brasileiros • Guanambi, BA</div>
        </footer>
      </body>
    </html>
  );
}
