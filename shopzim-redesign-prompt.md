# ShopZim — Complete Redesign Prompt
> Glassmorphism bento e-commerce · Inspired by Nitec UI
> Paste into Windsurf as a fresh project or full redesign

---

## Design Philosophy
Soft, modern, app-like e-commerce experience. Light glassmorphism backgrounds,
oversized bento grid cards, bold sans-serif type, and a single lime-green accent.
Think Apple Store meets modern SaaS dashboard. Every section feels like a card
you could pick up and move. 3D-style floating product imagery is the hero.

---

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion (heavy use — this design needs motion to feel alive)
- shadcn/ui as base components
- Zustand (cart + wishlist state, persisted to localStorage)
- React Hook Form + Zod (checkout)
- TypeScript
- 21st.dev components: search for "bento-grid", "glass-card", 
  "animated-hero", "product-card" and install relevant ones

---

## Brand Tokens
```
Page background:     #F0F0F0  (soft warm grey)
Card surface:        #FFFFFF  (pure white cards)
Glass surface:       rgba(255,255,255,0.72) + backdrop-filter: blur(20px)
Elevated surface:    #F7F7F5  (warm off-white — hero cards, feature panels)
Accent lime:         #C8FF00  (lime green — CTAs, badges, highlights)
Accent lime hover:   #B8EF00  (slightly darker on hover)
Text primary:        #1A1A1A
Text secondary:      #6B6B6B
Text muted:          #9CA3AF
Border:              rgba(0,0,0,0.05)
Shadow small:        0 1px 3px rgba(0,0,0,0.04)
Shadow medium:       0 4px 20px rgba(0,0,0,0.06)
Shadow large:        0 12px 40px rgba(0,0,0,0.08)

Font heading:        "Syne" (Google Fonts) — weight 600, 700, 800
Font body:           "Inter" (Google Fonts) — weight 400, 500
Border radius:       20px (cards), 14px (buttons, inputs), 999px (pills, avatars)
```

---

## MASTER PROMPT — Paste this first

```
Build a complete, production-quality e-commerce website for "ShopZim" — 
a modern fashion and lifestyle online store based in Zimbabwe.

CRITICAL DESIGN DIRECTION — read carefully:
This is NOT a standard e-commerce layout. The entire site uses a 
BENTO GRID dashboard aesthetic with glassmorphism cards, similar to 
modern SaaS dashboards and the Apple product page style.

Key visual rules:
- Page background: soft warm grey #F0F0F0 everywhere (never pure white pages)
- Every section is built from CARDS — white or glass-effect panels 
  sitting on the grey background
- Cards: bg-white, rounded-[20px], shadow (0 4px 20px rgba(0,0,0,0.06))
- Glass cards: rgba(255,255,255,0.72), backdrop-blur-xl, subtle white border
- Accent: lime green #C8FF00 for primary CTAs, badges, and highlights ONLY
- Typography: "Syne" for headings (bold, punchy), "Inter" for body
- Rounded everything: 20px cards, 14px buttons, 999px pills
- Product images should FLOAT — no tight boxes, products break out 
  of their containers with drop shadows
- Generous whitespace — let cards breathe (gap-5 minimum between cards)
- Subtle floating decorative elements: small coloured dots, circles, 
  gradient orbs in backgrounds
- Micro-interactions on EVERYTHING: hover lifts, press scales, 
  smooth transitions

TECH STACK:
Next.js 14 App Router, Tailwind CSS, Framer Motion, shadcn/ui, 
Zustand (cart + wishlist), TypeScript.

PAGES:
1. Home (/) — Bento grid homepage
2. Shop (/shop) — Product catalogue
3. Product Detail (/shop/[slug])
4. Cart (slide-out drawer)
5. Checkout (/checkout) — multi-step
6. Order Confirmation (/order-confirmation)
7. Wishlist (/wishlist)
```

---

## HOMEPAGE — BENTO GRID LAYOUT

