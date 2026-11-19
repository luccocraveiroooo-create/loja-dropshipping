import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, Flame } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white py-12 md:py-20 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Copy de Alta Conversão */}
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <Flame className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>LANÇAMENTO EXCLUSIVO NO BRASIL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.15]">
            Tecnologia de Ponta com <span className="text-emerald-600">Até 50% OFF</span> e Frete Grátis
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-lg leading-relaxed">
            Produtos selecionados a dedo com garantia total de fábrica, entrega rápida rastreada e pagamento facilitado no PIX ou até 12x no cartão.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <a
              href="#ofertas"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-all"
            >
              Ver Ofertas da Semana
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Garantia de 90 dias direto no Brasil</span>
            </div>
          </div>

          {/* Micro Prova Social */}
          <div className="pt-2 flex items-center justify-center md:justify-start gap-3">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Cliente" />
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Cliente" />
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Cliente" />
            </div>
            <div className="text-left text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 font-semibold">+14.800 pedidos entregues</span>
            </div>
          </div>
        </div>

        {/* Imagem do Produto Destaque */}
        <div className="relative mx-auto max-w-sm md:max-w-md w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
            alt="Fone Bluetooth Pro"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-white/50 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-900">Fone Bluetooth ANC Pro</p>
              <p className="text-xs text-emerald-600 font-extrabold">Por apenas R$ 189,90</p>
            </div>
            <Link
              href="/produtos/fone-bluetooth-anc-pro"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition"
            >
              Comprar
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
