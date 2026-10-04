import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import HeroCopy from "@/components/HeroCopy";
import ProductCard from "@/components/ProductCard";
import IngredientWheel from "@/components/IngredientWheel";
import { getProducts, getReviews } from "@/lib/shop";
import { whatsappLink } from "@/lib/catalog";

const TICKER = [
  "Sprouted Ragi",
  "Palmyra Sprout",
  "Foxtail Millet",
  "Sprouted Green Gram",
  "Chana Dal",
  "Pumpkin Seeds",
  "Cardamom",
  "Amla",
  "Dates",
  "Sweet Potato",
];

const WHY = [
  {
    icon: Leaf,
    title: "Sprouted, then sun-dried",
    body: "Every grain and pulse is sprouted for 48 hours on cotton cloth in open courtyards before it is milled.",
  },
  {
    icon: ShieldCheck,
    title: "FSSAI licensed kitchen",
    body: "Lic. 12424023000000. Batch number and mill date printed on the back of every pouch.",
  },
  {
    icon: Sparkles,
    title: "Nothing added, ever",
    body: "No preservatives, no maltodextrin, no added sugar, no artificial flavour. Ten ingredients, listed in full.",
  },
  {
    icon: Truck,
    title: "Dispatched in 24 hours",
    body: "Packed in a foil barrier pouch, shipped from Ramanathapuram across Tamil Nadu and India.",
  },
];

const STEPS = [
  "Measure one heaped tablespoon (15 g) into a small bowl.",
  "Stir in 3 tbsp room-temperature water until completely smooth.",
  "Add 200 ml hot milk or hot water, stir on low heat for 3 minutes.",
  "Cool to lukewarm and serve — once a day, from 6 months upward.",
];