```
Build the ShopZim homepage as a full bento grid dashboard layout.

Page background: #F0F0F0

The ENTIRE homepage below the navbar is one large bento grid. 
Not separate full-width sections — everything is a card in a grid.

GRID STRUCTURE (desktop):
Use CSS grid with this approximate layout:

Row 1:  [  HERO CARD (large, 8 cols)  ] [ SIDE STACK (4 cols):    ]
        [                               ] [   Popular Colors card   ]
        [                               ] [   Featured Product card ]
        [                               ] [   Trending Product card ]

Row 2:  [ More Products ] [ Social Proof ] [ Popular Release ] [ Featured ]
        [ card (3 cols) ] [ card (3 cols) ] [ card (3 cols)   ] [ (3 cols) ]

Row 3:  [ TRENDING PRODUCTS CAROUSEL — full 12 col span ]

Row 4:  [ Category ] [ Category ] [ Category ] [ Category ]

Row 5:  [ TRUST BADGES — full width card ]

MOBILE: All cards stack into a single column, full width.
TABLET: 2-column grid.

Container: max-w-7xl mx-auto, padding px-5 mobile / px-8 desktop

━━━ NAVBAR ━━━
Build on the grey page background (not white header).

Layout: a single glass card bar spanning the top
- Background: rgba(255,255,255,0.72), backdrop-filter: blur(20px)
- Border-radius: 16px (it's a floating rounded bar, not edge-to-edge)
- Margin: mx-5 mt-4 (floats away from edges)
- Shadow: 0 2px 12px rgba(0,0,0,0.04)

Left: "ShopZim" logo — Syne font, weight 800, 20px, #1A1A1A
Centre: Search bar — rounded-full input, #F0F0F0 background inside,
  placeholder "Search products...", search icon right, lime green 
  circular icon button on far right of input
Right: Cart icon (bag) with lime green badge count, 
  wishlist heart icon (red when items exist),
  user avatar circle (placeholder gradient)

Mobile navbar: simplify to logo left, search icon + cart icon right.
Full search overlay on search icon tap.

━━━ HERO CARD (main bento card) ━━━
The largest card in the grid. White background, rounded-[24px], 
generous padding (p-10 desktop, p-6 mobile).

Left side:
- Eyebrow pill badge: "🛍️ Style is Everything" — glass background, 
  small rounded pill, dark text
- Headline: "Discover.\nInspiring.\nFashion." — Syne, 52px, weight 800,
  #1A1A1A, tight line-height 1.05, each word on its own line
- Step indicator: "01" large ghost number, thin line, then small text 
  "Premium Style" / "Curated for Zimbabwe's trendsetters"
- CTA: "View All Products" pill button — lime green #C8FF00 background, 
  black text, rounded-full, with a circular arrow icon button (→) 
  beside it in dark background (like the reference image)
- Social row at bottom: "Follow us on:" + Twitter, TikTok, Instagram, 
  LinkedIn tiny icons

Right side:
- Large product image (a featured product — use gradient placeholder,
  warm tones). The product image should OVERFLOW the card slightly 
  at the top — use relative positioning and negative top margin
  to make the product float above the card boundary
- Small floating dots around the product: blue dot, grey dot, 
  lime green dot — positioned absolute, subtle float animation
  (Framer Motion animate y: [0, -8, 0] repeat infinite, 3s duration)
- Small colour swatches row below product (3 coloured dots)
- Next/prev arrow indicator: "<>" icon in a small circle

━━━ SIDE STACK (right column, 3 cards stacked) ━━━

Card A — Popular Colors:
- Title: "Popular Colors" — Syne 16px bold
- Row of 6 large coloured circles: blue, orange, green, coral, mint, purple
- White card, rounded-[20px], p-5

Card B — Featured Product:
- Title: "New Gen X-Bud" (or your equivalent product name)
- Small product image (gradient placeholder), product overlaps card edge
- Small circular arrow button (→) bottom left
- White card, rounded-[20px], p-4
- On hover: card lifts with shadow increase

Card C — Trending Product:
- Larger card, product image takes 60% of card height
- Product name: "Light Grey Surface Headphone" (or your product)
- Subtext: "Boosted with bass" / "Premium quality"
- Star rating: ⭐ 4.7 badge in lime green
- Circular arrow button bottom
- White card, rounded-[20px]

━━━ ROW 2 — Four equal info/feature cards ━━━

Card 1 — More Products:
- Title: "More Products" — Syne 16px bold
- Subtitle: "460 plus items."
- 4 small circular product thumbnails in a row (gradient placeholders)
- Red heart/wishlist icon top right
- White card, rounded-[20px], p-5

Card 2 — Social Proof:
- 3 overlapping avatar circles (gradient placeholders)
- Large stat: "5m+" — Syne, 28px, bold, lime green background pill
- Label: "Downloads" below the stat
- Star: "⭐ 4.6 reviews"
- White card, rounded-[20px], p-5

Card 3 — Popular Release:
- Badge: "🔥 Popular" — small red/pink badge
- Title: "Shopping Has Been Reimagined" — Syne 18px bold
- 3 small circular product images overlapping
- White card, rounded-[20px], p-5

Card 4 — Featured Large Product:
- Full card background: large product image (gradient placeholder)
- Circular arrow button top right
- Title + subtitle at bottom over product
- Star rating badge
- White card, rounded-[20px], overflow hidden

━━━ TRENDING PRODUCTS CAROUSEL (full width) ━━━
- Full grid span (12 cols)
- Inside a white rounded card with padding
- Title: "Trending Now" — Syne bold
- Horizontal scrollable row of product cards (show 4 desktop, 1.5 mobile)
- Each product card: rounded-[16px], bg #F7F7F5 (off-white), 
  product image floating above, name below, price bold,
  heart wishlist icon, "Add" pill button in lime green on hover
- Left/right arrow controls inside circular buttons
- Smooth scroll, swipeable on mobile

━━━ CATEGORY GRID (4 cards) ━━━
- 4 equal cards: Women's | Men's | Home & Living | Beauty
- Each: large gradient placeholder image, category name 
  in Syne bold white text at bottom with dark gradient overlay,
  circular arrow button (→), rounded-[20px]
- On hover: image zooms 1.04, arrow button slides in

━━━ TRUST BADGES CARD (full width) ━━━
- Single white card spanning full width
- 4 items in a row: 🚚 Free Delivery · 🔒 Secure Checkout · 
  📦 Easy Returns · 🇿🇼 Local Support
- Each: icon, bold title, small muted description
- Card: rounded-[20px], p-6
```

