"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  // Hydrate from sessionStorage so the bar stays hidden during the visit.
  useEffect(() => {
    if (sessionStorage.getItem("shopzim-announcement-dismissed") === "1") {
      setDismissed(true);
    }
  }, []);

  if (dismissed) return null;

  const text =
    "🚚 Free delivery on orders over $50  ·  Use code WELCOME10 for 10% off your first order";

  // Two copies (one visible, one trailing) is required for a seamless
  // CSS translateX(-50%) loop — visually it reads as a single continuous strip.
  return (
    <div className="relative bg-ink text-white text-[11px] md:text-xs overflow-hidden h-8 md:h-9 flex items-center px-4">
      <div className="flex whitespace-nowrap w-max animate-marquee min-w-full">
        <span className="px-12">{text}</span>
        <span className="px-12" aria-hidden="true">
          {text}
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          sessionStorage.setItem("shopzim-announcement-dismissed", "1");
          setDismissed(true);
        }}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-white/80 hover:text-white bg-ink"
      >
        <X size={14} />
      </button>
    </div>
  );
}
