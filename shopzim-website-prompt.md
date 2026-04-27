# ShopZim — E-Commerce Website Build Prompt & Guidelines
> Fashion & lifestyle e-commerce store. Built as a Kaps Media portfolio piece.
> Paste into Windsurf, v0.dev, or Bolt.new

---

## Concept
ShopZim is a modern fashion & lifestyle e-commerce store targeting urban Zimbabweans.
Niche: Clothing, accessories, beauty, and home goods — curated for the Zimbabwean market.
Tagline: "Shop Zimbabwe. Shop Smart."
Feel: Clean, modern, fast — think ASOS or Zara but built for Zimbabwe with local payment methods.

---

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- shadcn/ui
- Zustand (cart & wishlist state management)
- React Hook Form + Zod (checkout form)
- Deployment: Vercel

---

## Brand Tokens
```
Primary navy:    #0F172A  (hero, navbar, footer backgrounds)
Brand blue:      #2563EB  (primary CTA, links, active states)
CTA orange:      #F97316  (sale badges, flash sale, urgency elements)
Surface white:   #F8FAFC  (page background)
Card white:      #FFFFFF  (product cards)
Text primary:    #0F172A
Text muted:      #64748B
Border:          #E2E8F0
Success:         #059669
Font heading:    "Plus Jakarta Sans" — weight 600, 700, 800
Font body:       "Inter" — weight 400, 500
Border radius:   8px cards, 6px buttons, 999px pills/badges
```

---

## MASTER PROMPT

```
Build a full production-quality e-commerce website for "ShopZim" — a modern 
fashion and lifestyle online store based in Zimbabwe.

TECH STACK:
- Next.js 14 App Router
- Tailwind CSS
- Framer Motion
- shadcn/ui
- Zustand for cart and wishlist global state
- React Hook Form + Zod for checkout
- TypeScript throughout

DESIGN DIRECTION:
- Clean, modern, bright e-commerce aesthetic — think ASOS or Zara
- Light backgrounds (#F8FAFC) with navy (#0F172A) and blue (#2563EB) accents
- Orange (#F97316) for sale, urgency, and promotional elements only
- Plus Jakarta Sans for headings, Inter for body
- Mobile-first — bottom navigation bar on mobile
- Smooth micro-interactions: cart drawer slide, product hover zoom, 
  button press states, loading skeletons
- No heavy gradients — flat, clean, product-forward design

PAGES:
1. Home (/)
2. Shop / Catalogue (/shop)
3. Product Detail (/shop/[slug])
4. Cart (/cart) — also accessible as slide-out drawer
5. Checkout (/checkout) — multi-step
6. Order Confirmation (/order-confirmation)
7. Wishlist (/wishlist)
8. About ShopZim (/about)

GLOBAL STATE (Zustand):
- Cart: items, quantities, total, add/remove/update functions
- Wishlist: items, add/remove/toggle functions
- Cart item count shown in navbar badge
- Persist cart and wishlist to localStorage
```

---

## SECTION-BY-SECTION PROMPTS

### 1. NAVBAR
```
Build a navbar for ShopZim e-commerce store.

Desktop layout (left to right):
- Logo: "ShopZim" wordmark — Plus Jakarta Sans, bold, navy #0F172A
- Nav links: Women | Men | Home & Living | Beauty | Sale
  - "Sale" link: orange colour #F97316, slightly bold
- Right side icons:
  - Search icon (opens search overlay on click)
  - Wishlist heart icon with item count badge
  - Cart bag icon with item count badge (blue pill)
  - Account icon (dropdown: Login / Register / My Orders)

Search overlay (full width, slides down):
- Large search input centred, placeholder: "Search products..."
- Below: "Popular searches:" tags: Dresses · Sneakers · Handbags · 
  Summer Collection · Home Decor
- Closes on Escape or clicking outside

Announcement bar ABOVE navbar:
- Thin bar, navy background, cream text
- Text: "🚚 Free delivery on orders over $50 · Use code WELCOME10 for 10% off your first order"
- Auto-scrolling marquee on mobile

Mobile navbar:
- Logo centred
- Cart icon right (with badge)
- Hamburger left (opens full screen nav overlay)
- Announcement bar above on mobile too

On scroll: navbar gets white background + subtle bottom shadow.
Cart icon: clicking opens slide-out cart drawer (not navigate to /cart).
```

---