---

## PRODUCT CATALOGUE PAGE (/shop)

```
Build the ShopZim product catalogue page in the bento card style.

Background: #F0F0F0

Layout:
- Top: page title "Shop All" in Syne bold + result count
- Below: horizontal filter pills row (scrollable on mobile):
  All · Women's · Men's · Home · Beauty · On Sale
  Active filter: lime green background #C8FF00, black text
  Inactive: white bg, grey text, grey border
- Sort dropdown: glass-effect pill on the right

FILTER DRAWER (mobile):
- Bottom sheet drawer, glass background, rounded-t-[24px]
- Filter options: Category, Price range slider, Size pills, Colour swatches
- "Apply Filters" button: full width, lime green
- Close: swipe down or X button

PRODUCT GRID:
- 4 columns desktop, 2 columns tablet, 2 columns mobile
- Each product card is its own bento card:
  - Background: white, rounded-[20px], shadow-sm
  - Product image area: bg #F7F7F5 (off-white), rounded-[16px] 
    inside the card, aspect 1:1
  - Product image: floating centred, slightly oversized 
    (use scale and negative margin to make it pop out)
  - Wishlist heart: top right of image area, white circle 
    with heart icon, fills red on toggle (Zustand)
  - Badge (if sale/new): lime green or orange pill, top left
  - Below image: product name (Syne 14px bold), category (Inter 12px muted)
  - Price: bold current, strikethrough original if sale
  - "Add to Cart" button: rounded-full, lime green bg, black text,
    appears on hover (desktop), always visible (mobile)
  - On hover: card lifts translateY(-4px), shadow increases,
    product image scales up slightly

SKELETON LOADING: 
- Shimmer cards matching the same rounded card shape
- Use Framer Motion for smooth grid re-layout on filter change

EMPTY STATE:
- Sad shopping bag illustration
- "No products found" — try adjusting filters
- "Reset Filters" button in lime green
```

