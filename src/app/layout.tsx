import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { LangProvider } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingBackground from "@/components/FloatingBackground";

export const metadata: Metadata = {
  title: "Nutrilings — Palmyra Tuber Health Mix | Our Tradition, Your Health",
  description:
    "Sprouted, stone-ground palmyra tuber health mix milled in Ramanathapuram. Ten ingredients, no preservatives, no added sugar. Order on WhatsApp.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400..700;1,400..600&family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&family=Nunito:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <LangProvider>
          <CartProvider>
            <FloatingBackground />
            <Header />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