### 2. HERO SECTION
```
Build a hero section for ShopZim e-commerce homepage.

Layout: Full-width banner, height 85vh desktop / 70vh mobile

Content (left-aligned, on dark overlay):
- Small badge pill: "NEW COLLECTION" — blue background, white text
- Headline: "Style Meets Zimbabwe"
  Font: Plus Jakarta Sans, 64px desktop / 38px mobile, weight 800, white
- Subheadline: "Discover fashion, beauty, and lifestyle products 
  curated for the modern Zimbabwean."
  Font: Inter, 18px, white/80%, max-width 480px
- Two CTAs:
  Primary: "Shop New Arrivals" — blue #2563EB, white text, pill shape
  Secondary: "View Sale →" — white outline, white text
- Bottom left: social proof strip — 
  "⭐ 4.8/5 from 1,200+ happy shoppers in Zimbabwe"

Background:
- Use a warm lifestyle image placeholder (gradient: 
  linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%))
- Subtle dark overlay for text readability
- Right side: floating product card mockup showing a featured item 
  with price and "Add to Cart" button (decorative — not functional)

Below hero: 4 category tiles in a horizontal strip:
  Women's Fashion | Men's Style | Home & Living | Beauty & Wellness
  Each tile: icon + label, click navigates to /shop?category=X

Animations:
- Headline and CTAs: staggered fade-up on load
- Category tiles: fade in with 0.1s stagger
- Hero image: subtle Ken Burns slow zoom (CSS animation)
```

---

### 3. FLASH SALE STRIP
```
Build a flash sale countdown strip for ShopZim homepage.

Background: Orange #F97316
Layout: Full width, single row, centred content

Content:
- Fire emoji + "FLASH SALE — Up to 60% OFF selected items"
- Live countdown timer: Days : Hours : Minutes : Seconds
  (set timer to 48 hours from now, counts down in real time using useEffect)
- "Shop Sale →" button — white background, orange text, rounded

Timer styling:
- Each unit in a small dark box: number bold, label small below
- Separator: colon between units
- Timer ticks every second with smooth number flip animation

On mobile: compress to 2 lines — sale text on top, timer below
```

---

### 4. FEATURED CATEGORIES GRID
```
Build a featured categories section for ShopZim homepage.

Section header:
- Label: "SHOP BY CATEGORY"
- Headline: "What are you looking for?"

Grid layout: 4 cards on desktop (2x2 on tablet, 1-col scroll on mobile)

Categories:
1. Women's Fashion
   - Placeholder: warm pink/rose gradient
   - Label: "Women's Fashion"
   - Sub: "Dresses, tops, bottoms & more"
   - Badge: "New Arrivals"
   - Link: /shop?category=women

2. Men's Style
   - Placeholder: slate blue gradient
   - Label: "Men's Style"
   - Sub: "Shirts, trousers, shoes & accessories"
   - Link: /shop?category=men

3. Home & Living
   - Placeholder: warm amber/terracotta gradient
   - Label: "Home & Living"
   - Sub: "Decor, kitchenware, bedding & more"
   - Badge: "Trending"
   - Link: /shop?category=home

4. Beauty & Wellness
   - Placeholder: soft lavender/pink gradient
   - Label: "Beauty & Wellness"
   - Sub: "Skincare, haircare & body care"
   - Link: /shop?category=beauty

Card design:
- Tall cards (aspect ratio 3:4)
- Gradient background as placeholder image (fill entire card)
- Dark overlay gradient at bottom for text readability
- Text at bottom: category name bold, sub-label small, arrow icon
- On hover: image scales 1.05, overlay darkens slightly
- "New Arrivals" / "Trending" badge: orange pill top-left

Animate in with staggered whileInView (0.1s delay each).
```

---