---

## PRODUCT DETAIL PAGE (/shop/[slug])

```
Build the product detail page in the bento card style.

Background: #F0F0F0
Layout: Two bento cards side by side on desktop, stacked on mobile.

LEFT CARD — Image Gallery:
- Large white card, rounded-[24px], p-6
- Main image area: bg #F7F7F5, rounded-[20px], aspect 4:5
- Product image: floats above the grey background with drop shadow,
  slightly oversized with negative margin/overflow visible
- Floating decorative dots around product (lime, grey, accent colour)
  with subtle float animation
- Thumbnail strip below: 4 small rounded-[12px] thumbnails
- Active thumbnail: lime green border ring
- On desktop: hover on main image zooms in
- On mobile: swipeable carousel with dot indicators

RIGHT CARD — Product Info:
- Large white card, rounded-[24px], p-8 desktop / p-5 mobile
- Breadcrumb: Home > Women's > Dresses (muted, small, Inter)
- Badge: "SALE" lime green pill or "NEW" pill if applicable
- Product name: Syne, 28px desktop / 22px mobile, weight 700
- Rating row: ⭐⭐⭐⭐⭐ 4.7 (128 reviews) — clickable
- Price: Syne 32px bold, current price. 
  If sale: original price strikethrough, savings in lime green pill
  "You save $20 (31%)"

Size selector:
  Label: "Size" + "Size Guide" link
  Pill buttons: rounded-full, bg #F0F0F0, selected fills lime green #C8FF00
  Unavailable: muted, cursor not-allowed

Colour selector:
  Label: "Colour: Navy Blue"
  Circle swatches: 32px, coloured fill, selected has double ring border
  Clicking swaps main product image gradient tone

Quantity stepper:
  Rounded-full container, bg #F0F0F0
  Minus / number / Plus — lime green on active
  Min 1, max 10

Stock line:
  "✓ In stock — only 4 left!" with orange urgency dot

Action buttons:
  "Add to Cart" — full width, lime green #C8FF00, black text, 
  rounded-full, height 56px, Syne 15px bold
  On press: scale(0.97) animation, then cart icon bounces in navbar

  "Buy Now" — full width, #1A1A1A dark background, white text, 
  rounded-full, height 56px

  Small heart button beside "Add to Cart" — circular, outline, 
  toggles filled red (Zustand wishlist)

Expandable accordion cards (styled as mini bento cards inside this card):
  "🚚 Delivery & Returns" — rounded-[14px] bg #F7F7F5 
  "📋 Product Details" — rounded-[14px] bg #F7F7F5

BELOW BOTH CARDS:
Related Products section:
- Title: "You Might Also Like" — Syne bold
- 4 product cards in the same bento style as catalogue
- Horizontal scroll on mobile
```

---

## CART DRAWER