const FAQS = [
  {
    q: "How do I order and pay?",
    a: "Add what you need to the cart, fill in your address at checkout, and press the WhatsApp button. Your order reaches us as a pre-filled message on +91 79040 20044. We confirm stock the same day and send a UPI link — or you can pay cash on delivery inside Tamil Nadu.",
  },
  {
    q: "From what age can children take this?",
    a: "From 6 months, once solids have been introduced, in a thin porridge consistency. Most families move to a fuller spoon by 1 year. If your baby has a specific condition, please ask your paediatrician first.",
  },
  {
    q: "How long does a pouch stay fresh?",
    a: "Nine months from the mill date. Keep the pouch sealed, away from sunlight, and use a dry spoon — moisture is the only enemy of the powder.",
  },
  {
    q: "Is there really no added sugar?",
    a: "None. The gentle sweetness comes from dates and sweet potato already in the mix. Nothing else is added at any stage.",
  },
  {
    q: "When does the Women's Health Mix launch?",
    a: "It is in its final trial batch now. Send us a WhatsApp message and we will notify you first when the limited first run ships.",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const reviews = await getReviews("palmyra");
  const heroProduct = products.find((p) => p.slug.includes("250g")) ?? products[0];
  const featured = products.filter((p) => p.available).slice(0, 3);
  const sample = reviews.slice(0, 3);
  const avgRating = reviews.length
    ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length
    : 0;

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-ink/25 surface-kraft">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-14 border-r border-ink/20 lg:block"
        >
          <span className="absolute bottom-16 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.4em] text-ink-2 [writing-mode:vertical-rl]">
            Our tradition, your health · Est. 2024 · Ramanathapuram
          </span>
        </div>

        <div className="mx-auto grid max-w-[1240px] items-center gap-8 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:pb-24 lg:pt-16 lg:pl-20">
          <HeroCopy
            slug={heroProduct.slug}
            price={heroProduct.price}
            badge={heroProduct.badge ?? "Fresh batch"}
            rating={avgRating}
            reviewCount={reviews.length}
          />

          <div className="relative lg:col-span-5 lg:-ml-16">
            <Reveal delay={0.1} y={40}>
              <div className="grain relative overflow-hidden border border-ink/25 shadow-[0_50px_80px_-50px_rgba(20,48,21,0.95)]">
                <img
                  src="images/hero-pouch.jpg"
                  alt="Nutrilings Palmyra Tuber Health Mix pouch beside fresh palmyra sprouts"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-palm-3/90 to-transparent p-5">
                  <div>
                    <p className="eyebrow text-gold">Family Health Mix</p>
                    <p className="font-display text-2xl text-kraft">
                      Sprouted goodness
                    </p>
                  </div>
                  <p className="tabular font-display text-3xl text-kraft">
                    250 g
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full border border-dashed border-gold lg:block" />
          </div>
        </div>
      </section>

      {/* ---------- TICKER ---------- */}
      <div className="overflow-hidden border-b border-ink/25 bg-palm py-3">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-8">
              {TICKER.map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="eyebrow flex items-center gap-8 text-kraft/80"
                >
                  {item}
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- WHY ---------- */}
      <section className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/70 pb-4">
            <h2 className="font-display text-4xl text-palm sm:text-5xl">
              Why families choose Nutrilings
            </h2>
            <p className="eyebrow text-ink-2">Four promises · printed on every pouch</p>
          </div>
        </Reveal>

        <div className="grid border-l border-t border-ink/20 sm:grid-cols-2">
          {WHY.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group h-full border-b border-r border-ink/20 p-7 transition-colors hover:bg-paper">
                <div className="flex items-start gap-4">
                  <span className="tabular font-display text-3xl text-orange">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <item.icon size={17} className="text-palm" />
                      <h3 className="font-display text-xl text-palm">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-2">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FEATURED COLLECTION ---------- */}
      <section className="border-y border-ink/25 bg-palm-3 py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-gold">Featured collection</p>
                <h2 className="mt-3 font-display text-4xl text-kraft sm:text-5xl">
                  One mix, three pouches
                </h2>
              </div>
              <Link
                href="/shop"
                className="eyebrow flex items-center gap-2 text-kraft/80 transition-colors hover:text-orange"
              >
                View the shop <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- STORY ---------- */}
      <section id="story" className="relative scroll-mt-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <Reveal rotate={1}>
            <div className="grain relative overflow-hidden border border-ink/25">
              <img
                src="images/palmyra-palms.jpg"
                alt="Palmyra palms at golden hour near Ramanathapuram"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <span className="eyebrow absolute bottom-4 left-4 bg-kraft px-3 py-1.5 text-palm">
                Est. 2024 · Ramanathapuram
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow text-orange">Our tradition, your health</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-palm sm:text-5xl">
              From our palms to your kitchen
            </h2>
            <p className="mt-5 leading-relaxed text-ink-2">
              Ramanathapuram is palm country. When the rains arrive, the palmyra
              sends up a tender sprout beneath the soil — sweet, calcium-rich and
              gone within weeks. Our mothers grated, dried and stored it for the
              year, then milled it with ragi and green gram for the children.
            </p>
            <blockquote className="mt-6 border-l-2 border-orange pl-5 font-display text-xl italic leading-relaxed text-palm">
              “We were never trying to build a brand. We were trying to keep the
              recipe alive for our own children — and then for yours.”
              <footer className="mt-3 text-sm not-italic uppercase tracking-[0.16em] text-ink-2">
                — The Nutrilings kitchen
              </footer>
            </blockquote>
            <div className="mt-7 grid grid-cols-3 gap-4 border-t border-ink/25 pt-6">
              {[
                ["10", "Whole ingredients"],
                ["0", "Preservatives"],
                ["9 mo", "Shelf life"],
              ].map(([big, small]) => (
                <div key={small}>
                  <p className="tabular font-display text-4xl text-palm">
                    {big}
                  </p>
                  <p className="eyebrow mt-1 text-ink-2">{small}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- INGREDIENT WHEEL ---------- */}
      <section className="border-y border-ink/25 surface-paper py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow text-orange">The recipe, in the round</p>
              <h2 className="mt-3 font-display text-4xl text-palm sm:text-5xl">
                Ten ingredients orbit one sprout
              </h2>
              <p className="mt-4 text-ink-2">
                The same diagram we print on the pouch. Tap any ingredient to
                read what it is doing there.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <IngredientWheel
              ingredients={heroProduct.ingredients}
              centerImage="images/palmyra-tubers.jpg"
            />
          </div>
        </div>
      </section>

      {/* ---------- HOW TO PREPARE ---------- */}
      <section id="how" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <Reveal>
            <p className="eyebrow text-orange">How to prepare</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-palm sm:text-5xl">
              Four minutes, one spoon
            </h2>
            <ol className="mt-8">
              {STEPS.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-5 border-t border-ink/20 py-5 last:border-b"
                >
                  <span className="tabular font-display text-3xl text-orange">
                    {i + 1}
                  </span>
                  <p className="pt-1 leading-relaxed text-ink-2">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.12} rotate={-1}>
            <div className="grain relative overflow-hidden border border-ink/25">
              <img
                src="images/porridge-bowl.jpg"
                alt="Bowl of prepared health mix porridge with a wooden spoon"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- REVIEWS PREVIEW ---------- */}
      <section className="border-y border-ink/25 bg-kraft-2/60 py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/30 pb-4">
            <h2 className="font-display text-4xl text-palm sm:text-5xl">
              What mothers are saying
            </h2>
            <span className="eyebrow text-ink-2">
              {avgRating.toFixed(1)} average · {reviews.length} reviews
            </span>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {sample.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.07}>
                <figure className="flex h-full flex-col border border-ink/25 bg-paper p-6">
                  <Stars rating={r.rating} size={14} />
                  <blockquote className="mt-4 font-display text-lg leading-snug text-palm italic">
                    “{r.title}”
                  </blockquote>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink-2">
                    {r.body.slice(0, 160)}…
                  </p>
                  <figcaption className="eyebrow mt-5 border-t border-ink/15 pt-4 text-ink-2">
                    {r.author} · {r.location}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- COMING SOON ---------- */}
      <section id="notify" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-stretch gap-0 border border-ink/25 md:grid-cols-2">
          <div className="relative min-h-[260px] overflow-hidden">
            <img
              src="images/pouring-milk.jpg"
              alt="Hands pouring milk into a cup of health mix"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-palm-3/35" />
            <span className="eyebrow absolute left-5 top-5 bg-orange px-3 py-1.5 text-white">
              Coming soon
            </span>
          </div>
          <div className="bg-paper p-8 lg:p-12">
            <p className="eyebrow text-orange">Next from the kitchen</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-palm">
              Women&apos;s Health Mix
            </h2>
            <p className="mt-4 leading-relaxed text-ink-2">
              Vendhayam, amla, rose petal, sprouted ragi and palm jaggery —
              built for mothers, young women and anyone rebuilding strength.
              Higher iron, same ten-day sprouting process, no added sugar.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink-2">
              {[
                "Iron-rich blend with vendhayam & amla",
                "Launching in limited first batches",
                "Notify list opens on WhatsApp",
              ].map((li) => (
                <li key={li} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-orange" />
                  {li}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(
                "Hello Nutrilings 🌿 Please notify me when the Women's Health Mix launches.",
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-palm px-7 py-4 text-[0.76rem] font-bold uppercase tracking-[0.18em] text-palm transition-colors hover:bg-palm hover:text-kraft"
            >
              Join the notify list
            </a>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="border-t border-ink/25 surface-paper py-16 scroll-mt-24 lg:py-24">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow text-orange">Questions</p>
            <h2 className="mt-3 font-display text-4xl text-palm sm:text-5xl">
              Good to know before you order
            </h2>
          </Reveal>
          <div className="mt-8 border-t border-ink/25">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group border-b border-ink/25 py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-xl text-palm transition-colors hover:text-orange sm:text-2xl">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/30 text-lg transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] leading-relaxed text-ink-2">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
