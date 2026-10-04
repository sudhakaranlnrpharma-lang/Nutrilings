"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import { useLang } from "@/lib/i18n";
import { money } from "@/lib/catalog";

export default function HeroCopy({
  slug,
  price,
  badge,
  rating,
  reviewCount,
}: {
  slug: string;
  price: number;
  badge: string;
  rating: number;
  reviewCount: number;
}) {
  const { lang, t } = useLang();

  return (
    <div className="relative z-10 lg:col-span-7">
      <Reveal>
        <p className="eyebrow text-orange">
          {badge} · 10 whole ingredients
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        {lang === "en" ? (
          <h1 className="mt-4 font-display font-semibold leading-[0.86] tracking-[-0.03em] text-palm [font-size:clamp(3.1rem,11vw,8.4rem)]">
            Palmyra
            <br />
            <span className="italic text-clay">tuber</span> health mix
          </h1>
        ) : (
          <h1 className="mt-4 font-display font-semibold leading-[1.05] tracking-[-0.01em] text-palm [font-size:clamp(2.4rem,8vw,5.4rem)]">
            {t("heroTitle")}
          </h1>
        )}
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-ink-2 sm:text-[1.1rem]">
          {t("heroSub")}
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={`/product/${slug}`}
            className="group flex items-center gap-2 rounded-full bg-orange px-7 py-4 text-[0.76rem] font-bold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5"
          >
            {t("buyNow")} · {money(price)}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-palm px-7 py-4 text-[0.76rem] font-bold uppercase tracking-[0.18em] text-palm transition-colors hover:bg-palm hover:text-kraft"
          >
            {t("shopAll")}
          </Link>
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.8rem] text-ink-2">
          <span className="flex items-center gap-2">
            <Stars rating={rating} size={13} />
            <span className="tabular">
              {rating.toFixed(1)} · {reviewCount} reviews
            </span>
          </span>
          <span className="hidden h-4 w-px bg-ink/25 sm:block" />
          <span>FSSAI Lic. 12424023000000</span>
          <span className="hidden h-4 w-px bg-ink/25 sm:block" />
          <span>{t("freeShip")}</span>
        </div>
      </Reveal>
    </div>
  );
}
