"use client";

import Link from "next/link";
import { Instagram, Facebook, MessageCircle, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <div className="px-4 md:px-5 pb-5 pt-12">
      <footer className="max-w-7xl mx-auto bg-white rounded-cardLg shadow-card overflow-hidden">
        <div className="p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-heading font-extrabold text-[22px] text-ink tracking-tighter2">
              ShopZim
            </div>
            <p className="text-muted mt-2 text-sm">
              Zimbabwe's favourite online store
            </p>
            <p className="text-sm mt-3 text-ink">🇿🇼 Proudly Zimbabwean</p>
            <div className="flex gap-2 mt-5">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: MessageCircle, label: "WhatsApp" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-pill bg-page text-ink flex items-center justify-center hover:bg-lime transition-colors duration-150"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex items-center gap-2 bg-page rounded-pill pl-4 pr-1.5 py-1.5"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted2 outline-none"
              />
              <button
                aria-label="Subscribe"
                className="w-8 h-8 bg-lime hover:bg-limeHover rounded-pill flex items-center justify-center transition-colors duration-150"
              >
                <ArrowRight size={14} className="text-ink" />
              </button>
            </form>
          </div>

          <FooterCol
            title="Shop"
            links={[
              ["New Arrivals", "/shop?sort=newest"],
              ["Women's", "/shop?category=women"],
              ["Men's", "/shop?category=men"],
              ["Home & Living", "/shop?category=home"],
              ["Beauty", "/shop?category=beauty"],
              ["Sale", "/shop?sale=true"],
            ]}
          />
          <FooterCol
            title="Help"
            links={[
              ["FAQs", "#"],
              ["Shipping", "#"],
              ["Returns", "#"],
              ["Size Guide", "#"],
              ["Track Order", "#"],
              ["Contact", "#"],
            ]}
          />
          <FooterCol
            title="About"
            links={[
              ["About ShopZim", "/about"],
              ["Careers", "#"],
              ["Blog", "#"],
              ["Terms", "#"],
              ["Privacy", "#"],
            ]}
          />
        </div>

        <div className="border-t border-border px-6 md:px-10 py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-muted">
          <div>© {new Date().getFullYear()} ShopZim. All rights reserved.</div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["EcoCash", "OneMoney", "PayPal", "Visa", "Mastercard"].map(
              (p) => (
                <span
                  key={p}
                  className="bg-page text-ink px-2.5 py-1 rounded-[8px] font-medium"
                >
                  {p}
                </span>
              )
            )}
          </div>
          <div>
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
  return (
    <div>
      <div className="font-heading font-bold mb-4 text-ink text-[15px]">
        {title}
      </div>
      <ul className="space-y-2.5 text-sm text-muted">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="hover:text-ink transition-colors duration-150"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