### 5. TRENDING PRODUCTS CAROUSEL
```
Build a trending products section for ShopZim homepage.

Section header:
- Label: "TRENDING NOW"
- Headline: "What Everyone's Buying"
- Right side: "View All →" link

Horizontal scrollable product card row:
- Show 4 cards on desktop, 2.5 visible on mobile (peek effect)
- Left/right arrow controls on desktop
- Swipeable on mobile (touch events)

Product cards (8 total — create placeholder data):
1.  Ankara Print Wrap Dress — Women's — $45 (was $65) — SALE badge
2.  Classic White Linen Shirt — Men's — $32
3.  Woven Rattan Basket — Home — $28 — TRENDING badge
4.  Shea Butter Body Lotion 250ml — Beauty — $18
5.  Floral Midi Dress — Women's — $52
6.  Slim Fit Chino Trousers — Men's — $38 (was $55) — SALE badge
7.  Ceramic Mug Set (4 pcs) — Home — $24
8.  Natural Hair Growth Oil — Beauty — $22 — BESTSELLER badge

Product card design:
- White card, 8px border radius, subtle shadow on hover
- Top: product image placeholder (unique gradient per category)
- Wishlist heart icon: top right, toggles filled/outline on click 
  (updates Zustand wishlist state)
- Badge: "SALE" (orange), "TRENDING" (blue), "BESTSELLER" (navy) — top left
- Product name: Plus Jakarta Sans 14px bold
- Category: Inter 11px muted
- Price: bold current price, strikethrough original if on sale
- Star rating: 4-5 stars + review count (e.g. ⭐ 4.7 (128))
- "Add to Cart" button: appears on hover (desktop), always visible mobile
  Clicking adds to Zustand cart with size "default" and shows toast notification

Toast notification: bottom left, "✓ Added to cart" — 2 second auto-dismiss
```

---

### 6. TRUST BADGES STRIP
```
Build a trust/USP strip for ShopZim homepage.

Background: White, full width, thin top and bottom borders
Layout: 4 equal columns (2x2 on mobile)

Badges:
1. 🚚 Free Delivery — "On all orders over $50 across Zimbabwe"
2. 🔒 Secure Checkout — "EcoCash, card & PayPal accepted"
3. 📦 Easy Returns — "30-day hassle-free return policy"
4. 🇿🇼 100% Local Support — "Zimbabwe-based customer service team"

Design:
- Icon: large, simple, blue colour
- Title: Plus Jakarta Sans, 14px, bold, navy
- Description: Inter, 12px, muted
- Subtle dividers between columns on desktop
- Fade-in animation on scroll
```

---

### 7. SHOP / CATALOGUE PAGE (/shop)
```
Build the full product catalogue page for ShopZim.

URL: /shop with query params for filtering:
?category=women|men|home|beauty
?sort=newest|price-asc|price-desc|bestselling
?minPrice=0&maxPrice=200
?size=XS|S|M|L|XL|XXL
?inStock=true

Layout: sidebar + product grid (desktop), drawer filter on mobile

LEFT SIDEBAR (desktop, 240px wide):
- "Filters" heading with "Clear all" link
- Category checkboxes: All | Women's | Men's | Home & Living | Beauty
- Price range slider: $0 — $200 (use a range input component)
- Size filter: XS S M L XL XXL (pill toggles, multi-select)
- Colour filter: coloured circle swatches (6 colours)
- Availability toggle: "In stock only"
- Rating filter: 3★+ / 4★+ / 5★ only

MOBILE FILTER:
- "Filter & Sort" button fixed at top, opens a bottom drawer
- Same filter options in the drawer
- "Apply Filters" CTA button, orange, at bottom of drawer

PRODUCT GRID:
- 3 columns desktop, 2 columns tablet, 2 columns mobile
- 12 products per page
- Top bar: "Showing X results" + sort dropdown
- Product cards (same design as homepage carousel)
- Skeleton loading state while filtering (shimmer cards)
- Empty state: "No products found. Try adjusting your filters."

SORT OPTIONS (dropdown):
- Newest First (default)
- Price: Low to High
- Price: High to Low
- Best Selling
- Highest Rated

Populate with 16 placeholder products across all 4 categories.
Use unique gradient placeholders per category:
- Women's: rose/pink tones
- Men's: blue/slate tones
- Home: amber/terracotta tones
- Beauty: lavender/lilac tones

Animate: product cards fade in with 0.06s stagger on filter change
(Framer Motion AnimatePresence with layout animation)
```

---

