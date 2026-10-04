"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ta";

const en = {
  shop: "Shop",
  story: "Our Story",
  faq: "FAQ",
  cart: "Cart",
  heroKicker: "Sprouted · Stone-ground · Small batch",
  heroTitle: "Palmyra tuber health mix",
  heroSub:
    "Hand-milled in Ramanathapuram from ten sprouted ingredients. No preservatives, no added sugar — the family mix our grandmothers made, sealed in foil.",
  shopTheMix: "Shop the mix",
  buyNow: "Buy 250 g",
  shopAll: "Shop all packs",
  seeIngredients: "See the 10 ingredients",
  addedToCart: "Added to your cart",
  addToCart: "Add to cart",
  comingSoon: "Coming soon",
  soldOut: "Sold out",
  filters: "Filters",
  sortBy: "Sort",
  featured: "Featured",
  priceLow: "Price: low to high",
  priceHigh: "Price: high to low",
  rating: "Top rated",
  all: "All",
  inStock: "In stock",
  subtotal: "Subtotal",
  shipping: "Shipping",
  total: "Total",
  checkout: "Checkout",
  emptyCart: "Your cart is empty",
  emptyCartSub: "The 250 g pouch is a good place to start.",
  freeShip: "Free shipping over ₹499",
  whyTitle: "Why families choose Nutrilings",
  reviewsTitle: "What mothers are saying",
  writeReview: "Write a review",
  orderWhatsapp: "Order on WhatsApp",
  continue: "Continue",
  storyTitle: "From our palms to your kitchen",
};

const ta: Record<keyof typeof en, string> = {
  shop: "கடை",
  story: "நமது கதை",
  faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
  cart: "கூடை",
  heroKicker: "முளைகட்டிய · கல்லரை அரைத்த · சிறு தொகுதி",
  heroTitle: "பால்மி கிழங்கு ஆரோக்கிய மிக்ஸ்",
  heroSub:
    "பத்து முளைகட்டிய பொருட்களில் இருந்து ராமநாதபுரத்தில் கைஅரைத்தது. பாதுகாப்புப் பொருள் இல்லை, சர்க்கரை சேர்க்கவில்லை.",
  shopTheMix: "மிக்ஸை வாங்கு",
  buyNow: "250 கிராம் வாங்கு",
  shopAll: "அனைத்து பொட்டலங்களும்",
  seeIngredients: "10 பொருட்களைப் பாருங்கள்",
  addedToCart: "கூடையில் சேர்க்கப்பட்டது",
  addToCart: "கூடையில் சேர்",
  comingSoon: "விரைவில்",
  soldOut: "முடிந்தது",
  filters: "வடிகட்டிகள்",
  sortBy: "வரிசைப்படுத்து",
  featured: "சிறப்பு",
  priceLow: "விலை: குறைவு → அதிகம்",
  priceHigh: "விலை: அதிகம் → குறைவு",
  rating: "அதிக மதிப்பீடு",
  all: "அனைத்தும்",
  inStock: "கையிருப்பு உள்ளது",
  subtotal: "கூட்டுத்தொகை",
  shipping: "டெலிவரி",
  total: "மொத்தம்",
  checkout: "ஆர்டர் செய்",
  emptyCart: "உங்கள் கூடை காலியாக உள்ளது",
  emptyCartSub: "250 கிராம் பவுச்சுடன் தொடங்கலாம்.",
  freeShip: "₹499 மேல் இலவச டெலிவரி",
  whyTitle: "குடும்பங்கள் நுட்ரிலிங்ஸ் தேர்வு செய்வதன் காரணம்",
  reviewsTitle: "தாய்மார்கள் சொல்வது",
  writeReview: "மதிப்பீடு எழுது",
  orderWhatsapp: "வாட்ஸ்அப்பில் ஆர்டர்",
  continue: "தொடர்க",
  storyTitle: "நமது பனையில் இருந்து உங்கள் சமையலறை வரை",
};

const dict = { en, ta };
export type DictKey = keyof typeof en;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("nutrilings.lang");
      if (saved === "ta" || saved === "en") setLang(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem("nutrilings.lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: (k) => dict[lang][k] }),
    [lang],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
