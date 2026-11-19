import { Star, CheckCircle } from "lucide-react";

const REVIEWS = [
  {
    name: "Carlos Eduardo Silva",
    city: "São Paulo, SP",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    text: "Chegou em 7 dias aqui em SP! O fone tem um isolamento acústico incrível, uso o dia inteiro no trabalho e a bateria dura muito. Valeu cada centavo.",
    product: "Fone Bluetooth ANC Pro",
  },
  {
    name: "Mariana Souza",
    city: "Belo Horizonte, MG",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    text: "Comprei com receio por ser a primeira vez, mas o atendimento pelo WhatsApp foi sensacional e o rastreio funcionou perfeitamente. O relógio é lindo demais!",
    product: "Smartwatch Titanium Ultra",
  },
  {
    name: "Lucas Mendonça",
    city: "Curitiba, PR",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
    text: "O mini projetor superou todas as expectativas. Coloquei no quarto e a imagem é super nítida mesmo com luz fraca. Recomendo de olhos fechados.",
    product: "Mini Projetor Portátil 4K",
  },
];

export function SocialProof() {
  return (
    <section className="py-12 bg-gray-50 border-t border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="flex justify-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            Quem Comprou, Recomenda
          </h2>
          <p className="text-xs text-gray-500">
            Mais de 14.800 clientes satisfeitos em todo o território nacional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border border-gray-100"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                      {review.name}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </h3>
                    <p className="text-[10px] text-gray-400">{review.city} • Compra Verificada</p>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3 h-3 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-gray-50 text-[11px] font-semibold text-emerald-700">
                Produto: {review.product}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
