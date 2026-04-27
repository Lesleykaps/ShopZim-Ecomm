"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, ShoppingBag } from "lucide-react";
import { useCart, useWishlist } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const setDrawerOpen = useCart((s) => s.setDrawerOpen);
  const wishlistIds = useWishlist((s) => s.ids);

  const cartCount = items.reduce((a, i) => a + i.quantity, 0);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[#E2E8F0] h-16 flex items-stretch shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      <Tab
        href="/"
        active={isActive("/")}
        icon={<Home size={20} />}
        label="Home"
      />
      <Tab
        href="/shop"
        active={pathname.startsWith("/shop")}
        icon={<LayoutGrid size={20} />}
        label="Shop"
      />
      <Tab
        href="/wishlist"
        active={isActive("/wishlist")}
        icon={<Heart size={20} />}
        label="Saved"
        badge={wishlistIds.length}
      />
      <button
        onClick={() => setDrawerOpen(true)}
        className="flex-1 flex flex-col items-center justify-center gap-1 text-[10px] relative text-muted2 font-medium"
      >
        <ShoppingBag size={20} />
        Cart
        {cartCount > 0 && (
          <span className="absolute top-2.5 right-1/2 translate-x-3.5 bg-lime text-ink text-[9px] font-bold rounded-pill min-w-[16px] h-4 flex items-center justify-center px-1">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}

function Tab({
  href,
  icon,
  label,
  active,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex-1 flex flex-col items-center justify-center gap-1 text-[10px] relative transition-colors duration-150 font-medium",
        active ? "text-lime" : "text-muted2"
      )}
    >
      {icon}
      {label}
      {badge ? (
        <span className="absolute top-2.5 right-1/2 translate-x-3.5 bg-lime text-ink text-[9px] font-bold rounded-pill min-w-[16px] h-4 flex items-center justify-center px-1">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
