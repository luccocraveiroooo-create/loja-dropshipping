"use client";

import Link from "next/link";
import { ShoppingBag, ShieldCheck, Zap } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function Header() {
  const { openCart, items } = useCart();
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Top Bar de Anúncio e Gatilho de Urgência */}
      <div className="bg-emerald-600 text-white text-[11px] font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-1.5">
        <Zap className="w-3.5 h-3.5 fill-current text-yellow-300" />
        <span>SEMANA DO FRETE GRÁTIS PARA TODO O BRASIL + 5% OFF NO PIX</span>
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

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Site 100% Blindado</span>
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
