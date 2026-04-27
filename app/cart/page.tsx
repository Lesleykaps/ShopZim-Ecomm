"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { cartKey, cartTotals, useCart } from "@/lib/store";
import { categoryGradient, formatPrice, productImage } from "@/lib/utils";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const promo = useCart((s) => s.promo);
  const totals = cartTotals(items, promo);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <ShoppingBag size={56} className="text-muted mx-auto mb-4" />
        <h1 className="font-heading font-extrabold text-4xl text-ink tracking-tightest">Your cart is empty</h1>
        <p className="text-muted mt-2">Looks like you haven't added anything yet.</p>
        <Link href="/shop" className="inline-block mt-6 bg-lime hover:bg-limeHover text-ink px-6 py-3 rounded-pill font-bold transition-colors duration-150">
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid lg:grid-cols-[1fr_360px] gap-8">
      <div>
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-6 text-ink tracking-tightest">Your Cart</h1>
        <div className="space-y-4">
          {items.map((it) => {
            const k = cartKey(it);
            return (
              <div key={k} className="flex gap-4 bg-white rounded-card shadow-soft p-4">
                <div className="w-20 h-20 rounded-card shrink-0 relative overflow-hidden" style={{ background: categoryGradient(it.product.category) }}>
                  <Image
                    src={productImage(it.product.slug, 160, 160)}
                    alt={it.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{it.product.name}</div>
                  <div className="text-xs text-muted mt-0.5">Size: {it.size} · Colour: {it.colour}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-page rounded-pill">
                      <button className="p-1.5" onClick={() => setQty(k, it.quantity - 1)}><Minus size={12} /></button>
                      <span className="px-2 text-sm font-semibold">{it.quantity}</span>
                      <button className="p-1.5" onClick={() => setQty(k, it.quantity + 1)}><Plus size={12} /></button>
                    </div>
                    <div className="font-bold">{formatPrice(it.product.price * it.quantity)}</div>
                  </div>
                </div>
                <button onClick={() => remove(k)} className="text-muted hover:text-red-500 transition-colors duration-150 self-start">
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <aside className="bg-white rounded-cardLg shadow-card p-6 h-fit lg:sticky lg:top-24 space-y-2 text-sm">
        <div className="font-heading font-bold text-lg mb-3 text-ink tracking-tighter2">Order Summary</div>
        <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
        <Row label="Delivery" value={totals.delivery === 0 ? "FREE" : formatPrice(totals.delivery)} />
        {totals.discount > 0 && <Row label="Discount" value={`-${formatPrice(totals.discount)}`} className="text-success" />}
        <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
          <span>Total</span>
          <span>{formatPrice(totals.total)}</span>
        </div>
        <Link href="/checkout" className="block text-center bg-lime hover:bg-limeHover text-ink font-bold py-3.5 rounded-pill mt-3 transition-colors duration-150">
          Proceed to Checkout →
        </Link>
        <Link href="/shop" className="block text-center text-muted hover:text-ink transition-colors duration-150 text-sm">
          Continue Shopping
        </Link>
      </aside>
    </div>
  );
}

function Row({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`flex justify-between ${className ?? ""}`}>
      <span className="text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
