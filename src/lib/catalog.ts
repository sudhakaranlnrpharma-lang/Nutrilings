import type {
  Ingredient,
  NutritionRow,
  OrderItem,
  PrepareStep,
} from "@/db/schema";

export const WHATSAPP_NUMBER = "7904020044";
export const WHATSAPP_INTL = "917904020044";
export const FREE_SHIPPING_THRESHOLD = 499;
export const SHIPPING_FEE = 40;

export const money = (value: number) =>
  "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const IMAGES = [
  "images/hero-pouch.jpg",
  "images/palmyra-tubers.jpg",
  "images/ingredients-flatlay.jpg",
  "images/porridge-bowl.jpg",
  "images/pouring-milk.jpg",
  "images/palmyra-palms.jpg",
];

const sharedIngredients: Ingredient[] = [
  { name: "Palmyra Sprout", short: "கற்பூரவள்ளி", benefit: "Calcium & natural energy", note: "Hand-dug tubers from Ramanathapuram palms, sprouted and sun-dried." },
  { name: "Sprouted Ragi", short: "கேழ்வரகு", benefit: "Bone-strengthening calcium", note: "Sprouted for 48 hours so the calcium becomes easier to absorb." },
  { name: "Sprouted Green Gram", short: "பச்சை பயறு", benefit: "Plant protein", note: "Sprouted to lift protein and aid gentle digestion." },
  { name: "Foxtail Millet", short: "தினை", benefit: "Slow-release fibre", note: "Keeps little tummies full and steady for longer." },
  { name: "Chana Dal", short: "கொண்டைக்கடலை", benefit: "Protein & B vitamins", note: "Dry-roasted in small batches before milling." },
  { name: "Pumpkin Seeds", short: "பரங்கிக்கொட்டை", benefit: "Iron & zinc", note: "A handful per batch for iron that children need." },
  { name: "Cardamom", short: "ஏலக்காய்", benefit: "Digestive comfort", note: "Whole green cardamom, ground fresh — the only flavouring." },
  { name: "Amla", short: "நெல்லிக்காய்", benefit: "Vitamin C immunity", note: "Sun-dried amla keeps its vitamin C through milling." },
  { name: "Dates", short: "பேரீச்சம்பழம்", benefit: "Natural sweetness", note: "The only sugar in the tin — none is added." },
  { name: "Sweet Potato", short: "சர்க்கரைவள்ளிக்கிழங்கு", benefit: "Vitamin A", note: "Slow-dried slices for gentle, natural sweetness." },
];

const sharedNutrition: NutritionRow[] = [
  { label: "Energy", value: "382 kcal" },
  { label: "Protein", value: "9.4 g" },
  { label: "Dietary fibre", value: "11.2 g" },
  { label: "Calcium", value: "168 mg" },
  { label: "Iron", value: "4.6 mg" },
  { label: "Total sugars", value: "6.1 g" },
];

const sharedPrepare: PrepareStep[] = [
  {
    title: "Measure one spoon",
    body: "Add 1 heaped tablespoon (15 g) of Nutrilings health mix to a small bowl.",
  },
  {
    title: "Mix smooth first",
    body: "Stir in 3 tbsp of room-temperature water or milk until no lumps remain.",
  },
  {
    title: "Cook for three minutes",
    body: "Pour in 200 ml hot milk or hot water and stir continuously on low heat.",
  },
  {
    title: "Cool and serve",
    body: "Cool to a comfortable temperature. Serve once a day, from 6 months upward.",
  },
];

const DESCRIPTION = `Milled from palmyra sprout — the tender tuber that pushes up beneath a Ramanathapuram palm — this is the family health mix our grandmothers made before packaged food arrived. Ten ingredients are sprouted, sun-dried on cotton cloth, stone-ground in small batches and sieved twice.

No preservatives. No added sugar. No artificial flavours. Just the powder, sealed in a 250 g kraft pouch with a foil barrier so it stays fresh for nine months. Stir a spoon into hot milk and it drinks like a light, nutty porridge.`;

export type SeedProduct = Omit<
  typeof import("@/db/schema").products.$inferInsert,
  "id" | "createdAt" | "rating" | "reviewCount"
> & { rating?: number; reviewCount?: number };

const base = {
  family: "palmyra",
  category: "Health Mix",
  available: true,
  stock: 180,
  image: IMAGES[0],
  description: DESCRIPTION,
  highlights: [
    "Sprouted, sun-dried, stone-ground",
    "No preservatives or added sugar",
    "FSSAI Lic. 12424023000000",
    "Milled in Ramanathapuram, TN",
  ],
  ingredients: sharedIngredients,
  nutrition: sharedNutrition,
  prepare: sharedPrepare,
  images: [IMAGES[0], IMAGES[1], IMAGES[2], IMAGES[3]],
};

