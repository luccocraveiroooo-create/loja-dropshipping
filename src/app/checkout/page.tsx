"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import {
  Lock,
  QrCode,
  CreditCard,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | "boleto">("pix");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const clean = couponInput.trim().toUpperCase();
    if (clean === "PRIME10" || clean === "VOLTE10") {
      setDiscountPercent(10);
      setCouponApplied(clean);
    } else {
      setCouponError("Cupom inválido ou expirado.");
    }
  };
  const [pixResult, setPixResult] = useState<{
    id: number | string;
    qrCodeBase64?: string;
    qrCode: string;
    ticketUrl?: string;
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cpf: "",
    zipCode: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "SP",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao processar pagamento");
      }

      if (paymentMethod === "pix" && data.pix) {
        setPixResult(data.pix);
        clearCart();
      } else {
        alert("Pedido processado com sucesso! Entraremos em contato via WhatsApp.");
        clearCart();
      }
    } catch (err: any) {
      alert(`Aviso: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyPixCode = () => {
    if (pixResult?.qrCode) {
      navigator.clipboard.writeText(pixResult.qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (items.length === 0 && !pixResult) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Seu carrinho está vazio</h2>
        <p className="text-xs text-gray-500">Adicione produtos antes de ir para o checkout.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Banner de Segurança */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <Link href="/" className="text-base font-black tracking-tight text-gray-900">
            PRIME<span className="text-emerald-600">STORE</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>Checkout Seguro & Criptografado</span>
          </div>
        </div>

        {/* Se o PIX já foi gerado */}
        {pixResult ? (
          <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl border-2 border-emerald-500 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-gray-900">Pedido Gerado com Sucesso!</h2>
              <p className="text-xs text-gray-500">
                Pague agora com o PIX abaixo para liberar o envio imediato no fornecedor.
              </p>
            </div>

            {/* QR Code Imagem */}
            {pixResult.qrCodeBase64 && (
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 inline-block">
                <img
                  src={`data:image/png;base64,${pixResult.qrCodeBase64}`}
                  alt="QR Code PIX"
                  className="w-52 h-52 mx-auto object-contain"
                />
              </div>
            )}

            {/* Copia e Cola */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-gray-700 block">
                Código Copia e Cola:
              </label>
              <div className="relative">
                <textarea
                  readOnly
                  rows={3}
                  value={pixResult.qrCode}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[11px] font-mono text-gray-700 select-all outline-none"
                />
              </div>

              <button
                onClick={copyPixCode}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Código Copiado!" : "Copiar Código PIX"}
              </button>
            </div>

            <div className="text-[11px] text-gray-400 border-t border-gray-100 pt-3">
              O comprovante e o código de rastreio serão enviados para o seu e-mail e WhatsApp assim que o pagamento for detectado.
            </div>
          </div>
        ) : (
          /* Formulário de Checkout Normal */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <form onSubmit={handleCheckout} className="md:col-span-7 space-y-6">
              
              {/* Etapa 1: Dados do Cliente */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b pb-2">
                  1. Dados Pessoais & Contato
                </h3>
                <div className="space-y-3">
                  <input
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nome Completo"
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="E-mail (para receber o rastreio)"
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="WhatsApp com DDD (Ex: 11999999999)"
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <input
                    required
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    type="text"
                    placeholder="CPF (obrigatório para nota e envio dos Correios)"
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Etapa 2: Endereço de Entrega */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b pb-2">
                  2. Endereço de Entrega
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      required
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      type="text"
                      placeholder="CEP"
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <input
                      required
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      type="text"
                      placeholder="Rua / Avenida"
                      className="col-span-2 w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      required
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      type="text"
                      placeholder="Número"
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <input
                      required
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      type="text"
                      placeholder="Bairro"
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <input
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      type="text"
                      placeholder="Cidade"
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Etapa 3: Pagamento */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b pb-2">
                  3. Escolha como Pagar
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === "pix"
                        ? "border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs">PIX Instantâneo</span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                      -5% OFF
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === "card"
                        ? "border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-gray-700" />
                    <span className="text-xs">Cartão</span>
                    <span className="text-[10px] text-gray-400">Até 12x</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("boleto")}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === "boleto"
                        ? "border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold shadow-xs"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <FileText className="w-5 h-5 text-gray-700" />
                    <span className="text-xs">Boleto</span>
                    <span className="text-[10px] text-gray-400">À vista</span>
                  </button>
                </div>

                {paymentMethod === "pix" && (
                  <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Aprovação em segundos:</strong> O código QR Code é gerado imediatamente na próxima tela com desconto já aplicado.
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-black rounded-2xl shadow-xl shadow-emerald-600/30 text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  {loading ? "Processando Pedido..." : "Finalizar Pedido Agora"}
                </button>
              </div>
            </form>

            {/* Coluna Direita: Resumo do Pedido */}
            <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs h-fit space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b pb-2">
                Resumo da Sua Compra
              </h3>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1 space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="pt-2 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{item.title}</p>
                      <p className="text-[10px] text-gray-400">Qtd: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Campo de Cupom de Desconto */}
              <div className="border-t pt-3">
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  Possui Cupom de Desconto?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Ex: PRIME10"
                    className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs uppercase font-mono font-bold outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition"
                  >
                    Aplicar
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                    ✓ Cupom {couponApplied} aplicado com sucesso (-10%)!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-500 font-medium mt-1">{couponError}</p>
                )}
              </div>

              <div className="space-y-2 border-t pt-3 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Desconto do Cupom (10%)</span>
                    <span>- {formatCurrency(subtotal * 0.1)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Frete</span>
                  <span className="text-emerald-600 font-bold">GRÁTIS</span>
                </div>
                {paymentMethod === "pix" && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Desconto PIX (5%)</span>
                    <span>
                      -{" "}
                      {formatCurrency(
                        (subtotal * (couponApplied ? 0.9 : 1)) * 0.05
                      )}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-gray-900 border-t pt-2">
                  <span>Total</span>
                  <span>
                    {formatCurrency(
                      (subtotal * (couponApplied ? 0.9 : 1)) *
                        (paymentMethod === "pix" ? 0.95 : 1)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
