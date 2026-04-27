import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}

export function categoryGradient(category: string) {
  switch (category) {
    case "women":
      return "linear-gradient(135deg,#FFE4E1 0%,#FBCFE8 60%,#F9A8D4 100%)";
    case "men":
      return "linear-gradient(135deg,#E0E7FF 0%,#C7D2FE 60%,#A5B4FC 100%)";
    case "home":
      return "linear-gradient(135deg,#FEF3C7 0%,#FDE68A 60%,#FCD34D 100%)";
    case "beauty":
      return "linear-gradient(135deg,#F5F3FF 0%,#E9D5FF 60%,#D8B4FE 100%)";
    default:
      return "linear-gradient(135deg,#F7F7F5,#E5E5E5)";
  }
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Stable, seeded random image per product / per slot.
// Uses picsum.photos with a deterministic seed so the same product always
// shows the same image across renders.
export function productImage(seed: string | number, w = 800, h = 1000) {
  return `https://picsum.photos/seed/shopzim-${seed}/${w}/${h}`;
}

// Themed lifestyle image (used for hero, category cards, lookbook tiles).
// loremflickr lets us pass tags so we get vaguely relevant imagery.
export function themedImage(
  tags: string,
  seed: string | number,
  w = 1200,
  h = 1200
) {
  const safe = encodeURIComponent(tags);
  return `https://loremflickr.com/${w}/${h}/${safe}/?lock=${seed}`;
}
