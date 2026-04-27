"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import Link from "next/link";

export default function TrendingCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const items = products.slice(0, 8);

  const scroll = (dir: 1 | -1) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="bg-white rounded-[14px] md:rounded-cardLg shadow-card p-4 md:p-7">
      <div className="flex items-end justify-between mb-4 md:mb-5 gap-3">
        <div>
          <div className="text-[11px] tracking-[0.2em] text-muted font-semibold uppercase mb-1.5">
            Trending Now
          </div>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-ink tracking-tighter2">
            What everyone's buying
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-semibold text-ink hover:text-muted transition-colors duration-150"
          >
            View All
          </Link>
          <button
            onClick={() => scroll(-1)}
            className="hidden md:flex w-10 h-10 rounded-pill bg-page hover:bg-[#E5E5E5] text-ink items-center justify-center transition-colors duration-150"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="hidden md:flex w-10 h-10 rounded-pill bg-ink text-white hover:bg-ink/90 items-center justify-center transition-colors duration-150"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1 -mx-4 md:-mx-7 px-4 md:px-7"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((p) => (
          <div
            key={p.id}
            className="snap-start shrink-0 w-[78%] sm:w-[45%] md:w-[31%] lg:w-[23%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
