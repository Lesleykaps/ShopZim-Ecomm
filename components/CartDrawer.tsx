"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { cartKey, cartTotals, useCart } from "@/lib/store";
import Image from "next/image";
import { categoryGradient, formatPrice, productImage } from "@/lib/utils";

export default function CartDrawer() {
  const open = useCart((s) => s.drawerOpen);
  const setOpen = useCart((s) => s.setDrawerOpen);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const promo = useCart((s) => s.promo);
  const applyPromo = useCart((s) => s.applyPromo);

  const [showPromo, setShowPromo] = useState(false);
  const [code, setCode] = useState("");
  const [promoErr, setPromoErr] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const totals = cartTotals(items, promo);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50"
        >
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute right-0 top-0 h-full w-full md:w-[420px] bg-white md:glass md:rounded-l-cardLg shadow-cardHover flex flex-col text-ink"
          >
            <div className="sticky top-0 bg-white md:bg-transparent z-10 flex items-center justify-between p-4 md:p-5 border-b border-border">
              <div>
                <div className="font-heading font-bold text-[20px] tracking-tighter2">
                  Your Cart
                </div>
                <div className="text-xs text-muted">
                  ({items.reduce((a, i) => a + i.quantity, 0)} items)
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-11 h-11 bg-page hover:bg-[#E5E5E5] rounded-pill flex items-center justify-center transition-colors duration-150"
              >
                <X size={18} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-pill bg-page flex items-center justify-center mb-4">
                  <ShoppingBag size={24} className="text-muted2" />
                </div>
                <div className="font-heading font-bold text-lg tracking-tighter2">
                  Your cart is empty
                </div>
                <p className="text-muted text-sm mt-1">
                  Discover something you'll love.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="mt-5 bg-lime hover:bg-limeHover text-ink px-6 py-3 rounded-pill font-bold text-sm transition-colors duration-150 inline-flex items-center gap-2"
                >
                  Start Shopping <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((it) => {
                      const k = cartKey(it);
                      return (
                        <motion.div
                          key={k}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex gap-3 bg-white rounded-card p-3 shadow-soft"
                        >
                          <div
                            className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-[12px] shrink-0 shadow-soft relative overflow-hidden"
                            style={{
                              background: categoryGradient(it.product.category),
                            }}
                          >
                            <Image
                              src={productImage(it.product.slug, 144, 144)}
                              alt={it.product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold line-clamp-2 font-heading tracking-tighter2">
                              {it.product.name}
                            </div>
                            <div className="text-[11px] text-muted mt-0.5">
                              Size: {it.size} · {it.colour}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center bg-page rounded-pill">
                                <button
                                  className="w-7 h-7 flex items-center justify-center"
                                  onClick={() => setQty(k, it.quantity - 1)}
                                  aria-label="Decrease"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="px-1 text-xs font-bold min-w-[20px] text-center">
                                  {it.quantity}
                                </span>
                                <button
                                  className="w-7 h-7 flex items-center justify-center"
                                  onClick={() => setQty(k, it.quantity + 1)}
                                  aria-label="Increase"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <div className="font-bold text-sm">
                                {formatPrice(it.product.price * it.quantity)}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => remove(k)}
                            className="w-9 h-9 -m-1 flex items-start justify-end text-muted2 hover:text-red-500 transition-colors duration-150"
                            aria-label="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Promo */}
                  <div className="pt-1">
                    {!showPromo ? (
                      <button
                        className="text-sm text-ink font-semibold underline underline-offset-2 hover:text-muted"
                        onClick={() => setShowPromo(true)}
                      >
                        Have a promo code?
                      </button>
                    ) : (
                      <div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="WELCOME10"
                            className="flex-1 bg-page rounded-pill px-4 h-11 text-ink outline-none placeholder:text-muted2 border-0"
                          />
                          <button
                            onClick={() => {
                              const ok = applyPromo(code);
                              setPromoErr(ok ? null : "Invalid code");
                            }}
                            className="bg-ink text-white text-sm font-semibold h-11 px-5 rounded-pill hover:bg-ink/90"
                          >
                            Apply
                          </button>
                        </div>
                        {promo && (
                          <div className="mt-2 text-success text-xs font-semibold">
                            ✓ {promo} applied — 10% off!
                          </div>
                        )}
                        {promoErr && !promo && (
                          <div className="mt-2 text-red-500 text-xs font-semibold">
                            {promoErr}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-surface2 m-4 rounded-card p-4 space-y-2 text-sm">
                  <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
                  <Row
                    label="Delivery"
                    value={
                      totals.delivery === 0
                        ? "FREE"
                        : formatPrice(totals.delivery)
                    }
                  />
                  {totals.discount > 0 && (
                    <Row
                      label="Discount"
                      value={`-${formatPrice(totals.discount)}`}
                      className="text-success"
                    />
                  )}
                  <div className="border-t border-border pt-2 flex justify-between font-heading font-bold text-[20px] tracking-tighter2">
                    <span>Total</span>
                    <span>{formatPrice(totals.total)}</span>
                  </div>
                </div>

                <div className="px-4 pb-4 space-y-2">
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 bg-lime hover:bg-limeHover text-ink font-bold text-[15px] h-[52px] rounded-pill transition-colors duration-150"
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full text-sm text-muted hover:text-ink transition-colors duration-150 py-3"
                  >
                    Continue Shopping
                  </button>
                  <div className="text-[11px] text-muted2 text-center pt-1">
                    🔒 Secure checkout · EcoCash · PayPal · Card
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex justify-between ${className ?? ""}`}>
      <span className="text-muted">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
