"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Ingredient } from "@/db/schema";

const INGREDIENT_IMAGES: Record<string, string> = {
  "palmyra sprout": "/images/palmyra-tubers.jpg",
  "sprouted ragi": "/images/sprouted-ragi.jpg",
  "sprouted green gram": "/images/sprouted-green-gram.jpg",
  "foxtail millet": "/images/foxtail-millet.jpg",
  "chana dal": "/images/chana-dal.jpg",
  "pumpkin seeds": "/images/pumpkin-seeds.jpg",
  "cardamom": "/images/cardamom.jpg",
  "amla": "/images/amla.jpg",
  "dates": "/images/dates.jpg",
  "sweet potato": "/images/sweet-potato.jpg",
};

export default function IngredientWheel({
  ingredients,
  centerImage,
}: {
  ingredients: Ingredient[];
  centerImage: string;
}) {
  const [active, setActive] = useState(0);
  const n = ingredients.length;
  const R = 41;

  const pos = (i: number) => {
    const a = (-90 + (i * 360) / n) * (Math.PI / 180);
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  };

  const current = ingredients[active];
  const point = pos(active);

  const activeImage =
    INGREDIENT_IMAGES[current?.name?.toLowerCase() ?? ""] || centerImage;

  return (
    <div>
      <div className="relative mx-auto aspect-square w-full max-w-[620px]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="rgba(59,50,39,0.4)"
            strokeWidth="0.35"
            strokeDasharray="1.2 1.8"
          />
          <circle
            cx="50"
            cy="50"
            r="21"
            fill="none"
            stroke="rgba(30,70,32,0.35)"
            strokeWidth="0.3"
            strokeDasharray="0.8 1.6"
          />
          <motion.line
            x1="50"
            y1="50"
            animate={{ x2: point.x, y2: point.y }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            stroke="#E2610A"
            strokeWidth="0.4"
          />
        </svg>

        <div className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            key="ring"
            className="seal-spin absolute -inset-3 rounded-full border border-dashed border-gold/70"
          />
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-palm shadow-[0_18px_40px_-22px_rgba(20,48,21,0.95)]">
            <img
              key={activeImage}
              src={activeImage}
              alt={current.name}
              onError={(e) => {
                e.currentTarget.src = centerImage;
              }}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-orange"
              animate={{ opacity: active === 0 ? 0.18 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="eyebrow absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-palm">
            {current.name}
          </span>
        </div>

        {ingredients.map((ing, i) => {
          const p = pos(i);
          const isActive = i === active;
          const words = ing.name.split(" ");
          return (
            <button
              key={ing.name}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-1.5 py-1.5 text-center transition-all duration-300 hover:z-10"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: "clamp(74px, 20%, 116px)",
                background: isActive ? "#1E4620" : "#FBF6EC",
                borderColor: isActive ? "#E2610A" : "rgba(59,50,39,0.35)",
                color: isActive ? "#F1E7D6" : "#3B3227",
                transform: `translate(-50%, -50%) scale(${isActive ? 1.08 : 1})`,
                boxShadow: isActive
                  ? "0 14px 30px -18px rgba(226,97,10,0.9)"
                  : "none",
              }}
            >
              <span
                className="block font-semibold uppercase leading-[1.15]"
                style={{
                  fontSize: "clamp(8px, 1.5vw, 11px)",
                  letterSpacing: "0.06em",
                }}
              >
                {words.map((w) => (
                  <span key={w} className="block">
                    {w}
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-10 min-h-[150px] max-w-[560px] border border-ink/25 bg-paper p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="font-display text-2xl text-palm">
                {current.name}
              </h4>
              <span className="font-display text-lg text-orange italic">
                {current.short}
              </span>
            </div>
            <p className="eyebrow mt-2 text-clay">{current.benefit}</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
              {current.note}
            </p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-5 border-t border-ink/15 pt-3 text-[0.74rem] uppercase tracking-[0.14em] text-ink-2">
          Hover or tap an ingredient · {n} whole foods, nothing else
        </p>
      </div>
    </div>
  );
}
