import { HelpCircle, Truck, ShieldCheck, RefreshCcw, Lock, CreditCard } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      q: "Qual é o prazo de entrega da minha encomenda?",
      a: "O prazo médio de entrega para qualquer região do Brasil é de 4 a 9 dias úteis após a confirmação do pagamento. Todos os pedidos são despachados com seguro e código de rastreamento dos Correios.",
    },
    {
      q: "Como faço para rastrear o meu pedido?",
      a: "Assim que seu pedido for despachado (em até 48h), você receberá o código no seu WhatsApp e e-mail. Basta acessar nossa página de rastreio (loja-dropshipping-seven.vercel.app/rastreio) e digitar o código para acompanhar cada etapa.",
    },
    {
      q: "O pagamento com PIX no site é realmente seguro?",
      a: "Sim, 100% seguro! Nosso checkout é criptografado com tecnologia SSL de 256 bits e processado diretamente pela infraestrutura oficial do Mercado Pago. O QR Code é emitido no sistema do Banco Central.",
    },
    {
      q: "E se o produto vier com defeito ou eu não gostar?",
      a: "Você tem 7 dias de garantia incondicional após receber o produto na sua casa. Se não gostar por qualquer motivo, ou se houver defeito de fabricação, devolvemos 100% do seu dinheiro ou enviamos um novo produto sem custo.",
    },
    {
      q: "Como funciona a garantia de 90 dias?",
      a: "Todos os nossos produtos contam com garantia legal total de 90 dias contra qualquer falha técnica ou defeito operacional direto da fábrica.",
    },
    {
      q: "Como entro em contato com o suporte da loja?",
      a: "Nosso suporte humano atende de segunda a sábado das 08h às 20h pelo botão de WhatsApp fixado no canto do site ou pelo e-mail oficial de atendimento.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          Central de Ajuda & Transparência
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Perguntas Frequentes (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Tire todas as suas dúvidas sobre prazos, segurança, formas de pagamento e garantias.
        </p>
      </div>

      <div className="divide-y divide-gray-100 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="pt-4 first:pt-0 space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-start gap-2">
              <span className="text-emerald-600 font-black">Q.</span>
              {faq.q}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-5">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-base font-bold text-emerald-950">Ainda tem alguma dúvida?</h4>
          <p className="text-xs text-emerald-800">
            Fale agora mesmo com nossa equipe de atendimento no WhatsApp.
          </p>
        </div>
        <Link
          href="/#ofertas"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md transition"
        >
          Ver Produtos em Oferta
        </Link>
      </div>
    </div>
  );
}