### 8. PRODUCT DETAIL PAGE (/shop/[slug])
```
Build a product detail page for ShopZim.

Example product: "Ankara Print Wrap Dress"
URL: /shop/ankara-print-wrap-dress

LEFT COLUMN — Image Gallery:
- Main image: large, aspect 4:5, gradient placeholder (rose/pink)
- Thumbnail strip below: 4 smaller thumbnails (same gradient variations)
- Clicking thumbnail updates main image
- On desktop: hover zoom (CSS transform scale on image inside overflow:hidden)
- On mobile: swipeable image carousel with dot indicators

RIGHT COLUMN — Product Info:
- Breadcrumb: Home > Women's > Dresses
- Badge: "SALE" (orange pill) if on sale
- Product name: Plus Jakarta Sans 24px desktop / 20px mobile, bold
- Rating: ⭐⭐⭐⭐⭐ 4.7 (128 reviews) — links to reviews section
- Price: $45.00 current price, $65.00 strikethrough (if sale)
- Savings badge: "You save $20 (31% off)" — green background

Size selector:
- Label: "Size:" + "Size Guide" link
- Pill buttons: XS S M L XL XXL
- Unavailable sizes: shown greyed out, cursor not-allowed
- Selected size: blue filled

Colour selector:
- Label: "Colour: Midnight Blue"
- Circle swatches: 4 colour options, selected has ring
- Clicking changes main image (swap gradient tone)

Quantity selector:
- Minus / number / Plus buttons, min 1 max 10
- Updates in real time

Stock indicator:
- "✓ In stock — only 4 left!" — orange text with urgency

Add to cart + Wishlist row:
- "Add to Cart" button: full width, blue, bold — adds to Zustand cart
- Below: heart icon + "Save to Wishlist" text link
- "Buy Now" button: full width, navy — goes straight to /checkout

Delivery info accordion:
- "🚚 Delivery & Returns" — expandable
  Content: "Free delivery on orders over $50. Standard delivery 3–5 days.
  Express delivery available. 30-day return policy."

Product details accordion:
- "📋 Product Details" — expandable
  Content: Material, care instructions, origin

BELOW FOLD:
Reviews section:
- Average rating: large stars + score
- 3 review cards: reviewer name, star rating, date, review text
- "Write a Review" button (non-functional for demo)

Related products:
- "You Might Also Like" heading
- 4 product cards (same design as catalogue)
```

---

### 9. CART DRAWER
```
Build a slide-out cart drawer for ShopZim.

Trigger: clicking cart icon in navbar opens drawer from the right side.
Backdrop: semi-transparent dark overlay on the left side.
Closes: clicking backdrop, pressing Escape, or clicking X button.

Drawer layout (360px wide on desktop, full width on mobile):

HEADER:
- "Your Cart (3 items)" — item count updates dynamically
- X close button top right

ITEMS LIST (scrollable):
Each cart item row:
- Product image placeholder (gradient thumbnail, 70x70px, rounded)
- Product name (2 lines max, truncated)
- Variant: "Size: M · Colour: Blue"
- Quantity stepper: minus / number / plus (updates Zustand)
- Price: item total (price × quantity)
- Remove icon (X): removes item with fade-out animation

PROMO CODE:
- "Have a promo code?" text link — expands input field
- Input + "Apply" button
- Success state: "✓ WELCOME10 applied — 10% off!" green
- Error state: "Invalid code" red

ORDER SUMMARY:
- Subtotal: $XX.00
- Delivery: "FREE" (if over $50) or "$5.00"
- Discount: -$X.00 (if promo applied, green)
- Divider line
- Total: $XX.00 (bold, larger)

FOOTER (sticky bottom of drawer):
- "Proceed to Checkout →" button — full width, blue
- "Continue Shopping" text link — closes drawer
- Trust line: "🔒 Secure checkout · EcoCash · PayPal · Card"

Empty cart state:
- Shopping bag icon (large, muted)
- "Your cart is empty"
- "Start Shopping →" button links to /shop

Animate with Framer Motion:
- Drawer slides in from right (x: 360 → 0)
- Backdrop fades in
- Items stagger in on open
- Item removal: height collapses + fade out
```

---

