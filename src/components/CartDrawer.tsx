"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { FREE_SHIPPING_THRESHOLD, money } from "@/lib/catalog";

export default function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotal, count, ready } =
    useCart();
  const { t } = useLang();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="absolute inset-0 h-full w-full bg-palm-3/55 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="surface-paper absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/20 px-5 py-4">
              <div>
                <p className="eyebrow text-orange">Your basket</p>
                <h2 className="font-display text-2xl text-palm">
                  {count} {count === 1 ? "item" : "items"}
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-ink/25 p-2 transition-colors hover:bg-ink/10"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border-b border-ink/15 bg-kraft px-5 py-3">
              <p className="text-[0.78rem] text-ink-2">
                {ready && remaining > 0 ? (
                  <>
                    Add <strong className="text-palm">{money(remaining)}</strong>{" "}
                    for free shipping
                  </>
                ) : (
                  <strong className="text-palm">{t("freeShip")} ✓</strong>
                )}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/15">
                <motion.div
                  className="h-full rounded-full bg-orange"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 160, damping: 24 }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              {!ready ? null : lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <div className="mb-5 rounded-full border border-dashed border-ink/35 p-6">
                    <ShoppingBag size={30} className="text-ink-2" />
                  </div>
                  <p className="font-display text-2xl text-palm">
                    {t("emptyCart")}
                  </p>
                  <p className="mt-2 max-w-[16rem] text-sm text-ink-2">
                    {t("emptyCartSub")}
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className="eyebrow mt-6 rounded-full bg-palm px-6 py-3 text-kraft transition-colors hover:bg-palm-2"
                  >
                    {t("shopTheMix")}
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-ink/15">
                  {lines.map((l) => (
                    <motion.li
                      key={l.slug}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-4 py-4"
                    >
                      <Link
                        href={`/product/${l.slug}`}
                        onClick={() => setOpen(false)}
                        className="h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-ink/20 bg-kraft"
                      >
                        <img
                          src={l.image}
                          alt={l.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-[1.05rem] leading-tight text-palm">
                          {l.name}
                        </p>
                        <p className="eyebrow mt-1 text-ink-2">{l.packLabel}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center rounded-full border border-ink/25">
                            <button
                              onClick={() => setQty(l.slug, l.qty - 1)}
                              className="px-2.5 py-1.5 text-ink hover:text-orange"
                              aria-label="Decrease"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="tabular w-6 text-center text-sm font-semibold">
                              {l.qty}
                            </span>
                            <button
                              onClick={() => setQty(l.slug, l.qty + 1)}
                              className="px-2.5 py-1.5 text-ink hover:text-orange"
                              aria-label="Increase"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="tabular font-display text-lg text-palm">
                            {money(l.price * l.qty)}
                          </span>
                          <button
                            onClick={() => remove(l.slug)}
                            className="ml-auto text-ink-2 transition-colors hover:text-clay"
                            aria-label="Remove"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {ready && lines.length > 0 && (
              <div className="border-t border-ink/20 bg-kraft px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-ink-2">{t("subtotal")}</span>
                  <span className="tabular font-display text-3xl text-palm">
                    {money(subtotal)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className="mt-4 block rounded-full bg-orange py-3.5 text-center text-[0.78rem] font-bold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5"
                >
                  {t("checkout")}
                </Link>
                <p className="mt-3 text-center text-[0.72rem] text-ink-2">
                  Orders are confirmed on WhatsApp · +91 79040 20044
                </p>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
