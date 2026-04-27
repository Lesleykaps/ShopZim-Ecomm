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
      <Link href={`/shop/${product.slug}`} className="block p-2.5 md:p-3">
        <div className="relative rounded-[12px] md:rounded-[16px] bg-surface2 overflow-hidden aspect-square">
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
                "absolute top-2 left-2 md:top-3 md:left-3 text-[9px] md:text-[10px] font-bold px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-pill tracking-wider",
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
            className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-9 md:h-9 bg-white rounded-pill shadow-soft flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-150"
          >
            <Heart
              size={16}
              className={cn(
                "transition-colors duration-150",
                isFav ? "fill-red-500 text-red-500" : "text-ink"
              )}
            />
          </button>
          {/* Hover Add button — desktop only (mobile uses the inline button below) */}
          <button
            onClick={handleAdd}
            className="hidden md:block absolute left-3 right-3 bottom-3 bg-lime hover:bg-limeHover text-ink text-sm font-bold py-2.5 rounded-pill opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>

        <div className="px-1 pt-2.5 md:pt-3 pb-1">
          <div className="hidden sm:block text-[11px] uppercase text-muted tracking-wider">
            {product.category}
          </div>
          <div className="font-heading font-semibold sm:font-bold text-xs md:text-[14px] mt-0.5 line-clamp-2 min-h-[2.5em] text-ink tracking-tighter2 leading-snug">
            {product.name}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs">
            <Star size={12} className="fill-lime text-lime" />
            <span className="font-semibold text-ink">{product.rating}</span>
            <span className="hidden sm:inline text-muted">({product.reviews})</span>
          </div>
          <div className="mt-1.5 md:mt-2 flex items-baseline gap-2">
            <span className="font-bold text-sm md:text-base text-ink">{formatPrice(product.price)}</span>
            {onSale && (
              <span className="text-[11px] md:text-xs text-muted line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>
          {/* Mobile-visible add-to-cart button */}
          <button
            onClick={handleAdd}
            className="md:hidden mt-2 w-full bg-lime hover:bg-limeHover text-ink text-xs font-bold h-9 rounded-pill flex items-center justify-center gap-1.5 transition-colors duration-150"
          >
            <Plus size={12} /> Add to Cart
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