### 10. CHECKOUT PAGE (/checkout)
```
Build a multi-step checkout page for ShopZim.

3 steps shown as progress bar at top:
Step 1: Delivery Details
Step 2: Delivery Method
Step 3: Payment

Progress bar: 3 circles connected by line, active step filled blue,
completed steps show checkmark, upcoming steps grey.

━━━ STEP 1: DELIVERY DETAILS ━━━
Form fields (React Hook Form + Zod):
- First Name + Last Name (side by side)
- Email Address
- Phone / WhatsApp Number
- Delivery Address Line 1
- Delivery Address Line 2 (optional)
- City (select: Harare, Bulawayo, Mutare, Gweru, Kwekwe, Other)
- Province (auto-fills based on city)
- Delivery Instructions (textarea, optional)
"Continue to Delivery →" button — blue, full width

━━━ STEP 2: DELIVERY METHOD ━━━
Radio card options:
1. Standard Delivery (3–5 business days) — $5.00
   Free on orders over $50
2. Express Delivery (1–2 business days) — $12.00
3. Click & Collect from Harare CBD — FREE
   "Available Mon–Sat, 8AM–6PM"

Each option as a selectable card with radio button, label, timing, and price.
Selected card gets blue border.
"Continue to Payment →" button

━━━ STEP 3: PAYMENT ━━━
Payment method selector (tab or radio cards):

Tab 1: EcoCash (default, most prominent)
  - EcoCash logo/icon
  - Input: "EcoCash Number" (07X XXX XXXX)
  - Instruction: "You will receive a USSD prompt on this number 
    to confirm payment of $XX.00"
  - "Pay with EcoCash" button — green (#059669)

Tab 2: OneMoney
  - Same layout as EcoCash
  - "Pay with OneMoney" button

Tab 3: PayPal / Card
  - PayPal button (branded blue)
  - Or: card fields (Number, Expiry, CVV)
  - "Pay Now" button — blue

RIGHT SIDEBAR (desktop) / above button (mobile):
Order summary (collapsed on mobile, expandable):
- Items list with thumbnails
- Subtotal, delivery, discount, total
- "Edit Cart" link

On payment submit:
- Loading spinner on button (2 seconds)
- Navigate to /order-confirmation

━━━ ORDER CONFIRMATION PAGE ━━━
Large animated green checkmark (Framer Motion draw animation)
Headline: "Order Confirmed! 🎉"
Subtext: "Thank you for shopping with ShopZim. Your order #SZ-00142 
has been confirmed and will be delivered in 3–5 business days."
Order details: items, total, delivery address
Two buttons: "Track Your Order" (non-functional, grey) + "Continue Shopping"
WhatsApp notification note: "We'll send order updates to your WhatsApp"
```

---

### 11. WISHLIST PAGE (/wishlist)
```
Build a wishlist page for ShopZim.

Uses Zustand wishlist state (persisted to localStorage).

Header:
- "My Wishlist (X items)"
- "Share Wishlist" button (non-functional)

Product grid: same 3-column card grid as /shop
Each card has:
- All standard product card elements
- "Move to Cart" button replaces "Add to Cart"
- "Remove" X button on card

Empty state:
- Heart icon (large, empty)
- "Your wishlist is empty"
- "Discover Products →" links to /shop
```

---

### 12. MOBILE BOTTOM NAVIGATION
```
Build a sticky bottom navigation bar for ShopZim — visible only on mobile 
(hidden md:hidden).

Fixed to bottom of screen, full width, 64px height.
Background: white, top border #E2E8F0, box shadow upward.
4 equal tabs:

1. Home icon + "Home" label → /
2. Grid icon + "Shop" label → /shop
3. Heart icon + "Saved" label → /wishlist (show count badge if items)
4. Bag icon + "Cart" label — opens cart drawer (show count badge)

Active tab: blue icon + label
Inactive: grey icon + label

Ensure all page content has padding-bottom: 80px on mobile so 
content is never hidden behind the nav bar.
```

---

### 13. FOOTER
```
Build a footer for ShopZim.

Background: #0F172A (dark navy)

Top section: 4 columns

Column 1 — Brand:
- "ShopZim" logo wordmark, white
- Tagline: "Zimbabwe's favourite online store"
- "🇿🇼 Proudly Zimbabwean"
- Social icons: Instagram, Facebook, TikTok, WhatsApp (white, hover blue)
- Newsletter signup: email input + "Subscribe" button

Column 2 — Shop:
- New Arrivals, Women's Fashion, Men's Style, 
  Home & Living, Beauty & Wellness, Sale Items

Column 3 — Help:
- FAQs, Shipping & Delivery, Returns & Exchanges,
  Size Guide, Track My Order, Contact Us

Column 4 — About:
- About ShopZim, Careers, Press, Blog, Sell on ShopZim,
  Terms & Conditions, Privacy Policy

Bottom bar:
- Left: "© 2025 ShopZim. All rights reserved."
- Centre: Payment icons — EcoCash, OneMoney, PayPal, Visa, Mastercard
  (show as small rounded icon badges)
- Right: "Website by Kaps Media · kapsmedia.co.zw"
  (REQUIRED — free backlink for your agency)

Divider: thin line rgba(255,255,255,0.1)
```