```
Build a slide-out cart drawer for ShopZim in the glassmorphism style.

Trigger: clicking cart icon in navbar.
Slides in from the right.
Backdrop: semi-transparent dark overlay (rgba(0,0,0,0.3) + blur)

Drawer surface:
- Width: 420px desktop, 100% mobile
- Background: rgba(255,255,255,0.88), backdrop-filter: blur(24px)
- Border-left: 1px solid rgba(0,0,0,0.05)
- Rounded-l-[24px] on desktop (rounded left corners only)
- Full height, scrollable content

HEADER:
- "Your Cart" — Syne 20px bold
- "(3 items)" — muted
- X close button: circular, bg #F0F0F0, hover bg #E5E5E5

ITEM LIST (scrollable middle):
Each item in a mini bento card:
- White card, rounded-[16px], p-4, flex row
- Product thumbnail: 72x72px, rounded-[12px], bg #F7F7F5
- Info: product name (Syne 14px), variant "Size M · Blue" (muted),
  price bold
- Quantity stepper: small pill, bg #F0F0F0, rounded-full
- Remove: small X icon, muted, hover turns red
- Swipe left to delete on mobile (optional — nice touch)

PROMO CODE:
- Expandable: "Have a promo code?" text link
- Input: rounded-full, bg #F0F0F0 + "Apply" pill button
- Success: "✓ WELCOME10 applied" green badge
- Error: red text below

ORDER SUMMARY:
- Inside a bg #F7F7F5 rounded-[16px] card at bottom
- Subtotal, Delivery, Discount (if promo), Total
- Total: Syne 20px bold

FOOTER (sticky bottom):
- "Proceed to Checkout" — lime green #C8FF00, black text, 
  rounded-full, full width, height 52px, bold
- Below: "🔒 Secure checkout · EcoCash · PayPal · Card" muted text
- "Continue Shopping" — text link, muted

EMPTY STATE:
- Large shopping bag outline icon, muted
- "Your cart is empty" — Syne 18px
- "Start Shopping →" — lime green pill button

Framer Motion:
- Drawer: slide from x: 420 to x: 0, ease-out 0.3s
- Backdrop: fade in 0.2s
- Items: stagger in on open
- Remove item: height collapse + fade out
```

---

## CHECKOUT (/checkout)

```
Build a 3-step checkout in the bento card style.

Background: #F0F0F0

Layout: Two columns desktop — main form card left (8 cols), 
order summary card right (4 cols). Stacked on mobile.

PROGRESS BAR (inside a glass card at top):
- 3 steps: Details → Delivery → Payment
- Steps as circles connected by line
- Completed: lime green filled circle with white checkmark
- Current: white circle with lime green ring, pulsing
- Upcoming: #E5E5E5 circle
- Line fills lime green as you progress
- All inside a rounded-[20px] white card, p-4

MAIN FORM CARD (left):
White card, rounded-[24px], p-8 desktop / p-5 mobile

Step 1 — Delivery Details:
- All inputs: rounded-[14px], bg #F7F7F5, border transparent,
  focus ring: lime green, font-size 16px (prevents iOS zoom),
  height 52px
- Fields: First Name + Last Name (side by side), Email, WhatsApp,
  Address Line 1, Address Line 2, City (select), Province
- "Continue" button: lime green, rounded-full, full width

Step 2 — Delivery Method:
- Radio cards: rounded-[16px], bg #F7F7F5, border transparent
  Selected: white bg, lime green border, shadow-sm
  1. Standard (3–5 days) — $5 / Free over $50
  2. Express (1–2 days) — $12
  3. Click & Collect Harare CBD — FREE

Step 3 — Payment:
- Tab cards for payment method:
  Tab style: rounded-[14px] pills, selected lime green bg

  EcoCash tab (default):
  - EcoCash phone number input
  - "You'll receive a USSD prompt to confirm $XX.00"
  - "Pay with EcoCash" button — lime green

  OneMoney tab:
  - Same as EcoCash layout

  Card / PayPal tab:
  - Card number, Expiry, CVV inputs
  - "Pay $XX.00" button — lime green

ORDER SUMMARY CARD (right):
White card, rounded-[24px], p-6, sticky on desktop

- Title: "Order Summary" — Syne bold
- Item list: product thumbnails + names + qty + price
- "Edit Cart" link
- Divider
- Subtotal, Delivery, Discount, Total (bold, Syne 20px)
- Promo code input at bottom
- Trust badges: payment icons, secure checkout text

On mobile: order summary is a collapsible card above the form
```

---

## ORDER CONFIRMATION

