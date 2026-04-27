"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Heart, Star, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getProduct, products, categoryLabels } from "@/lib/products";
import { categoryGradient, cn, formatPrice, productImage } from "@/lib/utils";
import { useCart, useWishlist } from "@/lib/store";
import { useToast } from "@/lib/toast";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const product = getProduct(params.slug);
  const add = useCart((s) => s.add);
  const setDrawerOpen = useCart((s) => s.setDrawerOpen);
  const toggleFav = useWishlist((s) => s.toggle);
  const isFav = useWishlist((s) => s.ids.includes(product?.id ?? -1));
  const push = useToast((s) => s.push);

  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [colour, setColour] = useState(product?.colours[0] ?? "");
  const [qty, setQty] = useState(1);
  const [thumbIdx, setThumbIdx] = useState(0);
  const [openDelivery, setOpenDelivery] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);

  const related = useMemo(
    () => (product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : []),
    [product]
  );

  if (!product) {
    return (
      <div className="p-12 text-center">
        <div className="text-lg">Product not found.</div>
        <Link href="/shop" className="text-ink underline mt-2 inline-block">Back to Shop →</Link>
      </div>
    );
  }

  const onSale = !!product.originalPrice;
  const savings = onSale ? (product.originalPrice! - product.price) : 0;
  const savingsPct = onSale ? Math.round((savings / product.originalPrice!) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-28 md:pb-10">
      <nav className="text-[10px] sm:text-xs text-muted mb-4 truncate">
        <Link href="/" className="hover:text-ink">Home</Link>
        {" › "}
        <Link href={`/shop?category=${product.category}`} className="hover:text-ink capitalize">
          {categoryLabels[product.category]}
        </Link>
        {" › "}
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-10">
        {/* Gallery */}
        <div>
          <div className="bg-white rounded-[16px] md:rounded-cardLg shadow-card p-3 md:p-6">
          <div className="aspect-[4/5] rounded-card overflow-hidden bg-surface2 relative">
            <div
              className="absolute inset-0"
              style={{ background: categoryGradient(product.category) }}
            />
            <motion.div
              key={thumbIdx + colour}
              initial={{ opacity: 0.6, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={productImage(`${product.slug}-${thumbIdx}`, 1000, 1250)}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>
            {/* Floating dots */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-8 left-8 w-3 h-3 rounded-pill bg-lime shadow-soft" />
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-14 right-8 w-2.5 h-2.5 rounded-pill bg-[#2563EB]" />
            {onSale && (
              <span className="absolute top-4 left-4 bg-lime text-ink font-bold text-[10px] px-3 py-1 rounded-pill tracking-wider">
                SALE
              </span>
            )}
          </div>
          <div className="hidden md:grid mt-3 grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setThumbIdx(i)}
                className={cn(
                  "aspect-square rounded-card overflow-hidden border-2 relative bg-surface2",
                  thumbIdx === i ? "border-lime" : "border-border"
                )}
              >
                <Image
                  src={productImage(`${product.slug}-${i}`, 200, 200)}
                  alt=""
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-[16px] md:rounded-cardLg shadow-card p-5 md:p-8">
          <h1 className="font-heading font-extrabold text-xl md:text-3xl lg:text-4xl text-ink tracking-tightest leading-tight">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Star size={14} className="fill-lime text-lime" />
            <span className="font-semibold text-ink">{product.rating}</span>
            <span className="text-muted">({product.reviews} reviews)</span>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-heading text-2xl md:text-[32px] font-bold tracking-tighter2 text-ink">{formatPrice(product.price)}</span>
            {onSale && (
              <span className="text-muted line-through">{formatPrice(product.originalPrice!)}</span>
            )}
          </div>
          {onSale && (
            <div className="mt-2 text-ink text-xs font-bold bg-lime inline-block px-3 py-1 rounded-pill tracking-wider">
              SAVE {formatPrice(savings)} ({savingsPct}% OFF)
            </div>
          )}

          {/* Size */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2 text-sm">
              <div>
                <span className="text-muted">Size:</span>{" "}
                <span className="font-semibold">{size}</span>
              </div>
              <button className="text-ink text-xs font-semibold hover:text-muted underline underline-offset-2">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-[44px] min-h-[44px] px-4 rounded-pill border text-sm font-medium transition-colors duration-150",
                    s === size ? "bg-lime text-ink border-lime" : "bg-page border-transparent text-ink hover:border-ink"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colour */}
          <div className="mt-5">
            <div className="text-sm mb-2">
              <span className="text-muted">Colour:</span>{" "}
              <span className="font-semibold">{colour}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.colours.map((c, i) => (
                <button
                  key={c}
                  onClick={() => { setColour(c); setThumbIdx(i % 4); }}
                  className={cn(
                    "w-10 h-10 md:w-9 md:h-9 rounded-pill border-2 flex items-center justify-center text-[10px] font-bold",
                    c === colour ? "border-lime" : "border-border"
                  )}
                    style={{ background: categoryGradient(product.category), filter: `hue-rotate(${i * 30}deg)` }}
                  aria-label={c}
                >
                  {c.length <= 3 ? c : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted">Qty:</span>
            <div className="inline-flex items-center bg-page rounded-pill text-ink h-12">
              <button className="w-12 h-12 flex items-center justify-center hover:text-lime" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
              <span className="px-3 font-bold min-w-[28px] text-center">{qty}</span>
              <button className="w-12 h-12 flex items-center justify-center hover:text-lime" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase">+</button>
            </div>
            <span className="text-success text-xs font-bold tracking-wider inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-pill bg-success"/> In stock — only 4 left!</span>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                add(product, size, colour, qty);
                push({ message: "✓ Added to cart", variant: "success" });
                setDrawerOpen(true);
              }}
              className="w-full bg-lime hover:bg-limeHover text-ink font-bold h-[52px] rounded-pill transition-colors duration-150"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                add(product, size, colour, qty);
                router.push("/checkout");
              }}
              className="w-full bg-ink hover:bg-ink/90 text-white font-bold h-[52px] rounded-pill transition-colors duration-150"
            >
              Buy Now
            </button>
            <button
              onClick={() => {
                toggleFav(product.id);
                push({
                  message: isFav ? "Removed from wishlist" : "♡ Added to wishlist",
                  variant: isFav ? "neutral" : "info",
                });
              }}
              className="text-sm text-muted hover:text-ink transition-colors inline-flex items-center justify-center gap-2 mt-1"
            >
              <Heart size={14} className={cn(isFav && "fill-red-500 text-red-500")} />
              {isFav ? "Saved to Wishlist" : "Save to Wishlist"}
            </button>
          </div>

          {/* Accordions */}
          <Accordion title="🚚 Delivery & Returns" open={openDelivery} setOpen={setOpenDelivery}>
            Free delivery on orders over $50. Standard delivery 3–5 days. Express delivery available.
            30-day return policy.
          </Accordion>
          <Accordion title="📋 Product Details" open={openDetails} setOpen={setOpenDetails}>
            Material: premium-quality fabric. Care: machine wash cold, line dry. Origin: Designed in
            Zimbabwe, ethically sourced.
          </Accordion>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-10 md:mt-16">
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-ink tracking-tightest">Reviews</h2>
        <div className="mt-2 flex items-center gap-3">
          <div className="text-3xl font-bold text-ink">{product.rating}</div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={cn(i < Math.round(product.rating) ? "fill-lime text-lime" : "text-border")}
              />
            ))}
          </div>
          <span className="text-sm text-muted">({product.reviews} reviews)</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-5">
          {[
            { name: "Tariro M.", rating: 5, date: "2 weeks ago", text: "Quality is amazing and delivery was fast. Will buy again!" },
            { name: "Tendai K.", rating: 4, date: "1 month ago", text: "Beautiful piece. Fits true to size and feels premium." },
            { name: "Rumbi N.", rating: 5, date: "1 month ago", text: "Loved the packaging and the product. Highly recommend." },
          ].map((r) => (
            <div key={r.name} className="bg-white rounded-card shadow-soft p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm">{r.name}</div>
                <div className="text-xs text-muted">{r.date}</div>
              </div>
              <div className="flex mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={cn(i < r.rating ? "fill-lime text-lime" : "text-border")} />
                ))}
              </div>
              <p className="mt-2 text-sm text-muted">{r.text}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full sm:w-auto bg-white rounded-pill px-5 h-12 text-sm font-semibold text-ink shadow-soft hover:shadow-card transition-shadow duration-200">
          Write a Review
        </button>
      </section>

      {/* Related */}
      <section className="mt-10 md:mt-16">
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl mb-4 md:mb-6 text-ink tracking-tightest">You Might Also Like</h2>
        {/* Mobile: peek scroll. Desktop: 4-col grid. */}
        <div className="-mx-4 sm:mx-0">
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-hide px-4 sm:px-0">
            {related.map((p) => (
              <div
                key={p.id}
                className="snap-start shrink-0 w-[68%] sm:w-auto"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile add-to-cart bar */}
      <div className="md:hidden fixed bottom-16 inset-x-0 z-40 bg-white border-t border-[#E2E8F0] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] h-[72px] flex items-center px-4 gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-muted">Total</div>
          <div className="font-heading font-bold text-ink text-lg tracking-tighter2">{formatPrice(product.price * qty)}</div>
        </div>
        <button
          onClick={() => {
            add(product, size, colour, qty);
            push({ message: "✓ Added to cart", variant: "success" });
            setDrawerOpen(true);
          }}
          className="shrink-0 bg-lime hover:bg-limeHover text-ink font-bold h-12 px-6 rounded-pill text-sm transition-colors duration-150"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function Accordion({
  title,
  open,
  setOpen,
  children,
}: {
  title: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 bg-surface2 rounded-[14px] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm font-semibold p-4"
      >
        {title}
        <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="text-sm text-muted px-4 pb-4">{children}</div>}
    </div>
  );
}
