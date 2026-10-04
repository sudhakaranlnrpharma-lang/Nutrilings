"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";

const links = [
  { href: "/shop", key: "shop" as const },
  { href: "/#story", key: "story" as const },
  { href: "/#faq", key: "faq" as const },
];

export default function Header() {
  const { count, setOpen, ready } = useCart();
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-palm-3 text-kraft/85">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <p className="eyebrow text-[0.6rem] sm:text-[0.68rem]">
            Free shipping over ₹499 · Milled in Ramanathapuram
          </p>
          <p className="eyebrow hidden text-[0.68rem] text-gold sm:block">
            FSSAI Lic. 12424023000000
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b border-ink/20 bg-kraft/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_10px_30px_-24px_rgba(20,48,21,0.9)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/" aria-label="Nutrilings home" className="shrink-0">
            <Logo className="text-[26px] sm:text-[30px]" tagline={false} />
          </Link>

          <nav className="ml-6 hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="eyebrow relative py-2 text-ink transition-colors hover:text-orange"
              >
                {t(l.key)}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-orange transition-all ${
                    pathname === l.href ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="flex overflow-hidden rounded-full border border-palm/40 bg-paper">
              {(["en", "ta"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-3 py-1.5 text-[0.7rem] font-bold tracking-wide transition-colors ${
                    lang === l
                      ? "bg-palm text-kraft"
                      : "text-palm hover:bg-palm/10"
                  }`}
                >
                  {l === "en" ? "EN" : "தமிழ்"}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
              aria-label={t("cart")}
            >
              <ShoppingBag size={15} strokeWidth={2.2} />
              <span className="hidden sm:inline">{t("cart")}</span>
              <span className="tabular rounded-full bg-white/25 px-1.5 py-0.5 text-[0.7rem]">
                {ready ? count : 0}
              </span>
            </button>

            <button
              onClick={() => setMenu((v) => !v)}
              className="rounded-full border border-ink/25 p-2 text-palm md:hidden"
              aria-label="Menu"
              aria-expanded={menu}
            >
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menu && (
          <nav className="border-t border-ink/15 bg-kraft px-4 py-3 md:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className="block border-b border-ink/10 py-3 font-display text-xl text-palm last:border-0"
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
