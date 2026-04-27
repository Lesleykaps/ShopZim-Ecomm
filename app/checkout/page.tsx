"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";
import { cartKey, cartTotals, useCart } from "@/lib/store";
import { categoryGradient, cn, formatPrice, productImage } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const detailsSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Required"),
  addressLine1: z.string().min(3, "Required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "Required"),
  province: z.string().min(1, "Required"),
  instructions: z.string().optional(),
});

type Details = z.infer<typeof detailsSchema>;

const cityProvince: Record<string, string> = {
  Harare: "Harare Province",
  Bulawayo: "Bulawayo Province",
  Mutare: "Manicaland",
  Gweru: "Midlands",
  Kwekwe: "Midlands",
  Other: "Other",
};

const deliveryOptions = [
  { id: "standard", label: "Standard Delivery", desc: "3–5 business days", price: 5, note: "Free on orders over $50" },
  { id: "express", label: "Express Delivery", desc: "1–2 business days", price: 12 },
  { id: "pickup", label: "Click & Collect", desc: "Harare CBD · Mon–Sat 8AM–6PM", price: 0 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const promo = useCart((s) => s.promo);
  const clear = useCart((s) => s.clear);
  const totals = cartTotals(items, promo);

  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState<"ecocash" | "onemoney" | "paypal">("ecocash");
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<Details>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { city: "Harare", province: "Harare Province" },
  });

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-heading font-extrabold text-3xl text-ink tracking-tightest">Your cart is empty</h1>
        <Link href="/shop" className="inline-block mt-4 bg-lime hover:bg-limeHover text-ink px-6 py-3 rounded-pill font-bold transition-colors duration-150">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  const submitOrder = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    const orderId = `SZ-${Math.floor(10000 + Math.random() * 89999)}`;
    sessionStorage.setItem(
      "shopzim-last-order",
      JSON.stringify({
        id: orderId,
        details: form.getValues(),
        delivery,
        payment,
        items,
        totals,
      })
    );
    clear();
    router.push("/order-confirmation");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-10">
      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8 text-ink tracking-tightest">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center justify-between max-w-md mb-8 md:mb-10">
        {["Delivery", "Method", "Payment"].map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          return (
            <div key={label} className="flex-1 flex items-center">
              <div className={cn(
                "w-7 h-7 md:w-9 md:h-9 rounded-pill flex items-center justify-center text-[11px] md:text-xs font-bold border-2 transition-colors duration-150 shrink-0",
                done ? "bg-lime text-ink border-lime" : active ? "bg-white text-ink border-lime" : "bg-white text-muted2 border-border"
              )}>
                {done ? <Check size={12} /> : n}
              </div>
              <div className="ml-1.5 md:ml-2 mr-2 md:mr-3 text-[10px] md:text-xs font-medium">{label}</div>
              {n < 3 && <div className={cn("flex-1 h-px md:h-0.5", done ? "bg-lime" : "bg-border")} />}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-5 md:gap-8">
        <div className="bg-white rounded-[16px] md:rounded-cardLg shadow-card p-5 md:p-8 order-2 lg:order-1">
          {step === 1 && (
            <form
              onSubmit={form.handleSubmit(() => setStep(2))}
              className="space-y-4"
            >
              <h2 className="font-heading font-bold text-2xl text-ink tracking-tighter2">Delivery Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="First Name" {...form.register("firstName")} error={form.formState.errors.firstName?.message} />
                <Field label="Last Name" {...form.register("lastName")} error={form.formState.errors.lastName?.message} />
              </div>
              <Field label="Email" type="email" {...form.register("email")} error={form.formState.errors.email?.message} />
              <Field label="Phone / WhatsApp" {...form.register("phone")} error={form.formState.errors.phone?.message} />
              <Field label="Address Line 1" {...form.register("addressLine1")} error={form.formState.errors.addressLine1?.message} />
              <Field label="Address Line 2 (optional)" {...form.register("addressLine2")} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>City</Label>
                  <select
                    {...form.register("city")}
                    onChange={(e) => {
                      form.setValue("city", e.target.value);
                      form.setValue("province", cityProvince[e.target.value] ?? "");
                    }}
                    className="w-full bg-surface2 rounded-btn px-3 py-3 h-[52px] text-ink outline-none focus:ring-2 focus:ring-lime transition-all duration-150 border-0"
                  >
                    {Object.keys(cityProvince).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <Field label="Province" {...form.register("province")} />
              </div>
              <div>
                <Label>Delivery Instructions (optional)</Label>
                <textarea
                  {...form.register("instructions")}
                  className="w-full bg-surface2 rounded-btn px-3 py-2.5 min-h-[80px] text-ink outline-none focus:ring-2 focus:ring-lime transition-all duration-150 border-0"
                />
              </div>
              <button className="w-full bg-lime hover:bg-limeHover text-ink font-bold py-3.5 rounded-pill transition-colors duration-150">
                Continue to Delivery →
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-2xl text-ink tracking-tighter2">Delivery Method</h2>
              {deliveryOptions.map((o) => (
                <label
                  key={o.id}
                  className={cn(
                    "flex items-start gap-3 p-4 border rounded-card cursor-pointer transition-colors duration-150",
                    delivery === o.id ? "border-lime bg-white shadow-soft" : "border-transparent bg-surface2 hover:bg-page"
                  )}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === o.id}
                    onChange={() => setDelivery(o.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{o.label}</div>
                    <div className="text-xs text-muted">{o.desc}</div>
                    {o.note && <div className="text-xs text-lime mt-0.5">{o.note}</div>}
                  </div>
                  <div className="font-bold">{o.price === 0 ? "FREE" : formatPrice(o.price)}</div>
                </label>
              ))}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 bg-page text-ink py-3 rounded-pill font-semibold hover:bg-[#E5E5E5] transition-colors duration-150">
                  ← Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 bg-lime hover:bg-limeHover text-ink py-3 rounded-pill font-bold transition-colors duration-150">
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-2xl text-ink tracking-tighter2">Payment</h2>
              <div className="flex gap-2 border-b border-border">
                {([
                  ["ecocash", "EcoCash"],
                  ["onemoney", "OneMoney"],
                  ["paypal", "PayPal / Card"],
                ] as const).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setPayment(k)}
                    className={cn(
                      "px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors duration-150",
                      payment === k ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {payment === "ecocash" && (
                <div className="space-y-3">
                  <div className="text-sm text-muted">
                    EcoCash — instant mobile money payment.
                  </div>
                  <Field label="EcoCash Number" placeholder="07X XXX XXXX" />
                  <div className="text-xs text-muted">
                    You will receive a USSD prompt on this number to confirm payment of{" "}
                    <strong>{formatPrice(totals.total)}</strong>.
                  </div>
                  <button
                    onClick={submitOrder}
                    disabled={submitting}
                    className="w-full bg-lime hover:bg-limeHover text-ink font-bold py-3.5 rounded-pill flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-60"
                  >
                    {submitting && <Loader2 size={16} className="animate-spin" />}
                    Pay with EcoCash
                  </button>
                </div>
              )}

              {payment === "onemoney" && (
                <div className="space-y-3">
                  <Field label="OneMoney Number" placeholder="071 XXX XXXX" />
                  <button
                    onClick={submitOrder}
                    disabled={submitting}
                    className="w-full bg-lime hover:bg-limeHover text-ink font-bold py-3.5 rounded-pill flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-60"
                  >
                    {submitting && <Loader2 size={16} className="animate-spin" />}
                    Pay with OneMoney
                  </button>
                </div>
              )}

              {payment === "paypal" && (
                <div className="space-y-3">
                  <Field label="Card Number" placeholder="1234 5678 9012 3456" />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry" placeholder="MM/YY" />
                    <Field label="CVV" placeholder="123" />
                  </div>
                  <button
                    onClick={submitOrder}
                    disabled={submitting}
                    className="w-full bg-lime hover:bg-limeHover text-ink font-bold py-3.5 rounded-pill flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-60"
                  >
                    {submitting && <Loader2 size={16} className="animate-spin" />}
                    Pay {formatPrice(totals.total)}
                  </button>
                </div>
              )}

              <button onClick={() => setStep(2)} className="text-sm text-muted hover:text-ink transition-colors duration-150">
                ← Back
              </button>
            </div>
          )}
        </div>

        {/* Order summary — collapsible on mobile, sticky on desktop */}
        <CollapsibleSummary
          itemsCount={items.reduce((a, i) => a + i.quantity, 0)}
          total={formatPrice(totals.total)}
        >
        <aside className="bg-white rounded-[16px] md:rounded-cardLg shadow-card p-5 md:p-6 h-fit lg:sticky lg:top-24">
          <div className="font-heading font-bold mb-4 text-ink tracking-tighter2">Order Summary</div>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((it) => (
              <div key={cartKey(it)} className="flex gap-3">
                <div className="w-12 h-12 rounded-card shrink-0 relative overflow-hidden" style={{ background: categoryGradient(it.product.category) }}>
                  <Image
                    src={productImage(it.product.slug, 96, 96)}
                    alt={it.product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-sm">
                  <div className="font-medium line-clamp-1">{it.product.name}</div>
                  <div className="text-xs text-muted">Qty {it.quantity} · {it.size}</div>
                </div>
                <div className="text-sm font-semibold">{formatPrice(it.product.price * it.quantity)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-3 space-y-1.5 text-sm">
            <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
            <Row label="Delivery" value={totals.delivery === 0 ? "FREE" : formatPrice(totals.delivery)} />
            {totals.discount > 0 && <Row label="Discount" value={`-${formatPrice(totals.discount)}`} className="text-success" />}
            <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
              <span>Total</span>
              <span>{formatPrice(totals.total)}</span>
            </div>
          </div>
          <Link href="/cart" className="text-xs text-ink font-semibold mt-3 inline-block underline underline-offset-2 hover:text-muted">Edit Cart</Link>
        </aside>
        </CollapsibleSummary>
      </div>
    </div>
  );
}

function CollapsibleSummary({
  children,
  itemsCount,
  total,
}: {
  children: React.ReactNode;
  itemsCount: number;
  total: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="order-1 lg:order-2">
      {/* Mobile collapsible header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden w-full bg-white rounded-[16px] shadow-card p-4 flex items-center justify-between mb-3"
      >
        <div className="text-left">
          <div className="text-[11px] uppercase tracking-wider text-muted font-semibold">Order summary</div>
          <div className="font-heading font-bold text-ink text-base mt-0.5">{itemsCount} items · {total}</div>
        </div>
        <span className={cn(
          "w-8 h-8 rounded-pill bg-page flex items-center justify-center transition-transform duration-200",
          open && "rotate-180"
        )}>▾</span>
      </button>
      <div className={cn("lg:block", open ? "block" : "hidden")}>{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs text-muted mb-1.5 font-medium uppercase tracking-wider">{children}</label>;
}

const Field = ({
  label,
  error,
  ...rest
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <Label>{label}</Label>
    <input
      {...rest}
      className={cn(
        "w-full rounded-btn px-3 py-3 h-[52px] outline-none focus:ring-2 focus:ring-lime bg-surface2 text-ink placeholder:text-muted2 transition-all duration-150 border-0",
        error ? "border-red-500" : "border-border"
      )}
    />
    {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
  </div>
);

function Row({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`flex justify-between ${className ?? ""}`}>
      <span className="text-muted">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
