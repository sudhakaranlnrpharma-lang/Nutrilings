"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { Product } from "@/db/schema";
import { money } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import Stars from "@/components/Stars";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { add } = useCart();
  const { t } = useLang();
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, rotate: index % 2 ? 0.8 : -0.8 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.35) }}
      className="group flex flex-col border border-ink/20 bg-paper transition-shadow duration-300 hover:shadow-[0_26px_50px_-34px_rgba(20,48,21,0.85)]"
    >
      <Link
        href={product.available ? `/product/${product.slug}` : "/#notify"}
        className="relative block aspect-[4/3] overflow-hidden bg-kraft-2"
      >
        <img
          src={product.image}
          alt={`${product.name} ${product.packLabel}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-palm-3/35 via-transparent to-transparent" />
        {product.badge && (
          <span
            className={`eyebrow absolute left-0 top-4 px-3 py-1.5 text-[0.62rem] text-white ${
              product.available ? "bg-orange" : "bg-palm-3"
            }`}
          >
            {product.available ? product.badge : t("comingSoon")}
          </span>
        )}
        {!product.available && (
          <span className="eyebrow absolute right-3 top-4 flex items-center gap-1.5 rounded-full bg-kraft px-3 py-1.5 text-[0.6rem] text-palm">
            <Clock size={11} /> {t("comingSoon")}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.35rem] leading-tight text-palm">
            <Link href={product.available ? `/product/${product.slug}` : "/#notify"}>
              {product.name}
            </Link>
          </h3>
          <span className="eyebrow shrink-0 border border-ink/25 px-2 py-1 text-[0.58rem] text-ink-2">
            {product.packLabel}
          </span>
        </div>

        <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-2">
          {product.tagline}
        </p>

          <div className="mt-3 flex items-center gap-2 text-[0.76rem] text-ink-2">
            {product.reviewCount > 0 ? (
              <>
                <Stars rating={product.rating / 10} size={13} />
                <span className="tabular">
                  {(product.rating / 10).toFixed(1)} · {product.reviewCount}{" "}
                  reviews
                </span>
              </>
            ) : (
              <span className="eyebrow text-orange">Reviews coming soon</span>
            )}
          </div>
     
        <div className="mt-auto pt-3">
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-end gap-2">
                <span className="tabular font-display text-[1.5rem] text-palm">Rs 189</span>
                <span className="tabular text-sm text-ink/70 line-through mb-1">Rs 299</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-orange px-2 py-0.5 rounded-sm text-[10px] text-white tracking-wider font-bold">37% OFF</span>
                <span className="text-[10px] text-orange tracking-wider font-bold">LIMITED OFFER</span>
              </div>
            </div>
          </div>
        
                  <button
          disabled={!product.available}
          onClick={() =>
            add({
              slug: product.slug,
              name: product.name,
              packLabel: product.packLabel,
              price: product.price,
              mrp: product.mrp,
              image: product.image,
            })
          }
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-[0.75rem] font-bold uppercase tracking-[0.18em] transition-colors ${
            product.available
              ? "bg-palm text-kraft hover:bg-orange"
              : "cursor-not-allowed border border-dashed border-ink/30 text-ink-2"
          }`}
        >
          {product.available ? (
            <>
              <Check size={14} /> {t("addToCart")}
            </>
          ) : (
            <>
              <Clock size={13} /> {t("comingSoon")}
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
