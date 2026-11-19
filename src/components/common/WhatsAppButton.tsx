"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  storeName?: string;
}

export function WhatsAppButton({
  phoneNumber = "5511999999999",
  storeName = "PrimeStore",
}: WhatsAppButtonProps) {
  const message = encodeURIComponent(
    `Olá! Tenho uma dúvida sobre um produto da ${storeName} e gostaria de ajuda para finalizar meu pedido com frete grátis.`
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-5 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label="Atendimento via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-xs font-bold pl-0 group-hover:pl-1">
        Dúvidas? Fale no WhatsApp
      </span>
      {/* Indicador de atendente online */}
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
      </span>
    </a>
  );
}
