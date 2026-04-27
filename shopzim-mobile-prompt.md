# ShopZim Mobile E-Commerce Website — Design Prompt

## Overview

Build a **mobile-first e-commerce fashion website** called **ShopZim** as a single-page React (`.jsx`) application with multiple views/screens. The design follows a **refined monochrome luxury-minimal** aesthetic — predominantly black, white, and soft warm grays — with generous whitespace, large product imagery, and rounded UI elements. The feel is premium, clean, and effortlessly modern — like a high-end fashion app.

Maintain the existing ShopZim brand identity and aesthetic we've already established (clean modern look, warm neutral palette, refined typography) but adapt it specifically for **small screen / mobile viewports (max-width: 430px)**.

---

## Screens to Build

The app should have **3 main screens** navigable via a bottom tab bar:

### 1. Home / Discover Screen (Default)

**Header:**
- Top-left: circular user avatar (small, ~36px)
- Next to avatar: a small settings/grid icon
- Top-right: notification bell icon
- Below header: large bold headline — **"Discover"** (display font, ~28px) and subtitle **"Your Best Clothes"** (lighter weight)

**Search Bar:**
- Full-width rounded pill-shaped input with search icon on left and filter/equalizer icon on right
- Placeholder text: "Your Best Clothes"
- Background: light warm gray (#F2F0ED or similar)

**Category Chips:**
- Section label "Category" with a "See all" link on the right
- Horizontally scrollable row of pill-shaped chips: "New in" (with sparkle icon, selected/active state in black fill), "T-Shirts" (with shirt icon), "Pants" (with pants icon)
- Each chip has a small icon + label, rounded corners, light gray background, ~36px height

**Product Cards Section:**
- Display products in a **2-column masonry-style grid** with varying card heights
- Each card has:
  - Large product image (rounded corners ~16px)
  - Product name in bold (e.g., "Knit Sweater")
  - Price in bold (e.g., "$250")
  - "Sizes in Stock" subtitle in small gray text
  - Some cards have an "Add to Cart" button (dark/black, rounded pill)
  - Some cards have a "Shop Now" button (dark/black, rounded pill)
  - Heart/favorite icon on select cards
  - One card can be a "featured" dark/charcoal background card with "Color Pop Set" styling
- "Explore More →" link between card groups
- Cards should feel organic/staggered, not a rigid grid

**Sample Products (use placeholder images from picsum.photos or similar):**
- Knit Sweater — $250
- Color Pop Set — $180
- Gradient Style Hoodie — $320

---

### 2. Search / Browse Screen

**Header:**
- Back arrow (left), centered title **"Search"**, three-dot menu (right)

**Search Bar:**
- Same style as home — rounded pill, search icon, mic/voice icon on right

**Gender Filter Tabs:**
- Three horizontally centered pills: "Men" | "Both" (default selected, black fill) | "Women"

**Product Listing:**
- Vertically scrolling cards, each card is a **horizontal layout**:
  - Left: large square product image (~120px, rounded corners)
  - Right side content:
    - Heart/favorite icon (top-right of card)
    - Product name bold (e.g., "Gradient Style Hoodie")
    - "Sizes in Stock" small text
    - Dot indicators (like a carousel indicator — 3-4 small dots)
    - "Shop Now" dark pill button at bottom-right
- Cards separated by ~12-16px spacing
- Slight shadow or subtle border on cards

**Sample Listings:**
- Gradient Style Hoodie
- Color Pop Collection
- Formal Cloths

---

### 3. Shop Profile Screen

**Header:**
- Back arrow (left), centered **"Shop Profile"**, settings gear icon (right)

**Brand Info (centered):**
- Large circular brand logo (~80px) — use a stylized "SZ" monogram or placeholder brand logo
- Brand name in bold display font (e.g., "ShopZim") with a verified badge (blue checkmark)
- Tagline: "Welcome to Radiant Metropolis"

**Stats Row:**
- Three columns evenly spaced:
  - "5.0" — Reviews
  - "200" — Products
  - "1.4M" — Followers
- Numbers are large bold, labels are small gray text

**Action Buttons:**
- Two side-by-side rounded pill buttons:
  - "Following" (black/dark fill, white text)
  - "Message" (light gray/outline, dark text)

**Products Section:**
- "Products" heading with "See all" link
- Horizontal scrollable filter tabs: "Latest" | "Popular" (selected, black fill) | "Featured" | "Best"
- Horizontal scrollable product cards below:
  - Square image thumbnails (~140px)
  - Price tag overlay or below
  - Product name in small text

---

## Bottom Navigation Bar

Persistent across all screens — a **dark/black rounded pill-shaped** nav bar floating ~12px from bottom:
- 4 icons: Home, Search (with colorful gradient circle highlight for active), Heart/Favorites, Profile/User
- Active state: icon highlighted or with a gradient circle behind it
- The nav bar itself has heavy rounded corners (~30px) and slight transparency/blur

---

## Design System & Tokens

### Colors
```
--bg-primary: #FFFFFF
--bg-secondary: #F5F3F0 (warm light gray)
--bg-card: #FFFFFF
--bg-dark-card: #2A2A2A (for featured/dark product cards)
--text-primary: #1A1A1A
--text-secondary: #8A8A8A
--accent-black: #1A1A1A (buttons, active states)
--accent-white: #FFFFFF
--border-light: #E8E6E3
--nav-bg: #1A1A1A (bottom nav)
--gradient-accent: linear-gradient(135deg, #A78BFA, #60A5FA, #34D399) (for active nav icon highlight)
```

### Typography
- **Display / Headings**: Use a serif or elegant sans-serif — try `'Playfair Display'`, `'DM Serif Display'`, or `'Cormorant Garamond'` for the "Discover" headline
- **Body / UI**: Use a clean geometric sans — `'DM Sans'`, `'Outfit'`, or `'Satoshi'` (via Google Fonts)
- Heading sizes: 28px (main), 20px (section), 16px (card titles)
- Body: 14px, Labels: 12px
- Letter-spacing: slight tracking on labels (+0.5px)

### Spacing & Layout
- Screen padding: 20px horizontal
- Card border-radius: 16px
- Button border-radius: 24px (full pill)
- Card gaps: 12-16px
- Bottom nav: 60px height, 24px border-radius, 12px margin from bottom

### Shadows & Depth
- Cards: `box-shadow: 0 2px 12px rgba(0,0,0,0.06)`
- Bottom nav: `box-shadow: 0 -4px 20px rgba(0,0,0,0.15)`
- No harsh borders — use subtle shadows for separation

### Animations
- Screen transitions: smooth horizontal slide (300ms ease)
- Cards: subtle fade-in on scroll with staggered delays
- Buttons: gentle scale on press (transform: scale(0.96))
- Bottom nav icons: smooth color/scale transition on tap
- Heart icon: pop animation on toggle

---

## Technical Requirements

- **Single `.jsx` file** using React with hooks (useState for active screen, favorites, etc.)
- **Tailwind CSS utility classes** for styling (core utilities only)
- Inline styles or CSS-in-JS for custom values not in Tailwind's defaults
- Use **Google Fonts** imported via `@import` in a `<style>` tag
- Use **Lucide React** icons (`lucide-react`) for all icons (Search, Heart, Home, User, Bell, ChevronLeft, Settings, Mic, SlidersHorizontal, ShoppingCart, Sparkles, MoreHorizontal, etc.)
- **Placeholder images**: Use `https://picsum.photos/seed/{keyword}/{width}/{height}` for product images
- Mobile viewport: design for **375-430px width**, center in larger screens with a phone-frame if viewed on desktop
- No external API calls needed — all data is hardcoded/mocked
- Export as default React component

---

## Mock Data

```javascript
const products = [
  { id: 1, name: "Knit Sweater", price: 250, category: "new", image: "sweater1" },
  { id: 2, name: "Color Pop Set", price: 180, category: "t-shirts", image: "jacket1" },
  { id: 3, name: "Gradient Style Hoodie", price: 320, category: "new", image: "hoodie1" },
  { id: 4, name: "Color Pop Collection", price: 275, category: "pants", image: "jacket2" },
  { id: 5, name: "Formal Cloths", price: 420, category: "new", image: "formal1" },
  { id: 6, name: "Urban Street Jacket", price: 350, category: "t-shirts", image: "street1" },
  { id: 7, name: "Classic Denim", price: 195, category: "pants", image: "denim1" },
  { id: 8, name: "Minimal Tee", price: 85, category: "t-shirts", image: "tee1" },
];

const categories = [
  { id: "new", label: "New in", icon: "Sparkles" },
  { id: "t-shirts", label: "T-Shirts", icon: "Shirt" },
  { id: "pants", label: "Pants", icon: "Layers" },
];

const shopProfile = {
  name: "ShopZim",
  tagline: "Welcome to Radiant Metropolis",
  reviews: "5.0",
  products: "200",
  followers: "1.4M",
  verified: true,
};
```

---

## Key Design Principles

1. **Monochrome Luxury**: Black and white dominate. Color is reserved only for the nav highlight gradient and occasional accent. The restraint IS the luxury.
2. **Generous Imagery**: Product photos are the hero. Let them breathe with rounded corners and ample spacing.
3. **Soft UI**: Everything is rounded — pills, cards, avatars, the nav bar. No sharp corners anywhere.
4. **Floating Navigation**: The bottom nav bar floats above the content like a dock, dark and prominent.
5. **Typography Contrast**: Mix a refined serif display font for headlines with a clean sans-serif for everything else.
6. **Tactile Feel**: Subtle shadows, gentle press animations, and smooth transitions make it feel like a native app.
7. **Whitespace as Design**: Don't fill every pixel. The breathing room between elements is intentional and premium.

---

## What NOT to Do

- No purple gradients or generic AI color schemes
- No Inter, Roboto, or Arial fonts
- No harsh drop shadows or visible borders on cards
- No cluttered layouts — maintain breathing room
- No skeleton screens or loading states needed — static mock data is fine
- Don't use actual brand logos (Gucci etc.) — use ShopZim branding throughout
