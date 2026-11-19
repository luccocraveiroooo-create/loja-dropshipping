"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ShieldCheck, Zap, Truck, Clock } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function Header() {
  const { openCart, items } = useCart();
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Contador regressivo de urgência
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 35 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 30, seconds: 0 }; // reinicia
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (n: number) => n.toString().padStart(2, "0");

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Top Bar de Anúncio com Cronômetro Regressivo Real */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white text-[11px] font-bold py-2 px-4 text-center tracking-wide flex flex-wrap items-center justify-center gap-2">
        <span className="flex items-center gap-1 text-yellow-300">
          <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
          OFERTA RELÂMPAGO COM FRETE GRÁTIS:
        </span>
        <span className="bg-black/30 px-2 py-0.5 rounded-md font-mono text-yellow-200 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDigits(timeLeft.hours)}:{formatDigits(timeLeft.minutes)}:
          {formatDigits(timeLeft.seconds)}
        </span>
        <span className="hidden sm:inline text-emerald-100">• 5% OFF NO PIX</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
            P
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-gray-900 block leading-tight">
              PRIME<span className="text-emerald-600">STORE</span>
            </span>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
              Inovação & Ofertas
            </span>
          </div>
        </Link>

        {/* Links de Navegação Rápidos */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-600">
          <Link href="/#ofertas" className="hover:text-emerald-600 transition">
            Mais Vendidos
          </Link>
          <Link href="/rastreio" className="hover:text-emerald-600 flex items-center gap-1 transition">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            Rastrear Pedido
          </Link>
          <Link href="/blog/review-fone-bluetooth-pro" className="hover:text-emerald-600 transition">
            Reviews
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/rastreio"
            className="md:hidden p-2 rounded-xl text-gray-600 hover:text-emerald-600 transition"
            title="Rastrear Pedido"
          >
            <Truck className="w-5 h-5" />
          </Link>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Site Blindado</span>
          </div>

          <button
            onClick={openCart}
            className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingBag className="w-5 h-5 text-gray-800" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scale">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
