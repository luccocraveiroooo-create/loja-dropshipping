"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  variant: { color?: string; size?: string };
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const freeShippingThreshold = 149.9; // Meta para frete grátis

  useEffect(() => {
    try {
      const saved = localStorage.getItem("@dropship:cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Erro ao ler carrinho do LocalStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("@dropship:cart", JSON.stringify(items));
    } catch (e) {
      console.error("Erro ao salvar carrinho", e);
    }
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existsIndex = prev.findIndex(
        (item) => item.id === newItem.id && item.variant.color === newItem.variant.color
      );
      if (existsIndex > -1) {
        const updated = [...prev];
        updated[existsIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        freeShippingThreshold,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
};