```
Build an order confirmation page for ShopZim.

Background: #F0F0F0, single centred card

Card: white, rounded-[24px], max-w-xl, mx-auto, p-10 desktop / p-6 mobile

Content:
- Large animated lime green checkmark (Framer Motion draw + scale spring)
- Confetti burst animation on page load (small particles, 2 seconds)
- Headline: "Order Confirmed! 🎉" — Syne 28px bold
- "Thank you for shopping with ShopZim"
- Order number: "#SZ-00142" in a lime green pill
- Items ordered (mini cards with thumbnails)
- Delivery address summary
- Estimated delivery: "3–5 business days"
- Total paid: bold

Two buttons:
- "Continue Shopping" — lime green, rounded-full
- "Track Your Order" — outline, muted (non-functional for demo)

WhatsApp note: "We'll send updates to your WhatsApp ✓"
```

---

## MOBILE BOTTOM NAVIGATION

```
Build a mobile-only bottom navigation bar for ShopZim.
Visible only on mobile (hidden md:hidden).

Style: glass effect — rgba(255,255,255,0.82), backdrop-blur-xl,
rounded-t-[20px], shadow upward (0 -4px 20px rgba(0,0,0,0.06))

Fixed to bottom, full width, height 68px, z-50

4 tabs:
1. 🏠 Home → /
2. 🔍 Shop → /shop
3. ♡ Saved → /wishlist (badge if items, lime green dot)
4. 🛍 Cart → opens cart drawer (badge if items, lime green count)

Active tab: lime green icon + label
Inactive: #9CA3AF grey icon + label, Inter 10px
Tab label font: 10px, medium weight

Add pb-24 to all page content on mobile so nothing hides behind bar.
```

---

## FOOTER

```
Build a footer for ShopZim in the bento style.

The footer itself is a large white card:
- Rounded-t-[32px] (rounds only at top, flush with page bottom)
- Background: white
- Padding: py-12 px-8 desktop / py-8 px-5 mobile

Grid: 4 columns desktop, 2 tablet, 1 mobile

Column 1 — Brand:
- "ShopZim" — Syne, bold, 18px
- Tagline: "Zimbabwe's favourite online store"
- "🇿🇼 Proudly Zimbabwean"
- Social icons in small circles: bg #F0F0F0, hover bg lime green
- Newsletter: email input (rounded-full, bg #F0F0F0) + 
  "Subscribe" circular arrow button, lime green

Column 2 — Shop:
- Links: New Arrivals, Women's, Men's, Home & Living, Beauty, Sale

Column 3 — Help:
- FAQs, Shipping, Returns, Size Guide, Track Order, Contact

Column 4 — About:
- About ShopZim, Careers, Blog, Terms, Privacy

Bottom bar:
- Thin top border rgba(0,0,0,0.06)
- Left: "© 2025 ShopZim. All rights reserved."
- Centre: Payment method pills (EcoCash, OneMoney, PayPal, Visa, MC)
  Each in a small rounded-[8px] bg #F0F0F0 badge
- Right: "Website by Kaps Media · kapsmedia.co.zw" (REQUIRED)
```

---

## GLOBAL ANIMATIONS & INTERACTIONS

```
Apply these globally across the entire ShopZim website:

FRAMER MOTION DEFAULTS:
- Section/card reveal: fade up (y: 16 → 0, opacity 0 → 1), 
  duration 0.5s, ease: [0.25, 0.1, 0.25, 1]
- Stagger between bento cards: 0.08s
- All animations: once: true (don't replay on scroll back)

HOVER STATES:
- All cards: translateY(-3px) + shadow increases on hover (0.2s)
- CTA buttons: scale(1.02), background brightens slightly
- Button press: scale(0.97) for 0.1s
- Product images: scale(1.04) inside overflow-hidden container
- Links: colour transitions to lime green

FLOATING DECORATIVE DOTS:
- Add 3–5 small coloured dots (6-10px circles) around the hero 
  product image. Colours: lime #C8FF00, blue #2563EB, grey #D1D5DB
- Each dot: position absolute, Framer Motion animate 
  y: [0, -6, 0] with different durations (2.5s, 3.5s, 4s), 
  repeat: Infinity — creates a gentle floating effect

TOAST NOTIFICATIONS:
- Appear bottom-left as a rounded-[16px] glass card
- "✓ Added to cart" — with lime green check
- "♡ Saved to wishlist" — with red heart
- Auto-dismiss 3 seconds, manual X close
- Stack up to 3, push up animation

LOADING:
- Skeleton shimmer cards: rounded-[20px], bg #E5E5E5 shimmer
- Page transitions: smooth fade (0.3s)
- Product grid filter change: Framer Motion layout animation

PERFORMANCE:
- next/image for ALL product images, lazy loading
- Cart + wishlist: Zustand with persist middleware (localStorage)
- All filtering/sorting: client-side instant (no API calls)
- Fonts: preload Syne + Inter in layout.tsx

MOBILE:
- Font minimum 14px body, 16px inputs
- Tap targets 44px minimum
- overflow-x: hidden on body
- Test: 375px, 390px, 414px, 768px

ACCESSIBILITY:
- Keyboard navigation on all interactive elements
- ARIA labels on icon-only buttons
- Skip to content link
- Colour contrast WCAG AA

FOOTER CREDIT (MANDATORY on every page):
"Website by Kaps Media · kapsmedia.co.zw"
```

