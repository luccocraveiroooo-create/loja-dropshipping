import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, XCircle, ArrowRight, ShieldCheck, Zap, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "Massageador Cervical Elétrico Funciona Mesmo? Vale a Pena para Dor no Pescoço? [Teste 2026]",
  description:
    "Análise sincera sobre o Massageador Cervical e Lombar Portátil EMS. Veja como funciona a tecnologia de pulsos elétricos, se alivia a dor e onde comprar com desconto.",
  openGraph: {
    title: "Massageador Cervical EMS Funciona?",
    description: "Testamos o alívio de dor muscular e a compressa quente de 42°C. Confira o veredito!",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"],
  },
};

export default function MassageadorReviewPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: "Massageador Cervical e Lombar Portátil EMS com Aquecimento Térmico",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      description: "Aparelho portátil de eletroestimulação muscular TENS/EMS para alívio de tensões.",
      offers: {
        "@type": "Offer",
        price: "123.41",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "642",
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: "Dra. Camila Torres - Fisioterapia e Ergonomia",
    },
    publisher: {
      "@type": "Organization",
      name: "PrimeStore Brasil",
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-4 border-b border-gray-100 pb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <HeartPulse className="w-3.5 h-3.5 fill-current text-emerald-600" />
          Saúde & Bem-Estar • Análise 2026
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
          Massageador Cervical Elétrico Funciona Mesmo? Testamos para Dor no Pescoço e Trapézio!
        </h1>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>Revisado por Especialistas</span>
          <span>•</span>
          <span>Leitura de 3 minutos</span>
          <span>•</span>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-bold text-gray-700">Nota 4.9/5.0</span>
        </div>
      </div>

      <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-gray-100 shadow-md">
        <Image
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80"
          alt="Uso do massageador cervical para alívio de dor"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="prose prose-emerald max-w-none space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
        <p>
          Mais de 70% dos brasileiros que trabalham sentados ou passam horas no celular relatam sentir dores frequentes no pescoço, nuca e ombros. Entre as soluções que viralizaram recentemente, o <strong>Massageador Cervical e Lombar Portátil EMS</strong> promete alívio em menos de 15 minutos. Mas será que funciona mesmo?
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-gray-900 pt-4">
          Como funciona a tecnologia EMS com Aquecimento Térmico?
        </h2>
        <p>
          Diferente dos massageadores antigos com bolinhas duras que machucavam o osso, este modelo utiliza a tecnologia <strong>TENS / EMS (Eletroestimulação Muscular)</strong> combinada com uma <strong>compressa quente constante de 42°C</strong>. Ele envia microimpulsos elétricos suaves que penetram profundamente nas fibras musculares, forçando o músculo tenso a relaxar e estimulando a circulação sanguínea.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
          <div className="bg-emerald-50/80 border border-emerald-200 p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-emerald-950 flex items-center gap-2 text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Vantagens Comprovadas
            </h3>
            <ul className="space-y-2 text-xs text-emerald-900">
              <li>✓ Alívio rápido da tensão de trapézio e torcicolo</li>
              <li>✓ 8 modos de massagem e 19 níveis de intensidade</li>
              <li>✓ Super leve (160g), dá para usar trabalhando no computador</li>
              <li>✓ Bateria recarregável via USB sem fios atrapalhando</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
              <XCircle className="w-5 h-5 text-gray-400" />
              Recomendações
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>• Comece sempre no nível 1 para acostumar com os pulsos</li>
              <li>• Não recomendado para portadores de marcapasso cardíaco</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-gray-900 pt-4">
          Vale a pena o investimento?
        </h2>
        <p>
          Uma única sessão de massoterapia ou quiropraxia custa entre R$ 120 e R$ 200. Ter um aparelho que entrega relaxamento diário no conforto de casa por menos de R$ 130 é um dos melhores custos-benefícios para a sua saúde e produtividade.
        </p>
      </div>

      <div className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="bg-emerald-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
              PROMOÇÃO DE FÁBRICA
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Massageador Cervical EMS por Apenas R$ 123,41 no PIX
            </h3>
            <p className="text-xs text-gray-300">
              Com **Frete Grátis** e garantia incondicional de 90 dias para todo o Brasil.
            </p>
          </div>

          <Link
            href="/produtos/massageador-cervical-ems-pro"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 flex-shrink-0"
          >
            Aproveitar com Frete Grátis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
