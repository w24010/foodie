import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FoodieExpress - Fast Food Delivery",
  description: "Order delicious food online and get it delivered fast. Fresh ingredients, authentic flavors, and lightning-fast delivery.",
  keywords: "food delivery, online ordering, restaurant, fast food, pizza, burger, chinese, indian",
  authors: [{ name: "FoodieExpress" }],
  openGraph: {
    title: "FoodieExpress - Fast Food Delivery",
    description: "Order delicious food online and get it delivered fast",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodieExpress - Fast Food Delivery",
    description: "Order delicious food online and get it delivered fast",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans bg-gray-50`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
