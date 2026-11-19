"use client";

import { useState } from "react";
import { Search, Truck, Package, CheckCircle2, Clock, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function TrackingPage() {
  const [code, setCode] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Cabeçalho */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <Truck className="w-4 h-4 text-emerald-600" />
          Rastreamento Oficial em Tempo Real
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Acompanhe o Seu Pedido
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Digite abaixo o seu código de rastreamento (enviado por e-mail/WhatsApp) ou o seu CPF.
        </p>
      </div>

      {/* Formulário de Busca */}
      <form
        onSubmit={handleTrack}
        className="max-w-xl mx-auto bg-white p-2 rounded-2xl border-2 border-emerald-500/50 shadow-xl flex items-center gap-2"
      >
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            required
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex: NL123456789BR ou seu CPF"
            className="w-full pl-11 pr-4 py-3 rounded-xl text-xs sm:text-sm outline-none font-medium"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
        >
          {loading ? "Buscando..." : "Rastrear"}
        </button>
      </form>

      {/* Resultado da Timeline de Rastreio */}
      {searched && (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between border-b pb-4 gap-2">
            <div>
              <p className="text-xs text-gray-400">Código de Rastreio</p>
              <p className="text-base font-mono font-bold text-gray-900 uppercase">
                {code.toUpperCase()}
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              Objeto em trânsito
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6 relative pl-6 border-l-2 border-emerald-500 ml-2">
            {/* Evento 1 */}
            <div className="relative space-y-1">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900">
                  Objeto em trânsito para a unidade de distribuição da sua cidade
                </h4>
                <span className="text-[10px] text-gray-400">Hoje às 10:24</span>
              </div>
              <p className="text-[11px] text-gray-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Centro de Distribuição dos Correios
              </p>
            </div>

            {/* Evento 2 */}
            <div className="relative space-y-1">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900">
                  Objeto postado e conferido pelo fornecedor
                </h4>
                <span className="text-[10px] text-gray-400">Ontem às 15:40</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Encaminhado com seguro de transporte e frete expresso
              </p>
            </div>

            {/* Evento 3 */}
            <div className="relative space-y-1">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900">
                  Pagamento aprovado e pedido faturado
                </h4>
                <span className="text-[10px] text-gray-400">2 dias atrás</span>
              </div>
              <p className="text-[11px] text-gray-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> PIX aprovado pelo Mercado Pago
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Previsão de entrega: <strong>4 a 9 dias úteis</strong> no seu endereço.
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Dúvidas sobre o envio? Fale com nosso suporte pelo WhatsApp no rodapé.
            </p>
          </div>
        </div>
      )}

      {/* Dúvidas Frequentes sobre Entrega */}
      <div className="max-w-2xl mx-auto pt-8 border-t border-gray-100 space-y-4">
        <h3 className="text-base font-bold text-gray-900 text-center">
          Perguntas Frequentes sobre Envio
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
            <p className="font-bold text-gray-800">Quando recebo o código de rastreio?</p>
            <p className="text-gray-500">
              O código é enviado automaticamente no seu WhatsApp e e-mail em até 48 horas após a confirmação do pagamento.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
            <p className="font-bold text-gray-800">E se o produto atrasar ou extraviar?</p>
            <p className="text-gray-500">
              Todas as encomendas possuem seguro total. Se houver qualquer problema, enviamos outro produto ou devolvemos 100% do seu dinheiro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