---

## QUICK-START PROMPT (paste this into Windsurf first)

```
Build a full e-commerce website for "ShopZim" — a modern fashion store 
based in Zimbabwe. The design uses a BENTO GRID DASHBOARD aesthetic with 
glassmorphism cards on a soft grey background.

Stack: Next.js 14, Tailwind CSS, Framer Motion, shadcn/ui, Zustand, TypeScript.

Design: Soft grey page background #F0F0F0. White cards with rounded-[20px] 
and subtle shadows. Glass-effect navbar (backdrop-blur). Lime green accent 
#C8FF00 for CTAs and badges. Fonts: Syne (headings, bold) + Inter (body). 
Products float above cards with drop shadows and decorative floating dots.

Home: bento grid with large hero card (headline + floating product image + 
CTA), side stack of 3 feature cards (Popular Colors, Featured Product, 
Trending), info row (4 equal cards with social proof/stats), trending 
products carousel, 4 category cards, trust badges card.

Shop (/shop): filter pills + 4-col product grid in bento cards.
Product (/shop/[slug]): two bento cards side by side — image gallery left, 
product info right with size/colour selectors and Add to Cart.
Cart: glass slide-out drawer from right with mini bento item cards.
Checkout: 3-step (Details → Delivery → Payment with EcoCash/OneMoney/Card), 
bento cards layout.
Order confirmation: centred card with animated checkmark + confetti.
Mobile bottom nav: glass bar with 4 tabs (Home, Shop, Saved, Cart).
Footer: white card with rounded top, 4 columns, payment badges, 
"Website by Kaps Media · kapsmedia.co.zw".

Use 16 mock products across 4 categories (women, men, home, beauty) 
with gradient placeholders as product images.
```

---

## MOCK PRODUCT DATA

```typescript
// /lib/products.ts — same data from before, works with this design

export const products = [
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

## 21st.dev COMPONENTS TO SEARCH FOR
- `bento-grid` — base grid layout
- `glass-card` or `glassmorphism` — card surfaces  
- `animated-counter` — social proof numbers
- `product-card` — e-commerce card patterns
- `floating-navbar` — glass nav bar
- `slide-over` or `drawer` — cart drawer
- `pricing-card` — checkout order summary

## MOBBIN SEARCH TERMS
- "glassmorphism e-commerce"
- "bento dashboard shopping"
- "product card rounded modern"
- "checkout glass card"
- "mobile bottom navigation e-commerce"

## DEPLOY CHECKLIST
- [ ] Bento grid looks correct at 1280px, 768px, and 375px
- [ ] Cart drawer opens/closes smoothly
- [ ] Wishlist hearts toggle correctly (persist on refresh)
- [ ] Cart badge count updates live
- [ ] All 3 checkout steps navigate correctly
- [ ] EcoCash payment UI renders on Step 3
- [ ] Mobile bottom nav works, doesn't cover content
- [ ] Floating dots animate in hero section
- [ ] Filter pills work on /shop page
- [ ] "Website by Kaps Media · kapsmedia.co.zw" in every footer
- [ ] Deploy to Vercel

