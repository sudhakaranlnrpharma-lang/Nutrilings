"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { money, whatsappLink, WHATSAPP_NUMBER } from "@/lib/catalog";

type Placed = {
  code: string;
  whatsapp: string;
  total: number;
};

type FormKey =
  | "name"
  | "phone"
  | "email"
  | "address"
  | "city"
  | "pincode"
  | "notes";

type Field = {
  id: FormKey;
  label: string;
  placeholder: string;
  type: string;
  wide?: boolean;
};

const FIELDS: Field[] = [
  { id: "name", label: "Full name", placeholder: "e.g. Kavitha Ramanathan", type: "text" },
  { id: "phone", label: "WhatsApp number", placeholder: "10-digit mobile", type: "tel" },
  { id: "email", label: "Email (optional)", placeholder: "you@example.com", type: "email" },
  { id: "address", label: "Delivery address", placeholder: "Door no., street, landmark", type: "text", wide: true },
  { id: "city", label: "Town / City", placeholder: "e.g. Karaikudi", type: "text" },
  { id: "pincode", label: "PIN code", placeholder: "630001", type: "text" },
  { id: "notes", label: "Notes for us (optional)", placeholder: "Ring the bell twice…", type: "text", wide: true },
];

export default function CheckoutPage() {
  const { lines, subtotal, shipping, total, clear, ready } = useCart();
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState<Placed | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  });

  const stepLabels = ["Your details", "Review & confirm", "Order placed"];

  const nextFromDetails = () => {
    setError("");
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (form.phone.replace(/\D/g, "").length < 10)
      return setError("Please enter a valid 10-digit WhatsApp number.");
    if (form.address.trim().length < 6)
      return setError("Please enter your delivery address.");
    if (form.city.trim().length < 2) return setError("Please enter your town or city.");
    if (!/^\d{6}$/.test(form.pincode.trim()))
      return setError("Please enter a valid 6-digit PIN code.");
    setStep(1);
  };

  const placeOrder = async () => {
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Could not place the order.");
      setPlaced({ code: data.order.code, whatsapp: data.whatsapp, total: data.order.total });
      setStep(2);
      clear();
      window.setTimeout(() => {
        window.open(whatsappLink(data.whatsapp), "_blank", "noopener");
      }, 600);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:py-20">
      <p className="eyebrow text-orange">Checkout</p>
      <h1 className="mt-3 font-display text-5xl leading-[0.92] text-palm sm:text-6xl">
        Three steps, <span className="italic text-clay">then WhatsApp</span>
      </h1>

      {/* step rail */}
      <ol className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-ink/25 py-4">
        {stepLabels.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`grid h-7 w-7 place-items-center rounded-full text-[0.72rem] font-bold ${
                i <= step ? "bg-orange text-white" : "bg-ink/12 text-ink-2"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </span>
            <span
              className={`text-[0.78rem] uppercase tracking-[0.14em] ${
                i === step ? "text-palm" : "text-ink-2"
              }`}
            >
              {label}
            </span>
            {i < 2 && <span className="mx-2 hidden h-px w-8 bg-ink/30 sm:block" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {FIELDS.map((f) => (
                    <label
                      key={f.id}
                      className={`block ${f.wide ? "sm:col-span-2" : ""}`}
                    >
                      <span className="eyebrow text-ink-2">{f.label}</span>
                      <input
                        type={f.type}
                        value={form[f.id]}
                        placeholder={f.placeholder}
                        onChange={(e) =>
                          setForm({ ...form, [f.id]: e.target.value })
                        }
                        className="mt-1.5 w-full border border-ink/30 bg-paper px-3.5 py-3 outline-none transition-colors focus:border-orange"
                      />
                    </label>
                  ))}
                </div>
                {error && <p className="mt-4 text-sm text-clay">{error}</p>}
                <button
                  onClick={nextFromDetails}
                  className="mt-6 flex items-center gap-2 rounded-full bg-palm px-7 py-4 text-[0.76rem] font-bold uppercase tracking-[0.18em] text-kraft transition-colors hover:bg-orange"
                >
                  Review order <ArrowRight size={15} />
                </button>
                {lines.length === 0 && (
                  <p className="mt-4 text-sm text-ink-2">
                    Your cart is empty —{" "}
                    <Link href="/shop" className="underline hover:text-orange">
                      add a pouch first
                    </Link>
                    .
                  </p>
                )}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border border-ink/25 bg-paper">
                  <p className="eyebrow border-b border-ink/20 bg-kraft px-5 py-3 text-palm">
                    Deliver to
                  </p>
                  <div className="px-5 py-4 text-[0.95rem] leading-relaxed text-ink-2">
                    <p className="font-semibold text-palm">{form.name}</p>
                    <p>{form.address}</p>
                    <p>
                      {form.city} — {form.pincode}
                    </p>
                    <p className="tabular mt-1">+91 {form.phone}</p>
                    {form.notes && (
                      <p className="mt-2 text-sm italic">“{form.notes}”</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 border border-ink/25 bg-paper">
                  <p className="eyebrow border-b border-ink/20 bg-kraft px-5 py-3 text-palm">
                    {lines.length} {lines.length === 1 ? "item" : "items"}
                  </p>
                  <ul className="divide-y divide-ink/15">
                    {lines.map((l) => (
                      <li
                        key={l.slug}
                        className="flex items-center gap-4 px-5 py-3.5"
                      >
                        <img
                          src={l.image}
                          alt=""
                          className="h-12 w-12 border border-ink/20 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-palm">
                            {l.name}
                          </p>
                          <p className="eyebrow text-ink-2">
                            {l.packLabel} × {l.qty}
                          </p>
                        </div>
                        <span className="tabular font-display text-lg text-palm">
                          {money(l.price * l.qty)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {error && <p className="mt-4 text-sm text-clay">{error}</p>}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setStep(0)}
                    className="flex items-center gap-2 rounded-full border border-ink/30 px-6 py-4 text-[0.76rem] font-bold uppercase tracking-[0.16em] text-ink-2 hover:border-palm hover:text-palm"
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                  <button
                    onClick={placeOrder}
                    disabled={sending || lines.length === 0}
                    className="flex items-center gap-2 rounded-full bg-orange px-7 py-4 text-[0.76rem] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    <MessageCircle size={16} />
                    {sending ? "Placing order…" : "Place order on WhatsApp"}
                  </button>
                </div>

                <p className="mt-4 max-w-md text-[0.82rem] leading-relaxed text-ink-2">
                  Your order is saved with reference{" "}
                  <strong className="text-palm">NUT-…</strong> and sent to us as
                  a pre-filled WhatsApp message. Nothing is charged now — we
                  confirm stock and share the UPI link on WhatsApp.
                </p>
              </motion.div>
            )}

            {step === 2 && placed && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border border-palm/40 bg-paper p-7"
              >
                <CheckCircle2 size={40} className="text-palm-2" />
                <h2 className="mt-4 font-display text-4xl text-palm">
                  Order {placed.code} received
                </h2>
                <p className="mt-3 leading-relaxed text-ink-2">
                  Thank you, {form.name.split(" ")[0]}. We have your order for{" "}
                  <strong className="text-palm">{money(placed.total)}</strong>.
                  Press the button below to send it to us on WhatsApp — if the
                  tab did not open automatically, the message is ready for you.
                </p>

                <a
                  href={whatsappLink(placed.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#1E4620] px-7 py-4 text-[0.76rem] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle size={16} /> Open WhatsApp · +91 {WHATSAPP_NUMBER}
                </a>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/shop"
                    className="rounded-full border border-ink/30 px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-2 hover:border-palm hover:text-palm"
                  >
                    Continue shopping
                  </Link>
                  <Link
                    href="/"
                    className="rounded-full border border-ink/30 px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-2 hover:border-palm hover:text-palm"
                  >
                    Back home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-ink/25 bg-palm-3 p-6 text-kraft">
            <p className="eyebrow text-gold">Order summary</p>
            {!ready ? null : lines.length === 0 && step === 2 && placed ? (
              <div className="mt-4 text-center">
                <p className="eyebrow text-gold">Order {placed.code}</p>
                <p className="mt-3 font-display text-4xl text-kraft">
                  {money(placed.total)}
                </p>
                <p className="mt-3 text-sm text-kraft/70">
                  Saved and waiting for your WhatsApp confirmation.
                </p>
              </div>
            ) : lines.length === 0 ? (
              <div className="py-6 text-center">
                <ShoppingBag size={26} className="mx-auto text-kraft/60" />
                <p className="mt-3 font-display text-xl">Your cart is empty</p>
                <Link
                  href="/shop"
                  className="eyebrow mt-4 inline-block rounded-full bg-orange px-5 py-2.5 text-white"
                >
                  Shop the mix
                </Link>
              </div>
            ) : (
              <>
                <ul className="mt-4 space-y-2.5 text-sm text-kraft/80">
                  {lines.map((l) => (
                    <li key={l.slug} className="flex justify-between gap-3">
                      <span className="truncate">
                        {l.packLabel}{" "}
                        <span className="text-kraft/50">× {l.qty}</span>
                      </span>
                      <span className="tabular shrink-0">
                        {money(l.price * l.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-5 space-y-2 border-t border-kraft/20 pt-4 text-sm">
                  <div className="flex justify-between text-kraft/80">
                    <dt>Subtotal</dt>
                    <dd className="tabular">{money(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-kraft/80">
                    <dt>Shipping</dt>
                    <dd className="tabular">
                      {shipping === 0 ? "Free" : money(shipping)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-kraft/20 pt-3">
                    <dt className="eyebrow text-gold">Total</dt>
                    <dd className="tabular font-display text-4xl text-kraft">
                      {money(total)}
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-[0.76rem] leading-relaxed text-kraft/60">
                  Free shipping over {money(499)} · UPI or cash on delivery ·
                  Dispatched within 24 hours from Ramanathapuram.
                </p>
              </>
            )}
          </div>

          <div className="mt-4 border border-dashed border-ink/35 p-5 text-[0.84rem] leading-relaxed text-ink-2">
            <p className="eyebrow mb-2 text-palm">Prefer to talk?</p>
            Message us directly on{" "}
            <a
              href={`https://wa.me/91${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-orange underline underline-offset-4"
            >
              +91 {WHATSAPP_NUMBER}
            </a>{" "}
            between 9 am and 8 pm IST.
          </div>
        </aside>
      </div>
    </section>
  );
}
