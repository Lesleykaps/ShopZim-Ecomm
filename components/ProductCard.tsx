"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { categoryGradient, cn, formatPrice, productImage } from "@/lib/utils";
import { useCart, useWishlist } from "@/lib/store";
import { useToast } from "@/lib/toast";

const badgeStyles: Record<string, string> = {
  SALE: "bg-lime text-ink",
  TRENDING: "bg-ink text-white",
  BESTSELLER: "bg-red-500 text-white",
  NEW: "bg-white text-ink border border-border",
};

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const wishlistIds = useWishlist((s) => s.ids);
  const isFav = wishlistIds.includes(product.id);
  const push = useToast((s) => s.push);

  const onSale = !!product.originalPrice;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product, product.sizes[0] ?? "default", product.colours[0] ?? "default", 1);
    push({ message: "Added to cart", variant: "success" });
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    push({
      message: isFav ? "Removed from wishlist" : "Saved to wishlist",
      variant: isFav ? "neutral" : "info",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-card shadow-soft hover:shadow-card transition-shadow duration-200 relative overflow-hidden"
    >
      <Link href={`/shop/${product.slug}`} className="block p-3">
        <div className="relative rounded-[16px] bg-surface2 overflow-hidden aspect-square">
          {/* Gradient backdrop (visible if image fails) */}
          <div
            className="absolute inset-0"
            style={{ background: categoryGradient(product.category) }}
          />
          <Image
            src={productImage(product.slug, 600, 600)}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={cn(
                "absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-pill tracking-wider",
                badgeStyles[product.badge]
              )}
            >
              {product.badge}
            </span>
          )}
          {/* Wishlist heart */}
          <button
            onClick={handleFav}
            aria-label="Toggle wishlist"
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-pill shadow-soft flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-150"
          >
            <Heart
              size={16}
              className={cn(
                "transition-colors duration-150",
                isFav ? "fill-red-500 text-red-500" : "text-ink"
              )}
            />
          </button>
          {/* Hover Add button */}
          <button
            onClick={handleAdd}
            className="absolute left-3 right-3 bottom-3 bg-lime hover:bg-limeHover text-ink text-sm font-bold py-2.5 rounded-pill opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>

        <div className="px-1 pt-3 pb-1">
          <div className="text-[11px] uppercase text-muted tracking-wider">
            {product.category}
          </div>
          <div className="font-heading font-bold text-[14px] mt-0.5 line-clamp-2 min-h-[2.5em] text-ink tracking-tighter2 leading-snug">
            {product.name}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs">
            <Star size={12} className="fill-lime text-lime" />
            <span className="font-semibold text-ink">{product.rating}</span>
            <span className="text-muted">({product.reviews})</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-ink">{formatPrice(product.price)}</span>
              {onSale && (
                <span className="text-xs text-muted line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>
            <button
              onClick={handleAdd}
              aria-label="Add to cart"
              className="md:hidden w-8 h-8 bg-ink rounded-pill flex items-center justify-center text-white"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
