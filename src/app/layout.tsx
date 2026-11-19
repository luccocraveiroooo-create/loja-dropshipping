import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ExitIntentPopup } from "@/components/common/ExitIntentPopup";
import { SalesNotificationToast } from "@/components/common/SalesNotificationToast";

export const metadata: Metadata = {
  title: "PrimeStore | Loja Oficial de Tecnologia e Ofertas Exclusivas",
  description: "Encontre produtos inovadores com frete grátis, parcelamento em até 12x e garantia incondicional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col justify-between antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
          <ExitIntentPopup />
          <SalesNotificationToast />
        </CartProvider>
      </body>
    </html>
  );
}
