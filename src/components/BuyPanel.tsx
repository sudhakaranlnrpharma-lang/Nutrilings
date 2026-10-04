"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/db/schema";
import { money } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";

export default function BuyPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const { t } = useLang();
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState(false);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const onAdd = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        packLabel: product.packLabel,
        price: product.price,
        mrp: product.mrp,
        image: product.image,
      },
      qty,
    );
    setFlash(true);
    window.setTimeout(() => setFlash(false), 1500);
  };

  return (
    <div className="border border-ink/25 bg-paper">
      <div className="flex items-center justify-between border-b border-ink/15 bg-kraft px-5 py-3">
        <span className="eyebrow flex items-center gap-2 text-palm">
          <span className="h-2 w-2 rounded-full bg-palm-2" />
          {product.available ? t("inStock") : t("comingSoon")}
        </span>
        <span className="eyebrow text-ink-2">
          Ships in 24 hrs · WhatsApp order
        </span>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-ink-2">{product.packLabel}</p>
            <p className="tabular font-display text-5xl leading-none text-palm">
              {money(product.price)}
            </p>
          </div>
          <div className="text-right">
            {off > 0 && (
              <>
                <p className="tabular text-sm text-ink-2 line-through">
                  {money(product.mrp)}
                </p>
                <p className="eyebrow bg-gold/25 px-2 py-1 text-[0.62rem] text-clay">
                  Save {money(product.mrp - product.price)}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-ink/30">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-4 py-2.5 transition-colors hover:text-orange"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="tabular w-8 text-center font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(12, q + 1))}
              className="px-4 py-2.5 transition-colors hover:text-orange"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="tabular font-display text-xl text-palm">
            {money(product.price * qty)}
          </span>
        </div>

        <button
          disabled={!product.available}
          onClick={onAdd}
          className={`mt-5 w-full rounded-full py-4 text-[0.78rem] font-bold uppercase tracking-[0.18em] transition-all ${
            product.available
              ? "bg-orange text-white hover:-translate-y-0.5 hover:bg-clay"
              : "cursor-not-allowed border border-dashed border-ink/30 text-ink-2"
          }`}
        >
          {product.available ? (
            <span className="flex items-center justify-center gap-2">
              <ShoppingBag size={15} /> {t("addToCart")}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Clock size={14} /> {t("comingSoon")}
            </span>
          )}
        </button>

        <AnimatePresence>
          {flash && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="eyebrow mt-3 text-center text-palm-2"
            >
              {t("addedToCart")}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="mt-4 text-[0.78rem] leading-relaxed text-ink-2">
          Pay by UPI or cash on delivery. Every order is confirmed by us on
          WhatsApp before dispatch.
        </p>
      </div>
    </div>
  );
}
