"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "@/db/schema";
import ProductCard from "@/components/ProductCard";
import { useLang } from "@/lib/i18n";

type SortKey = "featured" | "priceLow" | "priceHigh" | "rating";

const PACK_FILTERS = [
  { id: "250", label: "250 g" },
  { id: "500", label: "500 g" },
  { id: "1kg", label: "1 kg" },
  { id: "combo", label: "Combo" },
  { id: "soon", label: "Coming soon" },
];

const PRICE_FILTERS = [
  { id: "u250", label: "Under ₹250", test: (p: number) => p < 250 },
  { id: "250-500", label: "₹250 – ₹500", test: (p: number) => p >= 250 && p <= 500 },
  { id: "o500", label: "Above ₹500", test: (p: number) => p > 500 },
];

const matchPack = (id: string, p: Product) => {
  const s = (p.packLabel + p.slug).toLowerCase();
  if (id === "soon") return !p.available;
  if (!p.available) return false;
  return s.includes(id);
};

export default function ShopBrowser({ products }: { products: Product[] }) {
  const { t } = useLang();
  const [packs, setPacks] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [openFilters, setOpenFilters] = useState(false);

  const toggle = (
    list: string[],
    set: (v: string[]) => void,
    id: string,
  ) => set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const visible = useMemo(() => {
    let rows = products.filter((p) => {
      if (inStockOnly && !p.available) return false;
      if (packs.length && !packs.some((id) => matchPack(id, p))) return false;
      if (prices.length) {
        const priceTests = PRICE_FILTERS.filter((f) => prices.includes(f.id));
        if (!priceTests.some((f) => f.test(p.price))) return false;
      }
      return true;
    });
    rows = [...rows];
    if (sort === "priceLow") rows.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") rows.sort((a, b) => b.price - a.price);
    if (sort === "rating") rows.sort((a, b) => b.rating - a.rating);
    if (sort === "featured") rows.sort((a, b) => a.sortOrder - b.sortOrder);
    return rows;
  }, [products, packs, prices, inStockOnly, sort]);

  const activeCount = packs.length + prices.length + (inStockOnly ? 1 : 0);

  const filters = (
    <div className="space-y-8">
      <div>
        <p className="eyebrow border-b border-ink/25 pb-2 text-palm">
          Availability
        </p>
        <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm text-ink-2 hover:text-palm">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 accent-[#E2610A]"
          />
          {t("inStock")} only
        </label>
      </div>

      <div>
        <p className="eyebrow border-b border-ink/25 pb-2 text-palm">Pack size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PACK_FILTERS.map((f) => {
            const on = packs.includes(f.id);
            return (
              <button
                key={f.id}
                onClick={() => toggle(packs, setPacks, f.id)}
                aria-pressed={on}
                className={`rounded-full border px-3.5 py-1.5 text-[0.74rem] font-semibold transition-colors ${
                  on
                    ? "border-palm bg-palm text-kraft"
                    : "border-ink/30 text-ink-2 hover:border-palm hover:text-palm"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="eyebrow border-b border-ink/25 pb-2 text-palm">
          Price band
        </p>
        <div className="mt-3 space-y-2">
          {PRICE_FILTERS.map((f) => {
            const on = prices.includes(f.id);
            return (
              <label
                key={f.id}
                className="flex cursor-pointer items-center gap-3 text-sm text-ink-2 hover:text-palm"
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(prices, setPrices, f.id)}
                  className="h-4 w-4 accent-[#E2610A]"
                />
                {f.label}
              </label>
            );
          })}
        </div>
      </div>

      {activeCount > 0 && (
        <button
          onClick={() => {
            setPacks([]);
            setPrices([]);
            setInStockOnly(false);
          }}
          className="eyebrow text-orange underline underline-offset-4"
        >
          Clear all ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-28 border-l-2 border-ink/25 pl-5">
          <p className="eyebrow mb-5 text-orange">{t("filters")}</p>
          {filters}
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/25 pb-4">
          <p className="eyebrow text-ink-2">
            {visible.length} of {products.length} products
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenFilters((v) => !v)}
              className="eyebrow flex items-center gap-2 rounded-full border border-ink/30 px-4 py-2 text-ink-2 lg:hidden"
            >
              <SlidersHorizontal size={13} /> {t("filters")}
              {activeCount > 0 && ` (${activeCount})`}
            </button>
            <label className="flex items-center gap-2">
              <span className="eyebrow text-ink-2">{t("sortBy")}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-ink/30 bg-paper px-3 py-2 text-[0.78rem] text-palm outline-none focus:border-orange"
              >
                <option value="featured">{t("featured")}</option>
                <option value="priceLow">{t("priceLow")}</option>
                <option value="priceHigh">{t("priceHigh")}</option>
                <option value="rating">{t("rating")}</option>
              </select>
            </label>
          </div>
        </div>

        {openFilters && (
          <div className="mt-5 border border-ink/25 bg-paper p-5 lg:hidden">{filters}</div>
        )}

        {visible.length === 0 ? (
          <div className="mt-10 border border-dashed border-ink/35 p-12 text-center">
            <p className="font-display text-2xl text-palm">
              Nothing matches those filters
            </p>
            <p className="mt-2 text-sm text-ink-2">
              We only make one mix — try clearing a filter.
            </p>
            <button
              onClick={() => {
                setPacks([]);
                setPrices([]);
                setInStockOnly(false);
              }}
              className="eyebrow mt-6 rounded-full bg-palm px-6 py-3 text-kraft"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {visible.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
