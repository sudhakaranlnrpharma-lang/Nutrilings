import type { Metadata } from "next";
import ShopBrowser from "@/components/ShopBrowser";
import { getProducts } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Shop — Nutrilings Health Mix | 250 g, 500 g, 1 kg & Combo",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <section className="border-b border-ink/25 surface-kraft">
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:py-16">
          <p className="eyebrow text-orange">The shop</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-5xl leading-[0.9] text-palm sm:text-7xl">
              Health mix,
              <br />
              by the pouch
            </h1>
            <p className="max-w-md text-ink-2">
              One recipe, milled fresh every week — choose the pouch size that
              matches how often your family drinks it. Women&apos;s Health Mix
              is on its way.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:py-16">
        <ShopBrowser products={products} />
      </section>
    </>
  );
}
