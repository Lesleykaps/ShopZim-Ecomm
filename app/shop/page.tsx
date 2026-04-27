"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLOURS = [
  { name: "Navy", hex: "#0F172A" },
  { name: "Red", hex: "#dc2626" },
  { name: "Beige", hex: "#d6c7a3" },
  { name: "White", hex: "#ffffff" },
  { name: "Sage", hex: "#84a98c" },
  { name: "Pink", hex: "#fb7185" },
];

function ShopInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = sp.get("category");
  const sale = sp.get("sale");
  const sort = sp.get("sort") ?? "newest";
  const minPrice = Number(sp.get("minPrice") ?? 0);
  const maxPrice = Number(sp.get("maxPrice") ?? 200);
  const sizes = sp.get("sizes")?.split(",").filter(Boolean) ?? [];
  const inStock = sp.get("inStock") === "true";
  const minRating = Number(sp.get("minRating") ?? 0);

  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(sp.toString());
    if (value === null || value === "") params.delete(key);
    else params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, [sp]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (sale === "true") list = list.filter((p) => p.badge === "SALE" || p.originalPrice);
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (inStock) list = list.filter((p) => p.inStock);
    if (minRating) list = list.filter((p) => p.rating >= minRating);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "bestselling": list.sort((a, b) => b.reviews - a.reviews); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => b.id - a.id);
    }
    return list;
  }, [category, sale, sort, minPrice, maxPrice, sizes.join(","), inStock, minRating]);

  const FilterPanel = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="font-heading font-bold text-ink tracking-tighter2 text-lg">Filters</div>
        <button
          onClick={() => router.replace(pathname)}
          className="text-xs text-ink font-semibold underline underline-offset-2 hover:text-muted"
        >
          Clear all
        </button>
      </div>

      <Section title="Category">
        {[
          ["", "All"],
          ["women", "Women's"],
          ["men", "Men's"],
          ["home", "Home & Living"],
          ["beauty", "Beauty"],
        ].map(([val, label]) => (
          <label key={label} className="flex items-center gap-2 text-sm py-1">
            <input
              type="radio"
              name="category"
              checked={(category ?? "") === val}
              onChange={() => setParam("category", val || null)}
            />
            {label}
          </label>
        ))}
      </Section>

      <Section title={`Price: $${minPrice} – $${maxPrice}`}>
        <input
          type="range"
          min={0}
          max={200}
          value={maxPrice}
          onChange={(e) => setParam("maxPrice", e.target.value)}
          className="w-full"
        />
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const active = sizes.includes(s);
            return (
              <button
                key={s}
                onClick={() => {
                  const next = active ? sizes.filter((x) => x !== s) : [...sizes, s];
                  setParam("sizes", next.join(",") || null);
                }}
                className={cn(
                  "px-3 py-1 rounded-pill border text-xs",
                  active ? "bg-lime text-ink border-lime" : "border-border text-ink hover:border-ink"
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Colour">
        <div className="flex gap-2 flex-wrap">
          {COLOURS.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-7 h-7 rounded-pill border border-border cursor-pointer"
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </Section>

      <Section title="Availability">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setParam("inStock", e.target.checked ? "true" : null)}
          />
          In stock only
        </label>
      </Section>

      <Section title="Rating">
        {[3, 4, 5].map((r) => (
          <label key={r} className="flex items-center gap-2 text-sm py-1">
            <input
              type="radio"
              name="rating"
              checked={minRating === r}
              onChange={() => setParam("minRating", r === 0 ? null : String(r))}
            />
            {r}★ & up
          </label>
        ))}
      </Section>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-ink tracking-tightest">
          Shop {category ? `· ${category}` : ""}
        </h1>
        <button
          onClick={() => setDrawerOpen(true)}
          className="md:hidden inline-flex items-center bg-white rounded-pill px-4 py-2 text-sm text-ink shadow-soft"
        >
          <SlidersHorizontal size={14} /> Filter & Sort
        </button>
      </div>

      <div className="flex gap-6">
        <aside className="hidden md:block w-64 shrink-0"><div className="bg-white rounded-card shadow-card p-5 sticky top-24">{FilterPanel}</div></aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted">
              Showing {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </div>
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className="bg-white rounded-pill px-3 py-2 text-sm text-ink shadow-soft border-none outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="bestselling">Best Selling</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rounded-card overflow-hidden bg-white shadow-soft">
                  <div className="aspect-[4/5] shimmer" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 shimmer rounded" />
                    <div className="h-3 w-2/3 shimmer rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted">
              No products found. Try adjusting your filters.
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence>
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.4) }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-0 inset-x-0 bg-white rounded-t-cardLg p-5 max-h-[85vh] overflow-y-auto text-ink"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-heading font-bold text-ink tracking-tighter2">Filter & Sort</div>
                <button onClick={() => setDrawerOpen(false)} className="w-9 h-9 bg-page rounded-pill flex items-center justify-center"><X size={16} /></button>
              </div>
              {FilterPanel}
              <button
                onClick={() => setDrawerOpen(false)}
                className="mt-6 w-full bg-lime hover:bg-limeHover text-ink font-bold py-3.5 rounded-pill transition-colors duration-150"
              >
                Apply Filters
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-muted mb-3 font-semibold">{title}</div>
      {children}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-muted">Loading...</div>}>
      <ShopInner />
    </Suspense>
  );
}
