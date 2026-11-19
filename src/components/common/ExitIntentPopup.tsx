"use client";

import { useState, useEffect } from "react";
import { X, Gift, Check, ArrowRight, Sparkles } from "lucide-react";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const couponCode = "PRIME10";

  useEffect(() => {
    // Se já foi exibido nesta sessão, não repete
    const hasSeen = sessionStorage.getItem("@dropship:exit_popup");
    if (hasSeen) return;

    // Detectar saída do mouse (Desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        setIsOpen(true);
        sessionStorage.setItem("@dropship:exit_popup", "true");
      }
    };

    // Timer para mobile (45 segundos)
    const mobileTimer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("@dropship:exit_popup", "true");
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  const copyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-2 border-emerald-500 space-y-5">
        {/* Botão Fechar */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ícone Chamativo */}
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg shadow-emerald-500/30">
          <Gift className="w-9 h-9" />
        </div>

        {/* Textos de Conversão */}
        <div className="space-y-1.5">
          <span className="text-emerald-700 bg-emerald-100 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> PRESENTE EXCLUSIVO PARA VOCÊ
          </span>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
            Espere! Não vá embora de mãos vazias!
          </h3>
          <p className="text-xs text-gray-500">
            Libere agora **10% de DESCONTO EXTRA** e Frete Grátis no seu pedido usando o cupom abaixo:
          </p>
        </div>

        {/* Cupom em Destaque */}
        <div className="p-3 bg-gray-50 border-2 border-dashed border-emerald-400 rounded-2xl flex items-center justify-between">
          <div className="text-left pl-2">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Cupom Secreto</span>
            <span className="text-base font-mono font-black text-emerald-700 tracking-wider">
              {couponCode}
            </span>
          </div>

          <button
            onClick={copyCoupon}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : null}
            {copied ? "Copiado!" : "Copiar Cupom"}
          </button>
        </div>

        <button
          onClick={copyCoupon}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition active:scale-95"
        >
          Aproveitar Desconto Agora
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-gray-400">
          *Válido apenas para os próximos 15 minutos em qualquer produto da loja.
        </p>
      </div>
    </div>
  );
}
