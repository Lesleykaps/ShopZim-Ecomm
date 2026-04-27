"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type LastOrder = {
  id: string;
  details: { firstName: string; lastName: string; email: string; addressLine1: string; city: string };
  items: { product: { name: string }; quantity: number }[];
  totals: { total: number };
};

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("shopzim-last-order");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  const id = order?.id ?? "SZ-00142";
  const name = order?.details.firstName ?? "Friend";

  return (
    <div className="max-w-xl mx-auto px-4 md:px-6 py-16">
    <div className="bg-white rounded-cardLg shadow-card p-8 md:p-10 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="w-24 h-24 rounded-pill bg-lime mx-auto flex items-center justify-center mb-6 shadow-card text-ink"
      >
        <motion.svg
          viewBox="0 0 24 24"
          width="48"
          height="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 12 L10 17 L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>

      <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-ink tracking-tightest">Order Confirmed! 🎉</h1>
      <div className="inline-block mt-3 bg-lime text-ink font-bold px-4 py-1.5 rounded-pill text-sm tracking-wider">#{id}</div>
      <p className="text-muted mt-3">
        Thanks {name}! Your order <strong>#{id}</strong> has been confirmed and will be delivered in
        3–5 business days.
      </p>

      {order && (
        <div className="bg-surface2 rounded-card p-5 mt-8 text-left">
          <div className="font-heading font-bold mb-3 text-ink tracking-tighter2">Order Details</div>
          <ul className="text-sm divide-y divide-border">
            {order.items.map((it, i) => (
              <li key={i} className="flex justify-between py-2">
                <span>{it.product.name} × {it.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-3 pt-3 border-t border-border font-bold">
            <span>Total</span>
            <span>${order.totals.total.toFixed(2)}</span>
          </div>
          <div className="mt-3 text-sm text-muted">
            Delivering to: {order.details.addressLine1}, {order.details.city}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button disabled className="px-5 py-3 rounded-pill bg-page text-muted2 font-semibold cursor-not-allowed">
          Track Your Order
        </button>
        <Link href="/shop" className="px-5 py-3 rounded-pill bg-lime hover:bg-limeHover text-ink font-bold transition-colors duration-150">
          Continue Shopping
        </Link>
      </div>

      <div className="mt-6 text-xs text-muted">
        💬 We'll send order updates to your WhatsApp.
      </div>
    </div>
    </div>
  );
}
