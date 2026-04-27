"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = {
  id: number;
  product: Product;
  size: string;
  colour: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (p: Product, size?: string, colour?: string, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  promo: string | null;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
};

export const cartKey = (i: { id: number; size: string; colour: string }) =>
  `${i.id}-${i.size}-${i.colour}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      promo: null,
      add: (p, size = "default", colour = p.colours[0] ?? "default", qty = 1) =>
        set((s) => {
          const key = cartKey({ id: p.id, size, colour });
          const existing = s.items.find((i) => cartKey(i) === key);
          if (existing) {
            return {
              items: s.items.map((i) =>
                cartKey(i) === key ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return {
            items: [...s.items, { id: p.id, product: p, size, colour, quantity: qty }],
          };
        }),
      remove: (key) =>
        set((s) => ({ items: s.items.filter((i) => cartKey(i) !== key) })),
      setQty: (key, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            cartKey(i) === key ? { ...i, quantity: Math.max(1, Math.min(10, qty)) } : i
          ),
        })),
      clear: () => set({ items: [], promo: null }),
      setDrawerOpen: (v) => set({ drawerOpen: v }),
      applyPromo: (code) => {
        const ok = code.trim().toUpperCase() === "WELCOME10";
        if (ok) set({ promo: "WELCOME10" });
        return ok;
      },
      clearPromo: () => set({ promo: null }),
    }),
    { name: "shopzim-cart" }
  )
);

type WishlistState = {
  ids: number[];
  toggle: (id: number) => void;
  has: (id: number) => boolean;
  remove: (id: number) => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
    }),
    { name: "shopzim-wishlist" }
  )
);

export function cartCount(items: CartItem[]) {
  return items.reduce((a, i) => a + i.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((a, i) => a + i.quantity * i.product.price, 0);
}

export function cartTotals(items: CartItem[], promo: string | null) {
  const subtotal = cartSubtotal(items);
  const delivery = subtotal === 0 ? 0 : subtotal >= 50 ? 0 : 5;
  const discount = promo === "WELCOME10" ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal + delivery - discount);
  return { subtotal, delivery, discount, total };
}
