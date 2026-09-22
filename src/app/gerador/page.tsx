import LinkGenerator from '@/components/LinkGenerator';

export const metadata = { title: 'Gerador de Links Especiais — GarimpoML' };

export default function GeradorPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight">Gerador de Links Especiais</h1>
        <p className="text-zinc-500 mt-1">Gere links rastreáveis em conformidade com os Termos 30228. Endpoint: <code className="bg-zinc-100 px-1.5 py-0.5 rounded">POST /api/links</code></p>
      </div>
      <LinkGenerator />
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-zinc-200">
          <h3 className="font-bold">Como funciona o redirect /go</h3>
          <p className="text-sm text-zinc-500 mt-1">Todo botão da vitrine aponta para <code className="bg-zinc-100 px-1.5 py-0.5 rounded">/go/[MLB]?aff=SEU_ID</code>. Essa rota:</p>
          <ol className="text-sm mt-3 space-y-1 list-decimal pl-5">
            <li>Valida MLB e afiliado</li>
            <li>Registra click via <code>/api/click</code> (log + cookie 24h)</li>
            <li>Faz <b>302 redirect</b> para <code>mercadolivre.com.br/p/MLB...?matt_tool=...&forceInApp=true</code></li>
            <li>Sem encurtador externo — domínio ML sempre visível no destino final</li>
          </ol>
          <p className="text-xs text-zinc-500 mt-3">Vercel Edge: adicione <code>export const runtime = &apos;edge&apos;</code> se quiser latência mínima.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-zinc-200">
          <h3 className="font-bold">cURL para automação</h3>
          <pre className="mt-3 bg-zinc-900 text-zinc-100 p-4 rounded-xl text-xs overflow-auto">
{`curl -X POST https://seu-dominio.vercel.app/api/links \\
  -H "Content-Type: application/json" \\
  -d '{
    "originalUrl": "https://www.mercadolivre.com.br/p/MLB12345678",
    "affiliateId": "afiliado_789012",
    "midia": "whatsapp",
    "cupom": "GARIMPO10"
  }'`}
          </pre>
          <p className="text-xs text-zinc-500 mt-2">Use para bots de Telegram/WhatsApp que postam ofertas automaticamente.</p>
        </div>
      </div>
    </div>
  );
}
