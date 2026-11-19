"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Truck, ShieldCheck, RefreshCcw, Flame, Check, Zap, Gift } from "lucide-react";
import { PRODUCTS } from "@/lib/products-mock";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.variants.colors?.[0]?.name || ""
  );
  const [selectedKit, setSelectedKit] = useState<1 | 2 | 3>(2); // Padrão: Kit 2 (Mais vendido)

  const { addItem } = useCart();

  // Cálculo de preços baseado no Kit
  const getKitDetails = () => {
    if (selectedKit === 1) {
      return {
        qty: 1,
        price: product.price,
        originalPrice: product.originalPrice,
        label: "1 Unidade",
        tag: null,
      };
    }
    if (selectedKit === 2) {
      // Leve 2 com 50% na segunda
      const kitPrice = Math.round(product.price * 1.5);
      return {
        qty: 2,
        price: kitPrice,
        originalPrice: product.originalPrice * 2,
        label: "Leve 2 Unidades",
        tag: "MAIS ESCOLHIDO (50% OFF NA 2ª UNID)",
      };
    }
    // Leve 3 pague 2
    const kitPrice = Math.round(product.price * 2);
    return {
      qty: 3,
      price: kitPrice,
      originalPrice: product.originalPrice * 3,
      label: "Leve 3 Unidades",
      tag: "PAGUE 2 E LEVE 3 (MAIOR ECONOMIA)",
    };
  };

  const currentKit = getKitDetails();

  const handleBuy = () => {
    addItem({
      id: `${product.id}-${selectedColor}-kit${selectedKit}`,
      title: `${product.title} (${currentKit.label})`,
      price: currentKit.price,
      originalPrice: currentKit.originalPrice,
      image: product.images[0],
      variant: { color: selectedColor },
      quantity: 1,
    });
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "PrimeStore",
    },
    offers: {
      "@type": "Offer",
      url: `https://loja-dropshipping-seven.vercel.app/produtos/${product.slug}`,
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "PrimeStore Oficial Brasil",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewsCount.toString(),
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-28 md:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Galeria de Fotos */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm">
            <Image
              src={product.images[selectedImg]}
              alt={product.title}
              fill
              priority
              className="object-cover transition-all duration-300"
            />
            <span className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              FRETE GRÁTIS HOJE
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                  selectedImg === i
                    ? "border-emerald-600 scale-95 shadow-sm"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Coluna de Venda e Conversão */}
        <div className="space-y-5">
          {/* Avaliações e Prova Social */}
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-800">{product.rating}</span>
            <span className="text-xs text-gray-400">
              ({product.reviewsCount} clientes avaliaram com 5 estrelas)
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
            {product.title}
          </h1>

          {/* Gatilho de Escassez e Urgência */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center gap-2 text-amber-900 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-600 flex-shrink-0 animate-pulse" />
            <span>ÚLTIMAS UNIDADES: Restam apenas {product.stockLeft} em estoque promocional!</span>
          </div>

          {/* SELETOR DE KITS PROMOCIONAIS (ARMA SECRETA DE CONVERSÃO) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-emerald-600" />
              Selecione o seu Kit com Desconto Progressivo:
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {/* Opção 1 */}
              <button
                type="button"
                onClick={() => setSelectedKit(1)}
                className={`p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                  selectedKit === 1
                    ? "border-emerald-600 bg-emerald-50/70 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-gray-900">Leve 1 Unidade</p>
                  <p className="text-[11px] text-gray-500">Ideal para testar</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 line-through mr-1.5">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="text-sm font-black text-emerald-600">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </button>

              {/* Opção 2 - Mais Vendido */}
              <button
                type="button"
                onClick={() => setSelectedKit(2)}
                className={`relative p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                  selectedKit === 2
                    ? "border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="absolute -top-2.5 right-4 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs tracking-wider">
                  Mais Vendido (50% OFF na 2ª)
                </span>
                <div>
                  <p className="text-xs font-bold text-gray-900">Leve 2 Unidades (1 p/ presente)</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">
                    Economize {formatCurrency(product.price * 0.5)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 line-through mr-1.5">
                    {formatCurrency(product.originalPrice * 2)}
                  </span>
                  <span className="text-base font-black text-emerald-600">
                    {formatCurrency(Math.round(product.price * 1.5))}
                  </span>
                </div>
              </button>

              {/* Opção 3 - Pague 2 Leve 3 */}
              <button
                type="button"
                onClick={() => setSelectedKit(3)}
                className={`p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                  selectedKit === 3
                    ? "border-emerald-600 bg-emerald-50/70 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-gray-900">Leve 3 Unidades (Pague 2 Leve 3)</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">1 unidade sai 100% Grátis!</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 line-through mr-1.5">
                    {formatCurrency(product.originalPrice * 3)}
                  </span>
                  <span className="text-base font-black text-emerald-600">
                    {formatCurrency(Math.round(product.price * 2))}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Seletor de Variação de Cores */}
          {product.variants.colors && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                Cor: <span className="text-emerald-700">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.variants.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                      selectedColor === c.name
                        ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-gray-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                    {selectedColor === c.name && (
                      <Check className="w-3 h-3 text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Botão de Compra Principal (Desktop) */}
          <button
            onClick={handleBuy}
            className="hidden md:flex w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-black rounded-2xl items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 text-base uppercase tracking-wider transition-all"
          >
            <Zap className="w-5 h-5 fill-current" />
            Comprar {currentKit.label} com Frete Grátis
          </button>

          {/* Destaques / Benefícios */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
              Garantias e Benefícios:
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-600">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Selos de Confiança */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
            <div className="p-3 bg-gray-50 rounded-xl space-y-1">
              <Truck className="w-4 h-4 mx-auto text-emerald-600" />
              <p className="text-[11px] font-bold text-gray-800">Frete Grátis</p>
              <p className="text-[10px] text-gray-500">Envio segurado</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl space-y-1">
              <RefreshCcw className="w-4 h-4 mx-auto text-emerald-600" />
              <p className="text-[11px] font-bold text-gray-800">Troca Fácil</p>
              <p className="text-[10px] text-gray-500">7 dias grátis</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl space-y-1">
              <ShieldCheck className="w-4 h-4 mx-auto text-emerald-600" />
              <p className="text-[11px] font-bold text-gray-800">Garantia</p>
              <p className="text-[10px] text-gray-500">90 dias total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Buy Bar para Mobile */}
      <div className="fixed md:hidden bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-40 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] text-gray-400">{currentKit.label}</p>
          <p className="text-lg font-black text-emerald-600">
            {formatCurrency(currentKit.price)}
          </p>
        </div>
        <button
          onClick={handleBuy}
          className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md shadow-emerald-600/30"
        >
          Comprar Agora
        </button>
      </div>
    </div>
  );
}
