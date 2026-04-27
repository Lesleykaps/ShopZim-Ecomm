import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import CartDrawer from "@/components/CartDrawer";
import Toaster from "@/components/Toaster";
import AnnouncementBar from "@/components/AnnouncementBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "ShopZim — Shop Zimbabwe. Shop Smart.",
  description:
    "ShopZim is a modern fashion & lifestyle e-commerce store curated for Zimbabwe. Clothing, beauty, home goods and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-body bg-page text-ink min-h-screen flex flex-col antialiased">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
        <CartDrawer />
        <Toaster />
      </body>
    </html>
  );
}
