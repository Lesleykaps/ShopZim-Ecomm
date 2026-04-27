export const metadata = { title: "About — ShopZim" };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <div className="bg-white rounded-cardLg shadow-card p-8 md:p-12">
      <div className="text-[11px] tracking-[0.3em] text-muted font-semibold uppercase mb-3">About</div>
      <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-ink tracking-tightest leading-[0.95]">About ShopZim</h1>
      <p className="mt-6 text-muted leading-relaxed">
        ShopZim is Zimbabwe's modern fashion and lifestyle e-commerce destination —
        curating clothing, beauty and home goods for the modern Zimbabwean. We blend
        local style with global trends, support local makers and offer fast delivery
        across the country.
      </p>
      <p className="mt-4 text-muted leading-relaxed">
        Pay your way: EcoCash, OneMoney, PayPal and major cards. Free delivery on
        orders over $50, and a 30-day hassle-free returns policy on every order.
      </p>
      <h2 className="font-heading font-bold text-2xl mt-10 text-ink tracking-tighter2">Our Promise</h2>
      <ul className="mt-4 space-y-3 text-sm text-ink/80">
        <li>🇿🇼 Proudly Zimbabwean — supporting local where we can.</li>
        <li>🚚 Fast, reliable delivery across the country.</li>
        <li>💬 Real customer support based right here in Zimbabwe.</li>
        <li>🔒 Secure, trusted checkout — your data stays safe.</li>
      </ul>
      </div>
    </div>
  );
}
