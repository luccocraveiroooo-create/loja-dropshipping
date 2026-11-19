"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface SaleNotification {
  name: string;
  city: string;
  product: string;
  image: string;
  timeAgo: string;
}

const RECENT_SALES: SaleNotification[] = [
  {
    name: "Mariana Souza",
    city: "São Paulo, SP",
    product: "Fone de Ouvido Bluetooth Pro (Leve 2 Unidades)",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    timeAgo: "há 2 minutos",
  },
  {
    name: "Carlos Eduardo",
    city: "Belo Horizonte, MG",
    product: "Massageador Cervical e Lombar EMS",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=80",
    timeAgo: "há 5 minutos",
  },
  {
    name: "Rafael Alcantara",
    city: "Curitiba, PR",
    product: "Smartwatch Titanium Ultra Series 9",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    timeAgo: "há 3 minutos",
  },
  {
    name: "Juliana Mendes",
    city: "Rio de Janeiro, RJ",
    product: "Mini Projetor Portátil Smart Cinema 4K",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&q=80",
    timeAgo: "há 7 minutos",
  },
  {
    name: "Lucas Fernandes",
    city: "Brasília, DF",
    product: "Fone de Ouvido Bluetooth Pro com ANC",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    timeAgo: "há 1 minuto",
  },
];

export function SalesNotificationToast() {
  const [currentSale, setCurrentSale] = useState<SaleNotification | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let index = 0;

    const showNext = () => {
      setCurrentSale(RECENT_SALES[index]);
      setVisible(true);

      // Fica visível por 5 segundos
      setTimeout(() => {
        setVisible(false);
      }, 5000);

      index = (index + 1) % RECENT_SALES.length;
    };

    // Primeiro disparo após 4 segundos de entrada no site
    const initialTimeout = setTimeout(showNext, 4000);

    // Repete a cada 16 segundos
    const interval = setInterval(showNext, 16000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!currentSale || !visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-5 left-4 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-gray-200/80 flex items-center gap-3 animate-slide-up transition-all duration-500">
      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
        <Image
          src={currentSale.image}
          alt={currentSale.product}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-1 text-[11px] font-bold text-gray-900 truncate">
          <span>{currentSale.name}</span>
          <span className="text-[10px] text-gray-400 font-normal">• {currentSale.city}</span>
        </div>
        <p className="text-[11px] text-emerald-700 font-semibold truncate">
          Comprou {currentSale.product}
        </p>
        <div className="flex items-center gap-1.5 text-[9px] text-gray-400 mt-0.5">
          <span className="flex items-center gap-0.5 text-emerald-600 font-bold">
            <CheckCircle2 className="w-3 h-3" /> Compra Verificada (PIX)
          </span>
          <span>•</span>
          <span>{currentSale.timeAgo}</span>
        </div>
      </div>
    </div>
  );
}
