"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const items = images.length ? images : ["images/hero-pouch.jpg"];

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex((next + items.length) % items.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div>
      <div className="grain relative aspect-square overflow-hidden border border-ink/25 bg-kraft-2 sm:aspect-[4/3] lg:aspect-square">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={items[index]}
            src={items[index]}
            alt={`${alt} — view ${index + 1}`}
            initial={{ opacity: 0, x: dir * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -30 }}
            transition={{ duration: 0.35, ease: [0.16, 0.8, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <span className="eyebrow absolute left-4 top-4 bg-kraft px-3 py-1.5 text-palm">
          {index + 1} / {items.length}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {items.map((src, i) => (
          <button
            key={src}
            onClick={() => go(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === index}
            className={`aspect-square overflow-hidden border transition-all ${
              i === index
                ? "border-orange ring-1 ring-orange"
                : "border-ink/25 opacity-70 hover:opacity-100"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
