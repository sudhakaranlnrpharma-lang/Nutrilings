import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Gallery from "@/components/Gallery";
import BuyPanel from "@/components/BuyPanel";
import IngredientWheel from "@/components/IngredientWheel";
import ReviewsSection from "@/components/ReviewsSection";
import ProductCard from "@/components/ProductCard";
import Stars from "@/components/Stars";
import { getProduct, getProducts, getReviews } from "@/lib/shop";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product — Nutrilings" };
  return {
    title: `${product.name} (${product.packLabel}) — Nutrilings`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [all, reviews] = await Promise.all([
    getProducts(),
    getReviews(product.family),
  ]);
  const siblings = all.filter(
    (p) => p.family === product.family && p.slug !== product.slug,
  );
  const packs = [
    ...all.filter((p) => p.family === product.family).map((p) => p.packLabel),
  ];
  const familyRating = reviews.length
    ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length
    : 0;

  return (
    <>
      <div className="border-b border-ink/25 bg-kraft-2/50">
        <nav className="mx-auto flex max-w-[1240px] items-center gap-2 px-4 py-3 text-[0.74rem] uppercase tracking-[0.14em] text-ink-2 sm:px-6">
          <Link href="/" className="hover:text-orange">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-orange">
            Shop
          </Link>
          <ChevronRight size={12} />
          <span className="text-palm">{product.packLabel}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Gallery images={product.images} alt={product.name} />
          </div>

          <div>
            <p className="eyebrow text-orange">
              {product.badge ?? product.category} · {product.category}
            </p>
            <h1 className="mt-3 font-display text-5xl leading-[0.92] text-palm sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-xl italic text-clay">
              {product.tagline}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-2">
              {reviews.length > 0 && (
                <>
                  <Stars rating={familyRating} size={15} />
                  <span className="tabular">
                    {familyRating.toFixed(1)} · {reviews.length} reviews
                  </span>
                  <span className="h-4 w-px bg-ink/25" />
                </>
              )}
              <span className="eyebrow text-palm">{product.packLabel}</span>
            </div>

            <ul className="mt-7 grid gap-2 border-y border-ink/25 py-5 text-[0.94rem] text-ink-2 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-orange" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <BuyPanel product={product} />
            </div>

            <div className="mt-6">
              <p className="eyebrow mb-3 text-ink-2">Choose your pack</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/product/${product.slug}`}
                  aria-current="page"
                  className="rounded-full border border-palm bg-palm px-4 py-2 text-[0.76rem] font-semibold text-kraft"
                >
                  {product.packLabel} · current
                </Link>
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/product/${s.slug}`}
                    className="rounded-full border border-ink/30 px-4 py-2 text-[0.76rem] font-semibold text-ink-2 transition-colors hover:border-palm hover:text-palm"
                  >
                    {s.packLabel}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 border border-ink/20 bg-paper p-6">
              <p className="eyebrow text-orange">About this pouch</p>
              <div className="mt-3 space-y-4 text-[0.98rem] leading-relaxed text-ink-2">
                {product.description.split("\n\n").map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ingredients */}
      <section className="border-y border-ink/25 surface-paper py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-orange">What is inside</p>
            <h2 className="mt-3 font-display text-4xl text-palm sm:text-5xl">
              The wheel from the pouch
            </h2>
            <p className="mt-4 text-ink-2">
              Sprouted, sun-dried and stone-ground in that order. Hover or tap a
              node to read its job in the mix.
            </p>
          </div>
          <div className="mt-12">
            <IngredientWheel
              ingredients={product.ingredients}
              centerImage="images/palmyra-tubers.jpg"
            />
          </div>
        </div>
      </section>

      {/* nutrition + prepare */}
      <section className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-orange">Per 100 g</p>
            <h2 className="mt-3 font-display text-4xl text-palm">
              Nutrition, plainly
            </h2>
            <table className="mt-6 w-full border-collapse text-left">
              <tbody>
                {product.nutrition.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-ink/20 ${
                      i % 2 ? "bg-paper/70" : ""
                    }`}
                  >
                    <th
                      scope="row"
                      className="py-3.5 pr-4 font-semibold text-palm"
                    >
                      {row.label}
                    </th>
                    <td className="tabular py-3.5 text-right font-display text-xl text-ink">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-[0.8rem] text-ink-2">
              Indicative values for a 100 g sample tested at a NABL laboratory.
            </p>
          </div>

          <div>
            <p className="eyebrow text-orange">Preparation</p>
            <h2 className="mt-3 font-display text-4xl text-palm">
              How to make it
            </h2>
            <ol className="mt-6 border-t border-ink/25">
              {product.prepare.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-5 border-b border-ink/25 py-5"
                >
                  <span className="tabular font-display text-3xl text-orange">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg text-palm">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[0.94rem] leading-relaxed text-ink-2">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* reviews */}
      <div className="pb-16 lg:pb-24">
        <ReviewsSection family={product.family} reviews={reviews} packs={packs} />
      </div>

      {/* other packs */}
      {siblings.length > 0 && (
        <section className="border-t border-ink/25 bg-kraft-2/50 py-16">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/30 pb-4">
              <h2 className="font-display text-3xl text-palm sm:text-4xl">
                Other packs of the same mix
              </h2>
              <Link href="/shop" className="eyebrow text-orange">
                Back to shop
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.slice(0, 3).map((s, i) => (
                <ProductCard key={s.slug} product={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
