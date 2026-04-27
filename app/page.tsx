"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Heart,
  Truck,
  Lock,
  Package,
  Headphones,
  Flame,
  Instagram,
  Twitter,
} from "lucide-react";
import TrendingCarousel from "@/components/home/TrendingCarousel";
import { products } from "@/lib/products";
import { categoryGradient, formatPrice, productImage } from "@/lib/utils";

const bentoFade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export default function HomePage() {
  const featured = products[0];
  const trending1 = products[6];
  const trending2 = products[3];
  const trending3 = products[11];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-5 py-5 md:py-6 space-y-5">
      {/* ROW 1: Hero + Side stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* HERO CARD */}
        <motion.section
          {...bentoFade}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:col-span-8 bg-white rounded-cardLg shadow-card p-6 md:p-10 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 orb-lime pointer-events-none" />
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 items-center relative">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-1.5 bg-page rounded-pill px-3 py-1.5 text-[12px] font-medium text-ink">
                🛍️ Style is Everything
              </span>
              <h1 className="mt-5 font-heading font-extrabold text-ink text-[40px] sm:text-[48px] md:text-[56px] leading-[1.02] tracking-tightest">
                Discover.<br />Inspiring.<br />Fashion.
              </h1>

              <div className="mt-6 flex items-start gap-4">
                <div>
                  <div className="font-heading text-[48px] text-muted2/60 leading-none font-bold">
                    01
                  </div>
                </div>
                <div className="border-l border-border pl-4 pt-1">
                  <div className="font-heading font-bold text-ink text-sm">
                    Premium Style
                  </div>
                  <div className="text-xs text-muted mt-0.5">
                    Curated for Zimbabwe's trendsetters
                  </div>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-lime hover:bg-limeHover text-ink font-bold px-5 py-3 rounded-pill text-sm transition-colors duration-150"
                >
                  View All Products
                </Link>
                <Link
                  href="/shop"
                  aria-label="Go"
                  className="w-12 h-12 bg-ink text-white hover:bg-ink/90 rounded-pill flex items-center justify-center transition-colors duration-150"
                >
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <span className="text-xs text-muted">Follow us on:</span>
                <div className="flex gap-2">
                  {[Twitter, Instagram].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-8 h-8 bg-page rounded-pill flex items-center justify-center text-ink hover:bg-lime transition-colors duration-150"
                    >
                      <Icon size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: floating product */}
            <div className="relative h-[320px] md:h-[380px] overflow-visible">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 rounded-cardLg"
                style={{ background: categoryGradient(featured.category) }}
              />
              {/* Product image overflows the card upward for a 3D float effect */}
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-x-4 -top-10 bottom-4 product-float"
              >
                <Image
                  src={productImage(featured.slug, 800, 1000)}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
              {/* Floating decorative dots — lime 10px, blue 7px, grey 5px */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-8 rounded-pill bg-lime shadow-soft"
                style={{ width: 10, height: 10 }}
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-14 right-6 rounded-pill bg-[#2563EB]"
                style={{ width: 7, height: 7 }}
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-12 rounded-pill bg-muted2"
                style={{ width: 5, height: 5 }}
              />

              {/* Colour swatches */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {["#FB7185", "#C8FF00", "#1A1A1A"].map((c) => (
                  <span
                    key={c}
                    className="w-6 h-6 rounded-pill border-2 border-white shadow-soft"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <button
                aria-label="Next"
                className="absolute bottom-4 right-4 w-9 h-9 bg-white rounded-pill flex items-center justify-center shadow-soft text-ink"
              >
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </motion.section>

        {/* SIDE STACK */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          {/* Popular colors */}
          <motion.div
            {...bentoFade}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white rounded-card shadow-card p-5"
          >
            <div className="font-heading font-bold text-ink text-[15px] tracking-tighter2">
              Popular Colors
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {[
                "#2563EB",
                "#F97316",
                "#16A34A",
                "#FB7185",
                "#10B981",
                "#A855F7",
              ].map((c) => (
                <motion.span
                  key={c}
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 rounded-pill cursor-pointer shadow-soft"
                  style={{ background: c }}
                />
              ))}
            </div>
          </motion.div>

          {/* Featured product mini */}
          <motion.div
            {...bentoFade}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -3 }}
            className="bg-white rounded-card shadow-card p-4 relative overflow-hidden"
          >
            <div className="text-[11px] uppercase text-muted tracking-wider font-semibold">
              Featured
            </div>
            <div className="font-heading font-bold text-ink mt-0.5 tracking-tighter2 text-[15px]">
              {trending1.name}
            </div>
            <div
              className="mt-3 rounded-[14px] aspect-[4/3] relative overflow-hidden"
              style={{ background: categoryGradient(trending1.category) }}
            >
              <Image
                src={productImage(trending1.slug, 600, 450)}
                alt={trending1.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <Link
              href={`/shop/${trending1.slug}`}
              className="absolute bottom-4 right-4 w-9 h-9 bg-ink hover:bg-ink/90 text-white rounded-pill flex items-center justify-center transition-colors duration-150"
              aria-label="View"
            >
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Trending product */}
          <motion.div
            {...bentoFade}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -3 }}
            className="bg-white rounded-card shadow-card p-4 sm:col-span-2 lg:col-span-1 relative overflow-hidden"
          >
            <div
              className="rounded-[14px] aspect-[4/3] relative overflow-hidden"
              style={{ background: categoryGradient(trending2.category) }}
            >
              <Image
                src={productImage(trending2.slug, 600, 450)}
                alt={trending2.name}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
              <span className="absolute top-3 left-3 bg-white text-ink text-[10px] font-bold px-2.5 py-1 rounded-pill tracking-wider inline-flex items-center gap-1 z-10">
                <Star size={10} className="fill-lime text-lime" />
                {trending2.rating}
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between gap-2">
              <div className="min-w-0">
                <div className="font-heading font-bold text-ink text-[15px] tracking-tighter2 line-clamp-1">
                  {trending2.name}
                </div>
                <div className="text-xs text-muted mt-0.5">
                  Premium quality
                </div>
              </div>
              <Link
                href={`/shop/${trending2.slug}`}
                className="w-9 h-9 bg-lime hover:bg-limeHover rounded-pill flex items-center justify-center text-ink shrink-0 transition-colors duration-150"
                aria-label="View"
              >
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ROW 2: Info / feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* More products */}
        <motion.div
          {...bentoFade}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -3 }}
          className="bg-white rounded-card shadow-card p-5 relative"
        >
          <button
            aria-label="Wishlist"
            className="absolute top-4 right-4 w-8 h-8 rounded-pill bg-page flex items-center justify-center"
          >
            <Heart size={13} className="fill-red-500 text-red-500" />
          </button>
          <div className="font-heading font-bold text-ink text-[15px] tracking-tighter2">
            More Products
          </div>
          <div className="text-xs text-muted mt-0.5">460 plus items.</div>
          <div className="flex -space-x-2 mt-4">
            {products.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="w-11 h-11 rounded-pill border-2 border-white shadow-soft"
                style={{ background: categoryGradient(p.category) }}
              />
            ))}
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          {...bentoFade}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -3 }}
          className="bg-white rounded-card shadow-card p-5"
        >
          <div className="flex -space-x-2">
            {["#FB7185", "#2563EB", "#16A34A"].map((c, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-pill border-2 border-white shadow-soft"
                style={{
                  background: `linear-gradient(135deg, ${c}, #1A1A1A)`,
                }}
              />
            ))}
          </div>
          <div className="mt-3 inline-block bg-lime px-3 py-1 rounded-pill">
            <span className="font-heading font-extrabold text-[24px] text-ink leading-none tracking-tighter2">
              5m+
            </span>
          </div>
          <div className="text-xs text-muted mt-2">Downloads</div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <Star size={13} className="fill-lime text-lime" />
            <span className="font-semibold text-ink">4.6</span>
            <span className="text-muted text-xs">reviews</span>
          </div>
        </motion.div>

        {/* Popular release */}
        <motion.div
          {...bentoFade}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -3 }}
          className="bg-white rounded-card shadow-card p-5"
        >
          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-500 text-[11px] font-bold px-2.5 py-1 rounded-pill">
            <Flame size={12} /> Popular
          </span>
          <div className="font-heading font-bold text-ink text-[17px] mt-3 tracking-tighter2 leading-tight">
            Shopping Has Been Reimagined
          </div>
          <div className="flex -space-x-3 mt-4">
            {products.slice(4, 7).map((p) => (
              <div
                key={p.id}
                className="w-12 h-12 rounded-pill border-2 border-white shadow-soft"
                style={{ background: categoryGradient(p.category) }}
              />
            ))}
          </div>
        </motion.div>

        {/* Featured large */}
        <motion.div
          {...bentoFade}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -3 }}
          className="rounded-card shadow-card overflow-hidden relative min-h-[200px]"
          style={{ background: categoryGradient(trending3.category) }}
        >
          <Image
            src={productImage(trending3.slug, 600, 600)}
            alt={trending3.name}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
          <Link
            href={`/shop/${trending3.slug}`}
            className="absolute top-4 right-4 w-9 h-9 bg-white rounded-pill flex items-center justify-center text-ink shadow-soft z-10"
            aria-label="View"
          >
            <ArrowUpRight size={14} />
          </Link>
          <span className="absolute top-4 left-4 bg-white text-ink text-[10px] font-bold px-2.5 py-1 rounded-pill inline-flex items-center gap-1 z-10">
            <Star size={10} className="fill-lime text-lime" />
            {trending3.rating}
          </span>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <div className="font-heading font-bold text-white tracking-tighter2 line-clamp-1">
              {trending3.name}
            </div>
            <div className="text-xs text-white/70">Hand-poured, natural wax</div>
          </div>
        </motion.div>
      </div>

      {/* ROW 3: Trending carousel */}
      <motion.div
        {...bentoFade}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <TrendingCarousel />
      </motion.div>

      {/* ROW 4: Category grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {(
          [
            ["women", "Women's", "/shop?category=women"],
            ["men", "Men's", "/shop?category=men"],
            ["home", "Home & Living", "/shop?category=home"],
            ["beauty", "Beauty", "/shop?category=beauty"],
          ] as const
        ).map(([cat, label, href], i) => (
          <motion.div
            key={cat}
            {...bentoFade}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ y: -4 }}
          >
            <Link
              href={href}
              className="group block relative overflow-hidden rounded-card aspect-[4/5] shadow-card"
              style={{ background: categoryGradient(cat) }}
            >
              {/* Decorative blur orbs to add depth on the gradient */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-pill bg-white/40 blur-3xl group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-pill bg-white/30 blur-3xl" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/30 to-transparent flex items-end justify-between">
                <div className="font-heading font-extrabold text-ink text-xl md:text-2xl tracking-tighter2 drop-shadow">
                  {label}
                </div>
                <span className="w-9 h-9 bg-white rounded-pill flex items-center justify-center text-ink opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ROW 5: Trust badges */}
      <motion.div
        {...bentoFade}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-white rounded-card shadow-card p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { Icon: Truck, title: "Free Delivery", desc: "On orders over $50" },
          {
            Icon: Lock,
            title: "Secure Checkout",
            desc: "EcoCash · PayPal · Card",
          },
          {
            Icon: Package,
            title: "Easy Returns",
            desc: "30-day return policy",
          },
          {
            Icon: Headphones,
            title: "Local Support",
            desc: "Zimbabwe-based team",
          },
        ].map((t) => (
          <div key={t.title} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-pill bg-lime/20 text-ink flex items-center justify-center shrink-0">
              <t.Icon size={18} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <div className="font-heading font-bold text-ink text-sm tracking-tighter2">
                {t.title}
              </div>
              <div className="text-xs text-muted mt-0.5">{t.desc}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
