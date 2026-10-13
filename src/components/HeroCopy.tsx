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
                      {/* MASS HANGING TAG DESIGN WITH SWING ANIMATION */}
        <style>{`
          @keyframes swing {
            0% { transform: rotate(4deg); }
            50% { transform: rotate(-4deg); }
            100% { transform: rotate(4deg); }
          }
          .animate-swing {
            animation: swing 2.5s ease-in-out infinite;
            transform-origin: top center;
          }
        `}</style>
        <div className="absolute top-0 sm:top-2 right-2 sm:right-12 w-28 bg-orange shadow-2xl rounded-b-3xl flex flex-col items-center pb-5 pt-7 z-50 border-b-4 border-[rgb(210,100,20)] animate-swing">
          <div className="absolute top-2 left-1/2 w-3 h-3 bg-[#e8e4db] rounded-full transform -translate-x-1/2 shadow-inner"></div>
          <span className="text-3xl font-black text-white leading-none tracking-tighter">37%</span>
          <span className="text-sm font-extrabold text-white uppercase mt-1">OFFER</span>
          <span className="text-[9px] font-bold text-white/90 uppercase tracking-widest text-center mt-2 border-t border-white/30 pt-2 w-4/5 leading-tight">LIMITED<br/>OFFER</span>
        </div>
       <Reveal>
        <p className="eyebrow text-orange">
          {badge} · 10 whole ingredients
        </p>
      </Reveal>
<Reveal delay={0.06}>
  <h1 className="mt-1 font-display font-bold leading-[1.1] tracking-[-0.02em] text-palm text-[size:clamp(2.5rem,6vw,4rem)]">
    NUTRILINGS HEALTH MIX POWDER
  </h1>
</Reveal>
      
      <Reveal delay={0.18}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
                              <Link
            href={`/product/${slug}`}
            className="group flex items-center gap-4 rounded-full bg-orange px-6 py-3 text-[0.85rem] font-bold uppercase tracking-wide text-white transition-all hover:bg-[rgb(210,100,20)]"
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="text-white/90">250G</span>
                <span className="line-through text-white/60 text-xs tracking-normal">Rs 299</span>
                <span className="text-xl tracking-wide">Rs 189</span>
              </div>
            </div>
            <ArrowRight
              size={24}
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
