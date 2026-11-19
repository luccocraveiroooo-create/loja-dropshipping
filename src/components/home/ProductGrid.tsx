"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Zap } from "lucide-react";
import { PRODUCTS } from "@/lib/products-mock";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

export function ProductGrid() {
  const { addItem } = useCart();

  return (
    <section id="ofertas" className="py-12 max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4 fill-emerald-600" />
            <span>Mais Vendidos da Semana</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            Produtos em Alta com Preço de Fábrica
          </h2>
        </div>
        <p className="text-xs text-gray-500 font-medium">
          Estoque limitado com desconto promocional aplicado
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => {
          const discountPercent = Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
          );

          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Imagem do Produto */}
                <Link
                  href={`/produtos/${product.slug}`}
                  className="relative aspect-square block w-full bg-gray-100 overflow-hidden"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    -{discountPercent}% OFF
                  </span>
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    Restam {product.stockLeft} unid.
                  </span>
                </Link>

                {/* Conteúdo */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-gray-600">
                      {product.rating} ({product.reviewsCount})
                    </span>
                  </div>

                  <Link href={`/produtos/${product.slug}`}>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-500 line-clamp-2">{product.tagline}</p>
                </div>
              </div>

              {/* Preço e Botão */}
              <div className="p-4 pt-0 border-t border-gray-50 mt-2 space-y-3">
                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-xs text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="text-xl font-black text-emerald-600">
                    {formatCurrency(product.price)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  ou até <strong>{product.installments}</strong>
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/produtos/${product.slug}`}
                    className="w-full py-2.5 border border-gray-200 hover:border-gray-900 text-gray-700 hover:text-black font-bold text-xs rounded-xl flex items-center justify-center transition"
                  >
                    Ver Detalhes
                  </Link>
                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.images[0],
                        variant: { color: product.variants.colors?.[0]?.name },
                        quantity: 1,
                      })
                    }
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
