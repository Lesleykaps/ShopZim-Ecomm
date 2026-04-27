"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const FILTERS: { value: string; label: string }[] = [
  { value: "", label: "All" },
  { value: "women", label: "Women's" },
  { value: "men", label: "Men's" },
  { value: "home", label: "Home" },
  { value: "beauty", label: "Beauty" },
  { value: "sale", label: "Sale" },
];

const SORTS: { value: string; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "bestselling", label: "Best Selling" },
  { value: "rating", label: "Highest Rated" },
];

function ShopInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = sp.get("category") ?? "";
  const sale = sp.get("sale") === "true";
  const sort = sp.get("sort") ?? "newest";

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(sp.toString());
    if (value === null || value === "") params.delete(key);
    else params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const activeFilter = sale ? "sale" : category;

  const setFilter = (val: string) => {
    const params = new URLSearchParams();
    if (val === "sale") params.set("sale", "true");
    else if (val) params.set("category", val);
    if (sort && sort !== "newest") params.set("sort", sort);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (sale) list = list.filter((p) => p.badge === "SALE" || p.originalPrice);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "bestselling":
        list.sort((a, b) => b.reviews - a.reviews);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.id - a.id);
    }
    return list;
  }, [category, sale, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-ink tracking-tightest">
            Shop
          </h1>
          <p className="text-sm text-muted mt-1">
            {filtered.length} product{filtered.length === 1 ? "" : "s"}
          </p>
        </div>
        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value)}
          className="bg-white rounded-pill px-4 py-2.5 text-sm text-ink shadow-soft border-none outline-none cursor-pointer hover:shadow-card transition-shadow duration-200"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => {
          const active = activeFilter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "px-5 py-2.5 rounded-pill text-sm font-medium transition-all duration-150",
                active
                  ? "bg-ink text-white shadow-card"
                  : "bg-white text-ink shadow-soft hover:shadow-card"
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted">
          No products found. Try a different filter.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: Math.min(i * 0.03, 0.3),
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-ink tracking-tightest">
            Shop
          </h1>
        </div>
      }
    >
      <ShopInner />
    </Suspense>
  );
}
