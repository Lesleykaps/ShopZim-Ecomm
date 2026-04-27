# ShopZim — E-Commerce Demo

Modern fashion & lifestyle e-commerce store for Zimbabwe. Built with Next.js 14 (App Router), Tailwind CSS, Framer Motion, Zustand, React Hook Form + Zod, and TypeScript.

> Website by **Kaps Media · kapsmedia.co.zw**

## Tech stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, Framer Motion
- Zustand (cart + wishlist, persisted to localStorage)
- React Hook Form + Zod (checkout validation)
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Pages
- `/` — Home (hero, flash sale, featured categories, trending carousel, trust badges)
- `/shop` — Catalogue with filters (category, price, size, colour, rating, in-stock) + sort
- `/shop/[slug]` — Product detail (gallery, size/colour, quantity, reviews, related)
- `/cart` — Cart page (drawer also available globally)
- `/checkout` — 3-step checkout (Delivery → Method → Payment: EcoCash / OneMoney / PayPal)
- `/order-confirmation` — Animated success state with order details
- `/wishlist` — Saved items with "Move to Cart"
- `/about` — About page

## Features
- Slide-out cart drawer with promo code (`WELCOME10` for 10%)
- Wishlist heart toggle on every product card
- Mobile bottom nav (Home / Shop / Saved / Cart)
- Toast notifications for cart/wishlist actions
- Skeleton loading states on filter changes
- Animated countdown flash sale (48h)
- Search overlay with popular searches
- Sticky navbar with scroll shadow + cart badge bounce

## Project structure
```
app/                 Next.js routes
components/          Shared UI (Navbar, CartDrawer, ProductCard, ...)
components/home/     Homepage sections
lib/                 Data, Zustand stores, utilities
```

## Deployment
Optimised for Vercel. `npm run build` produces a production bundle.

## Mock data
16 products across 4 categories live in `lib/products.ts`. Product imagery uses
category-toned CSS gradients as placeholders.

---

© 2025 ShopZim. All rights reserved.