---

### 14. GLOBAL INTERACTIONS & POLISH
```
Apply these globally across the ShopZim website:

MICRO-INTERACTIONS:
- Add to Cart button: brief scale(0.96) press animation + 
  cart icon in navbar bounces (keyframe animation)
- Wishlist toggle: heart fills with a pop scale animation
- Product card hover: image zooms 1.04, shadow increases, 
  "Add to Cart" button slides up from bottom
- Button hover: all CTA buttons darken 10%, scale(1.02)
- Quantity stepper: smooth number transition

TOAST NOTIFICATIONS (bottom-left, stack up to 3):
- "✓ Added to cart" — green
- "♡ Added to wishlist" — blue  
- "✕ Removed from cart" — neutral grey
- "🏷 Promo code applied!" — green
Auto-dismiss after 3 seconds, manual close X button

LOADING STATES:
- Product grid: shimmer skeleton cards while filtering
- Product images: shimmer placeholder until loaded
- Checkout steps: button shows spinner on submit
- Page transitions: subtle fade between routes

SCROLL BEHAVIOUR:
- Homepage sections: fade-up with whileInView (once: true)
- Product grid: cards stagger in 0.05s delay each
- No jarring jumps — smooth scroll behaviour globally

PERFORMANCE:
- next/image for all product images with lazy loading
- Cart and wishlist persisted to localStorage via Zustand persist
- All filter/sort changes are instant (client-side, no API)

MOBILE SPECIFICS:
- Font size minimum 16px on all inputs (prevents iOS zoom)
- Tap targets minimum 44px
- No horizontal overflow at any breakpoint
- Swipeable carousels use touch events
- Bottom nav always above all other content (z-50)

FOOTER CREDIT (MANDATORY):
"Website by Kaps Media · kapsmedia.co.zw" in every page footer.
This is a live backlink — never remove it.
```

---

## PRODUCT DATA (Use this as mock data throughout)
```typescript
// Mock products — paste into /lib/products.ts

export const products = [
  // WOMEN'S
  { id:1, name:"Ankara Print Wrap Dress", category:"women", 
    price:45, originalPrice:65, rating:4.7, reviews:128, 
    badge:"SALE", sizes:["XS","S","M","L","XL"], 
    colours:["Navy","Red","Green"], inStock:true, trending:true },
  { id:2, name:"Floral Midi Dress", category:"women", 
    price:52, rating:4.5, reviews:89, sizes:["S","M","L","XL"], 
    colours:["White","Pink"], inStock:true },
  { id:3, name:"High-Waist Linen Trousers", category:"women", 
    price:38, rating:4.6, reviews:64, badge:"NEW",
    sizes:["XS","S","M","L"], colours:["Beige","Black"], inStock:true },
  { id:4, name:"Woven Straw Tote Bag", category:"women", 
    price:29, rating:4.8, reviews:203, badge:"BESTSELLER",
    sizes:["One Size"], colours:["Natural","Black"], inStock:true },

  // MEN'S
  { id:5, name:"Classic White Linen Shirt", category:"men", 
    price:32, rating:4.6, reviews:97, 
    sizes:["S","M","L","XL","XXL"], colours:["White","Blue"], inStock:true },
  { id:6, name:"Slim Fit Chino Trousers", category:"men", 
    price:38, originalPrice:55, rating:4.5, reviews:74, badge:"SALE",
    sizes:["30","32","34","36"], colours:["Khaki","Navy"], inStock:true },
  { id:7, name:"African Print Bucket Hat", category:"men", 
    price:18, rating:4.9, reviews:156, badge:"TRENDING",
    sizes:["S/M","L/XL"], colours:["Multi"], inStock:true },
  { id:8, name:"Polo Shirt 3-Pack", category:"men", 
    price:55, rating:4.4, reviews:42,
    sizes:["S","M","L","XL"], colours:["White/Navy/Grey"], inStock:true },

  // HOME & LIVING
  { id:9, name:"Woven Rattan Basket Set", category:"home", 
    price:28, rating:4.7, reviews:118, badge:"TRENDING",
    sizes:["Set of 3"], colours:["Natural"], inStock:true },
  { id:10, name:"Ceramic Mug Set (4 pcs)", category:"home", 
    price:24, rating:4.8, reviews:86,
    sizes:["4-piece set"], colours:["White","Terracotta"], inStock:true },
  { id:11, name:"Linen Duvet Cover Set", category:"home", 
    price:68, rating:4.6, reviews:51,
    sizes:["Double","Queen","King"], colours:["White","Sage"], inStock:true },
  { id:12, name:"Handmade Scented Candle", category:"home", 
    price:15, rating:4.9, reviews:234, badge:"BESTSELLER",
    sizes:["One Size"], colours:["Amber Jar"], inStock:true },

  // BEAUTY
  { id:13, name:"Shea Butter Body Lotion 250ml", category:"beauty", 
    price:18, rating:4.8, reviews:312, badge:"BESTSELLER",
    sizes:["250ml","500ml"], colours:["N/A"], inStock:true },
  { id:14, name:"Natural Hair Growth Oil", category:"beauty", 
    price:22, originalPrice:30, rating:4.7, reviews:189, badge:"SALE",
    sizes:["100ml"], colours:["N/A"], inStock:true },
  { id:15, name:"Baobab Face Serum", category:"beauty", 
    price:35, rating:4.6, reviews:78, badge:"NEW",
    sizes:["30ml"], colours:["N/A"], inStock:true },
  { id:16, name:"Charcoal Teeth Whitening Kit", category:"beauty", 
    price:25, rating:4.5, reviews:143,
    sizes:["One Size"], colours:["N/A"], inStock:true },
];
```

