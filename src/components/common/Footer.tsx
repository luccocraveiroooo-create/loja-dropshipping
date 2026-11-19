import { ShieldCheck, Lock, Truck, RefreshCcw, Headphones } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-xs border-t border-gray-800">
      {/* Vantagens / Selos */}
      <div className="max-w-6xl mx-auto px-4 py-8 border-b border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <Truck className="w-6 h-6 mx-auto text-emerald-400" />
            <p className="font-bold text-gray-200">Envio para todo o Brasil</p>
            <p className="text-[11px] text-gray-500">Rastreamento minuto a minuto</p>
          </div>
          <div className="space-y-1">
            <ShieldCheck className="w-6 h-6 mx-auto text-emerald-400" />
            <p className="font-bold text-gray-200">Garantia Incondicional</p>
            <p className="text-[11px] text-gray-500">7 dias para testar ou seu dinheiro de volta</p>
          </div>
          <div className="space-y-1">
            <Lock className="w-6 h-6 mx-auto text-emerald-400" />
            <p className="font-bold text-gray-200">Pagamento Seguro</p>
            <p className="text-[11px] text-gray-500">Criptografia SSL de 256 bits</p>
          </div>
          <div className="space-y-1">
            <Headphones className="w-6 h-6 mx-auto text-emerald-400" />
            <p className="font-bold text-gray-200">Suporte Dedicado</p>
            <p className="text-[11px] text-gray-500">Atendimento humano via WhatsApp</p>
          </div>
        </div>
      </div>

      {/* Direitos e Informações Legais */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="font-bold text-gray-300">PrimeStore Oficial Brasil</p>
          <p className="text-[11px] text-gray-500">
            CNPJ: 00.000.000/0001-00 • Todos os direitos reservados.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>Política de Privacidade</span>
          <span>•</span>
          <span>Termos de Uso</span>
          <span>•</span>
          <span>Rastrear Pedido</span>
        </div>
      </div>
    </footer>
  );
}
