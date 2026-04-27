import { slugify } from "./utils";

export type Product = {
  id: number;
  name: string;
  slug: string;
  category: "women" | "men" | "home" | "beauty";
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: "SALE" | "NEW" | "TRENDING" | "BESTSELLER";
  sizes: string[];
  colours: string[];
  inStock: boolean;
  trending?: boolean;
  description?: string;
};

const raw: Omit<Product, "slug">[] = [
  { id: 1, name: "Ankara Print Wrap Dress", category: "women", price: 45, originalPrice: 65, rating: 4.7, reviews: 128, badge: "SALE", sizes: ["XS","S","M","L","XL"], colours: ["Navy","Red","Green"], inStock: true, trending: true },
  { id: 2, name: "Floral Midi Dress", category: "women", price: 52, rating: 4.5, reviews: 89, sizes: ["S","M","L","XL"], colours: ["White","Pink"], inStock: true },
  { id: 3, name: "High-Waist Linen Trousers", category: "women", price: 38, rating: 4.6, reviews: 64, badge: "NEW", sizes: ["XS","S","M","L"], colours: ["Beige","Black"], inStock: true },
  { id: 4, name: "Woven Straw Tote Bag", category: "women", price: 29, rating: 4.8, reviews: 203, badge: "BESTSELLER", sizes: ["One Size"], colours: ["Natural","Black"], inStock: true },
  { id: 5, name: "Classic White Linen Shirt", category: "men", price: 32, rating: 4.6, reviews: 97, sizes: ["S","M","L","XL","XXL"], colours: ["White","Blue"], inStock: true },
  { id: 6, name: "Slim Fit Chino Trousers", category: "men", price: 38, originalPrice: 55, rating: 4.5, reviews: 74, badge: "SALE", sizes: ["30","32","34","36"], colours: ["Khaki","Navy"], inStock: true },
  { id: 7, name: "African Print Bucket Hat", category: "men", price: 18, rating: 4.9, reviews: 156, badge: "TRENDING", sizes: ["S/M","L/XL"], colours: ["Multi"], inStock: true },
  { id: 8, name: "Polo Shirt 3-Pack", category: "men", price: 55, rating: 4.4, reviews: 42, sizes: ["S","M","L","XL"], colours: ["White/Navy/Grey"], inStock: true },
  { id: 9, name: "Woven Rattan Basket Set", category: "home", price: 28, rating: 4.7, reviews: 118, badge: "TRENDING", sizes: ["Set of 3"], colours: ["Natural"], inStock: true },
  { id: 10, name: "Ceramic Mug Set (4 pcs)", category: "home", price: 24, rating: 4.8, reviews: 86, sizes: ["4-piece set"], colours: ["White","Terracotta"], inStock: true },
  { id: 11, name: "Linen Duvet Cover Set", category: "home", price: 68, rating: 4.6, reviews: 51, sizes: ["Double","Queen","King"], colours: ["White","Sage"], inStock: true },
  { id: 12, name: "Handmade Scented Candle", category: "home", price: 15, rating: 4.9, reviews: 234, badge: "BESTSELLER", sizes: ["One Size"], colours: ["Amber Jar"], inStock: true },
  { id: 13, name: "Shea Butter Body Lotion 250ml", category: "beauty", price: 18, rating: 4.8, reviews: 312, badge: "BESTSELLER", sizes: ["250ml","500ml"], colours: ["N/A"], inStock: true },
  { id: 14, name: "Natural Hair Growth Oil", category: "beauty", price: 22, originalPrice: 30, rating: 4.7, reviews: 189, badge: "SALE", sizes: ["100ml"], colours: ["N/A"], inStock: true },
  { id: 15, name: "Baobab Face Serum", category: "beauty", price: 35, rating: 4.6, reviews: 78, badge: "NEW", sizes: ["30ml"], colours: ["N/A"], inStock: true },
  { id: 16, name: "Charcoal Teeth Whitening Kit", category: "beauty", price: 25, rating: 4.5, reviews: 143, sizes: ["One Size"], colours: ["N/A"], inStock: true },
];

export const products: Product[] = raw.map((p) => ({ ...p, slug: slugify(p.name) }));

export const categoryLabels: Record<Product["category"], string> = {
  women: "Women's Fashion",
  men: "Men's Style",
  home: "Home & Living",
  beauty: "Beauty & Wellness",
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
