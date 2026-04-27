"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Instagram,
  Facebook,
  MessageCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const cols: { title: string; links: [string, string][] }[] = [
  {
    title: "Shop",
    links: [
      ["New Arrivals", "/shop?sort=newest"],
      ["Women's", "/shop?category=women"],
      ["Men's", "/shop?category=men"],
      ["Home & Living", "/shop?category=home"],
      ["Beauty", "/shop?category=beauty"],
      ["Sale", "/shop?sale=true"],
    ],
  },
  {
    title: "Help",
    links: [
      ["FAQs", "#"],
      ["Shipping", "#"],
      ["Returns", "#"],
      ["Size Guide", "#"],
      ["Track Order", "#"],
      ["Contact", "#"],
    ],
  },
  {
    title: "About",
    links: [
      ["About ShopZim", "/about"],
      ["Careers", "#"],
      ["Blog", "#"],
      ["Terms", "#"],
      ["Privacy", "#"],
    ],
  },
];

export default function Footer() {
  return (
    <div className="px-3 md:px-5 pb-5 pt-12">
      <footer className="max-w-7xl mx-auto bg-white rounded-t-[24px] md:rounded-cardLg md:shadow-card overflow-hidden">
        <div className="px-5 py-10 md:p-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand column */}
          <div className="text-center md:text-left">
            <div className="font-heading font-extrabold text-[22px] text-ink tracking-tighter2">
              ShopZim
            </div>
            <p className="text-muted mt-2 text-sm">
              Zimbabwe's favourite online store
            </p>
            <p className="text-sm mt-3 text-ink">🇿🇼 Proudly Zimbabwean</p>
            <div className="flex gap-3 mt-5 justify-center md:justify-start">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: MessageCircle, label: "WhatsApp" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-pill bg-page text-ink flex items-center justify-center hover:bg-lime transition-colors duration-150"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-page rounded-pill px-4 h-11 text-sm text-ink placeholder:text-muted2 outline-none border-0"
              />
              <button
                type="submit"
                className="h-11 px-5 bg-lime hover:bg-limeHover rounded-pill flex items-center justify-center gap-2 text-ink font-semibold text-sm transition-colors duration-150"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>

          {cols.map((c) => (
            <FooterCol key={c.title} title={c.title} links={c.links} />
          ))}
        </div>

        {/* Bottom strip */}
        <div className="border-t border-border px-5 md:px-10 py-5 flex flex-col gap-4 md:flex-row items-center justify-between text-xs text-muted">
          <div className="text-center md:text-left text-[11px] md:text-xs">
            © {new Date().getFullYear()} ShopZim. All rights reserved.
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["EcoCash", "OneMoney", "PayPal", "Visa", "Mastercard"].map((p) => (
              <span
                key={p}
                className="bg-page text-ink text-[10px] md:text-xs px-2 py-1 rounded-[8px] font-medium"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="text-center md:text-right text-[11px] md:text-xs">
            Website by{" "}
            <a
              href="https://kapsmedia.co.zw"
              className="text-ink hover:text-lime font-semibold transition-colors duration-150"
            >
              Kaps Media · kapsmedia.co.zw
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border md:border-0 pb-3 md:pb-0">
      {/* Mobile: tappable accordion */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden w-full flex items-center justify-between py-2 font-heading font-bold text-ink text-[15px]"
      >
        {title}
        <ChevronDown
          size={16}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {/* Desktop: static heading */}
      <div className="hidden md:block font-heading font-bold mb-4 text-ink text-[15px]">
        {title}
      </div>
      <ul
        className={cn(
          "space-y-1 text-sm text-muted md:block",
          open ? "block" : "hidden"
        )}
      >
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="block py-2 hover:text-ink transition-colors duration-150"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
