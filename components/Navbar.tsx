"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, ArrowRight, Menu, X } from "lucide-react";
import { useCart, useWishlist } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/shop?category=women", label: "Women" },
  { href: "/shop?category=men", label: "Men" },
  { href: "/shop?category=home", label: "Home" },
  { href: "/shop?category=beauty", label: "Beauty" },
  { href: "/shop?sale=true", label: "Sale", sale: true },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bounce, setBounce] = useState(false);

  const items = useCart((s) => s.items);
  const setDrawerOpen = useCart((s) => s.setDrawerOpen);
  const wishlistIds = useWishlist((s) => s.ids);

  const cartCount = items.reduce((a, i) => a + i.quantity, 0);

  useEffect(() => {
    if (cartCount === 0) return;
    setBounce(true);
    const t = setTimeout(() => setBounce(false), 500);
    return () => clearTimeout(t);
  }, [cartCount]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="sticky top-0 z-40 md:top-3 md:mx-4 md:mt-3">
        <header className="max-w-7xl mx-auto bg-white border-b border-border md:border md:border-white/60 md:rounded-2xl md:shadow-glass md:bg-white/[0.72] md:backdrop-blur-xl md:backdrop-saturate-150">
          <div className="h-14 md:h-[60px] flex items-center justify-between gap-3 px-4 md:px-5">
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -ml-2 text-ink"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>

            {/* Logo — centred on mobile, left on desktop */}
            <Link
              href="/"
              className="font-heading font-extrabold text-ink text-base md:text-[20px] tracking-tighter2 shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
            >
              ShopZim
            </Link>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-6 ml-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "text-[13px] font-medium text-ink/70 hover:text-ink transition-colors duration-150",
                    l.sale && "!text-ink font-semibold"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Search bar — centered on desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-auto">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-3 w-full bg-page rounded-pill pl-4 pr-1.5 py-1.5 text-left text-muted hover:bg-[#E8E8E5] transition-colors duration-150"
              >
                <Search size={16} />
                <span className="text-[13px] flex-1">Search products...</span>
                <span className="w-8 h-8 bg-lime rounded-pill flex items-center justify-center shrink-0">
                  <ArrowRight size={14} className="text-ink" />
                </span>
              </button>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                className="md:hidden p-2 text-ink"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <Link
                href="/wishlist"
                className="hidden md:flex w-9 h-9 items-center justify-center rounded-pill hover:bg-black/5 relative transition-colors duration-150"
                aria-label="Wishlist"
              >
                <Heart
                  size={18}
                  className={cn(
                    "text-ink",
                    wishlistIds.length > 0 && "fill-red-500 text-red-500"
                  )}
                />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-lime text-ink text-[10px] font-bold rounded-pill min-w-[16px] h-[16px] flex items-center justify-center px-1">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setDrawerOpen(true)}
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-pill hover:bg-black/5 relative transition-colors duration-150",
                  bounce && "animate-bounceTiny"
                )}
                aria-label="Cart"
              >
                <ShoppingBag size={18} className="text-ink" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-lime text-ink text-[10px] font-bold rounded-pill min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </button>
              {/* Avatar */}
              <div
                className="hidden md:block w-9 h-9 rounded-pill ml-1"
                style={{
                  background:
                    "linear-gradient(135deg,#C8FF00 0%,#A5B4FC 100%)",
                }}
                aria-label="Account"
              />
            </div>
          </div>
        </header>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl mx-auto mt-20 mx-4"
            >
              <div className="bg-white rounded-cardLg shadow-cardHover p-6">
                <div className="flex items-center gap-3 bg-page rounded-pill pl-5 pr-1.5 py-1.5">
                  <Search size={18} className="text-muted" />
                  <input
                    autoFocus
                    placeholder="Search products..."
                    className="flex-1 outline-none text-[15px] bg-transparent text-ink placeholder:text-muted2"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    aria-label="Close"
                    className="w-9 h-9 bg-ink rounded-pill flex items-center justify-center text-white hover:bg-ink/90"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="mt-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-3">
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Dresses",
                      "Sneakers",
                      "Handbags",
                      "Summer Collection",
                      "Home Decor",
                    ].map((t) => (
                      <button
                        key={t}
                        className="px-4 py-2 bg-page rounded-pill text-ink text-[13px] hover:bg-lime transition-colors duration-150"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile nav overlay — white, full-screen, slides down from top */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="font-heading font-extrabold text-xl text-ink tracking-tighter2">
                ShopZim
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
                className="w-11 h-11 bg-page rounded-pill flex items-center justify-center text-ink"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 px-6 pt-2">
              {[...links, { href: "/wishlist", label: `Wishlist (${wishlistIds.length})` }, { href: "/about", label: "About" }].map((l, i) => (
                <motion.div
                  key={l.href + l.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 + i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block w-full py-4 border-b border-border font-heading font-bold text-xl tracking-tighter2",
                      (l as { sale?: boolean }).sale ? "text-[#F97316]" : "text-ink"
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 py-6 border-t border-border">
              <div className="flex gap-3">
                {["Instagram", "Facebook", "WhatsApp"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    aria-label={s}
                    className="w-10 h-10 bg-page rounded-pill flex items-center justify-center text-ink hover:bg-lime transition-colors duration-150"
                  >
                    <span className="text-xs font-bold">{s[0]}</span>
                  </a>
                ))}
              </div>
              <div className="text-xs text-muted mt-4">© ShopZim {new Date().getFullYear()}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