---

## QUICK-START PROMPT (Paste into Windsurf first)
```
Build a full production-quality e-commerce website for "ShopZim" — 
a modern fashion and lifestyle online store based in Zimbabwe.

Stack: Next.js 14, Tailwind CSS, Framer Motion, shadcn/ui, 
Zustand (cart + wishlist state), React Hook Form + Zod, TypeScript.

Design: Clean, bright e-commerce aesthetic. Light background #F8FAFC, 
navy #0F172A, blue #2563EB accents, orange #F97316 for sale/urgency.
Fonts: Plus Jakarta Sans (headings) + Inter (body). Mobile-first.

Pages: Home, Shop (/shop), Product Detail (/shop/[slug]), 
Cart drawer, Checkout (3-step), Order Confirmation, Wishlist, About.

Home sections:
1. Announcement bar (free delivery marquee) + sticky navbar with 
   cart/wishlist badges + search overlay
2. Hero banner (85vh) — headline, 2 CTAs, category strip below
3. Flash sale strip — orange background, live countdown timer
4. Featured categories grid — 4 cards (Women, Men, Home, Beauty)
5. Trending products horizontal carousel — 8 product cards
6. Trust badges strip — 4 USPs
7. Footer — 4 columns, navy background, payment icons, 
   "Website by Kaps Media · kapsmedia.co.zw" credit

Key features:
- Slide-out cart drawer (Framer Motion, Zustand state)
- Wishlist toggle on all product cards (heart icon, Zustand state)
- Product catalogue with sidebar filters (category, price, size, colour)
- Product detail page with image gallery, size/colour selectors
- 3-step checkout with EcoCash, OneMoney, and PayPal payment UI
- Mobile bottom nav bar (Home, Shop, Saved, Cart)
- Toast notifications for cart/wishlist actions
- Skeleton loading states on product grids
- Persist cart + wishlist to localStorage

Use 16 mock products across 4 categories (see /lib/products.ts).
Use category-toned gradient placeholders for all product images.
```

---

## DEPLOY CHECKLIST
- [ ] Cart and wishlist persist correctly after page refresh
- [ ] All 3 checkout steps navigate correctly
- [ ] Order confirmation page shows correct order details
- [ ] Mobile bottom nav works and doesn't cover content
- [ ] Cart badge updates when items added/removed
- [ ] Filters on /shop page work (client-side filtering)
- [ ] Flash sale countdown timer ticks in real time
- [ ] All WhatsApp links updated (if any)
- [ ] "Website by Kaps Media · kapsmedia.co.zw" live in footer
- [ ] Deploy to Vercel at shopzim.vercel.app or similar
- [ ] Add to Kaps Media portfolio with screenshots

## MOBBIN SEARCH TERMS
- "e-commerce product listing mobile"
- "cart drawer slide out"
- "checkout multi step"
- "product detail page"
- "filter sidebar shop"
- "flash sale countdown"
- "order confirmation screen"

