"use client";

import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    freeShippingThreshold,
  } = useCart();

  if (!isOpen) return null;

  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFree = Math.max(freeShippingThreshold - subtotal, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Cabeçalho */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">Seu Carrinho</h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)} itens
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Barra de Progresso de Frete Grátis */}
          <div className="bg-emerald-50/80 p-3.5 border-b border-emerald-100">
            <div className="flex items-center gap-2 mb-1.5">
              <Truck className="w-4 h-4 text-emerald-700" />
              <p className="text-xs text-emerald-900 font-semibold">
                {remainingForFree === 0
                  ? "🎉 Parabéns! Você ganhou FRETE GRÁTIS!"
                  : `Faltam apenas ${formatCurrency(remainingForFree)} para Frete Grátis!`}
              </p>
            </div>
            <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Lista de Itens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  🛒
                </div>
                <p className="font-medium text-gray-700">Seu carrinho está vazio</p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Adicione um dos nossos produtos campeões e aproveite o frete grátis hoje!
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Explorar Ofertas
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.variant.color}`}
                  className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                      <p className="text-[11px] text-gray-500">
                        {item.variant.color && `Cor: ${item.variant.color}`}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-gray-500 hover:text-black transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-gray-500 hover:text-black transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé e Botão de Checkout */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-white space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Frete</span>
                  <span className="text-emerald-600 font-bold">
                    {subtotal >= freeShippingThreshold ? "GRÁTIS" : formatCurrency(19.9)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Compra Segura com Garantia de Satisfação</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all text-sm uppercase tracking-wider"
              >
                Ir para o Pagamento
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
