"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { useWishlist, useCart } from "@/lib/store";
import { products } from "@/lib/products";
import { useToast } from "@/lib/toast";
import { categoryGradient, formatPrice, productImage } from "@/lib/utils";

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const remove = useWishlist((s) => s.remove);
  const add = useCart((s) => s.add);
  const push = useToast((s) => s.push);

  const items = products.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <Heart size={56} className="text-muted mx-auto mb-4" />
        <h1 className="font-heading font-extrabold text-4xl text-ink tracking-tightest">Your wishlist is empty</h1>
        <p className="text-muted mt-2">Tap the heart on any product to save it for later.</p>
        <Link href="/shop" className="inline-block mt-6 bg-lime hover:bg-limeHover text-ink px-6 py-3 rounded-pill font-bold transition-colors duration-150">
          Discover Products →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-ink tracking-tightest">My Wishlist ({items.length})</h1>
        <button className="text-sm bg-white shadow-soft px-4 py-2 rounded-pill text-ink hover:shadow-card transition-shadow duration-200">
          Share Wishlist
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded-card shadow-soft hover:shadow-card transition-shadow duration-200 overflow-hidden relative">
            <button
              onClick={() => remove(p.id)}
              className="absolute top-2 right-2 z-10 bg-white shadow-soft rounded-pill w-8 h-8 flex items-center justify-center text-ink hover:bg-red-500 hover:text-white transition-colors duration-150"
              aria-label="Remove"
            >
              <X size={14} />
            </button>
            <Link href={`/shop/${p.slug}`} className="block aspect-[4/5] relative overflow-hidden" style={{ background: categoryGradient(p.category) }}>
              <Image
                src={productImage(p.slug, 600, 750)}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </Link>
            <div className="p-3">
              <div className="text-[10px] uppercase text-muted tracking-[0.2em] font-semibold">{p.category}</div>
              <div className="font-heading font-bold text-[15px] mt-1 line-clamp-2 min-h-[2.5em] text-ink tracking-tighter2">{p.name}</div>
              <div className="font-bold mt-1 text-ink">{formatPrice(p.price)}</div>
              <button
                onClick={() => {
                  add(p, p.sizes[0], p.colours[0], 1);
                  remove(p.id);
                  push({ message: "✓ Moved to cart", variant: "success" });
                }}
                className="mt-3 w-full bg-lime hover:bg-limeHover text-ink text-sm font-bold py-2.5 rounded-pill transition-colors duration-150"
              >
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