export const seedProducts: SeedProduct[] = [
  {
    ...base,
    slug: "palmyra-tuber-health-mix-250g",
    name: "Palmyra Tuber Health Mix",
    packLabel: "250 g pouch",
    tagline: "Our everyday family mix — one spoon, ten sprouted ingredients.",
    badge: "Bestseller",
    price: 170,
    mrp: 199,
    rating: 48,
    reviewCount: 6,
    sortOrder: 1,
  },
  {
    ...base,
    slug: "palmyra-tuber-health-mix-500g",
    name: "Palmyra Tuber Health Mix",
    packLabel: "500 g pouch",
    tagline: "The month-long pouch for a household that drinks it daily.",
    badge: "Most ordered",
    price: 370,
    mrp: 430,
    stock: 96,
    rating: 48,
    reviewCount: 6,
    sortOrder: 2,
  },
  {
    ...base,
    slug: "palmyra-tuber-health-mix-1kg",
    name: "Palmyra Tuber Health Mix",
    packLabel: "1 kg pouch",
    tagline: "The value pouch — works out to ₹8.5 a serving.",
    badge: "Best value",
    price: 650,
    mrp: 780,
    stock: 41,
    rating: 48,
    reviewCount: 6,
    sortOrder: 3,
  },
  {
    ...base,
    slug: "palmyra-health-mix-combo-3",
    name: "Palmyra Tuber Health Mix",
    packLabel: "Combo · 3 × 250 g",
    tagline: "Three pouches, one carton — free shipping across Tamil Nadu.",
    badge: "Save ₹110",
    price: 480,
    mrp: 510,
    stock: 60,
    rating: 48,
    reviewCount: 6,
    sortOrder: 4,
  },
  {
    ...base,
    slug: "womens-health-mix",
    name: "Women's Health Mix",
    packLabel: "Coming soon",
    tagline: "Iron-rich mix with vendhayam, amla and rose petal — launching soon.",
    badge: "Coming soon",
    category: "Coming soon",
    available: false,
    stock: 0,
    price: 240,
    mrp: 240,
    family: "womens",
    image: "images/pouring-milk.jpg",
    images: [
      "images/pouring-milk.jpg",
      "images/ingredients-flatlay.jpg",
      "images/porridge-bowl.jpg",
      "images/palmyra-palms.jpg",
    ],
    description:
      "Our next blend, built for mothers, young women and anyone rebuilding strength after pregnancy. Vendhayam, amla, rose petal, sprouted ragi and palm jaggery — same sprouting process, higher iron. Leave your number on WhatsApp and we will message you the day it ships.",
    highlights: [
      "Higher iron, same sprouting process",
      "Vendhayam · amla · rose petal",
      "No added sugar",
      "Launching in limited batches",
    ],
    sortOrder: 5,
  },
];

export type SeedReview = Omit<
  typeof import("@/db/schema").reviews.$inferInsert,
  "id" | "createdAt"
>;

export const seedReviews: SeedReview[] = [
  {
    family: "palmyra",
    author: "Kavitha Ramanathan",
    location: "Madurai",
    rating: 5,
    title: "My daughter actually asks for it",
    body: "I have tried four health mixes and this is the first one that dissolves without lumps. My two-year-old asks for her 'porridge cup' every evening. The smell of cardamom when you open the pouch is exactly like my paati's.",
    pack: "250 g pouch",
    helpful: 34,
  },
  {
    family: "palmyra",
    author: "Suresh Kumar",
    location: "Chennai",
    rating: 5,
    title: "Fresh batch, proper seal",
    body: "Ordered the 1 kg pouch on WhatsApp Sunday night, it reached Velachery by Wednesday. Batch date printed on the back, foil seal intact. Works out to about eight rupees a serving which is cheaper than the cereal boxes I was buying.",
    pack: "1 kg pouch",
    helpful: 21,
  },
  {
    family: "palmyra",
    author: "Divya Anand",
    location: "Coimbatore",
    rating: 5,
    title: "Clean ingredients list — only ten things",
    body: "I read every label because of my son's allergies. This one has ten ingredients, all of them things I recognise, and nothing ending in -ose or -ide. The sprouted ragi is a big plus for his bones.",
    pack: "500 g pouch",
    helpful: 18,
  },
  {
    family: "palmyra",
    author: "Fathima Basheer",
    location: "Ramanathapuram",
    rating: 4,
    title: "Tastes like home, wish the scoop was included",
    body: "Genuinely close to what we make at home — the sweetness comes only from dates, you can tell. One small request: a scoop inside would help with measuring. Otherwise perfect, ordering again.",
    pack: "250 g pouch",
    helpful: 12,
  },
  {
    family: "palmyra",
    author: "Lakshmi Venkatesan",
    location: "Tirunelveli",
    rating: 5,
    title: "Good for my mother-in-law",
    body: "Doctor asked us to add fibre to her diet. She drinks it with hot water in the morning. Her digestion settled within two weeks. We are on our third 500 g pouch.",
    pack: "500 g pouch",
    helpful: 9,
  },
  {
    family: "palmyra",
    author: "Priya Dharshan",
    location: "Bengaluru",
    rating: 5,
    title: "Arrived in three days, packed properly",
    body: "Came in a carton with paper padding, no plastic. The powder is fine and pale beige, not the dull brown you get from old stock. Will buy the combo next time.",
    pack: "Combo · 3 × 250 g",
    helpful: 7,
  },
];

export type SeedOrder = Omit<
  typeof import("@/db/schema").orders.$inferInsert,
  "id" | "createdAt" | "code" | "status"
>;

export function buildWhatsAppMessage(order: {
  code: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes?: string | null;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}) {
  const lines = [
    "Hello Nutrilings 🌿 I'd like to place an order.",
    "",
    `Order ref: ${order.code}`,
    "",
    "Items:",
    ...order.items.map(
      (i) => `• ${i.name} — ${i.packLabel} × ${i.qty} = ${money(i.price * i.qty)}`,
    ),
    "",
    `Subtotal: ${money(order.subtotal)}`,
    `Shipping: ${order.shipping === 0 ? "Free" : money(order.shipping)}`,
    `Total: ${money(order.total)}`,
    "",
    "Deliver to:",
    `${order.name}`,
    `${order.address}`,
    `${order.city} — ${order.pincode}`,
    `Phone: ${order.phone}`,
  ];
  if (order.notes) lines.push(`Note: ${order.notes}`);
  lines.push("", "Please confirm availability and payment details.");
  return lines.join("\n");
}

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(message)}`;
