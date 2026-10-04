"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Send } from "lucide-react";
import type { Review } from "@/db/schema";
import Stars from "@/components/Stars";
import { useLang } from "@/lib/i18n";

type Props = { family: string; reviews: Review[]; packs: string[] };

export default function ReviewsSection({ family, reviews, packs }: Props) {
  const { t } = useLang();
  const [list, setList] = useState<Review[]>(reviews);
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    author: "",
    location: "",
    pack: packs[0] ?? "",
    rating: 5,
    title: "",
    body: "",
  });

  const stats = useMemo(() => {
    const total = list.length || 1;
    const avg = list.reduce((n, r) => n + r.rating, 0) / total;
    const dist = [5, 4, 3, 2, 1].map(
      (s) => list.filter((r) => r.rating === s).length,
    );
    return { avg, dist, total: list.length };
  }, [list]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.author.trim().length < 2 || form.body.trim().length < 10) {
      setError("Please add your name and at least a sentence or two.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, family }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong");
      setList((prev) => [data.review, ...prev]);
      setOpen(false);
      setForm({
        author: "",
        location: "",
        pack: packs[0] ?? "",
        rating: 5,
        title: "",
        body: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/25 pb-4">
        <h2 className="font-display text-4xl text-palm sm:text-5xl">
          {t("reviewsTitle")}
        </h2>
        <button
          onClick={() => setOpen((v) => !v)}
          className="eyebrow rounded-full border border-palm px-5 py-2.5 text-palm transition-colors hover:bg-palm hover:text-kraft"
        >
          {t("writeReview")}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={submit}
            className="overflow-hidden"
          >
            <div className="mt-6 grid gap-4 border border-ink/25 bg-paper p-6 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow text-ink-2">Your name</span>
                <input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="mt-1.5 w-full border border-ink/25 bg-kraft px-3 py-2.5 outline-none focus:border-orange"
                  placeholder="e.g. Meena R."
                />
              </label>
              <label className="block">
                <span className="eyebrow text-ink-2">Town / City</span>
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="mt-1.5 w-full border border-ink/25 bg-kraft px-3 py-2.5 outline-none focus:border-orange"
                  placeholder="e.g. Karaikudi"
                />
              </label>
              <label className="block">
                <span className="eyebrow text-ink-2">Pack bought</span>
                <select
                  value={form.pack}
                  onChange={(e) => setForm({ ...form, pack: e.target.value })}
                  className="mt-1.5 w-full border border-ink/25 bg-kraft px-3 py-2.5 outline-none focus:border-orange"
                >
                  {packs.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="eyebrow text-ink-2">Rating</span>
                <div className="mt-1.5 flex gap-1.5 border border-ink/25 bg-kraft px-3 py-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, rating: s })}
                      className={`h-7 w-7 rounded-full text-sm font-bold transition-colors ${
                        s <= form.rating
                          ? "bg-orange text-white"
                          : "bg-ink/10 text-ink-2"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow text-ink-2">Headline</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1.5 w-full border border-ink/25 bg-kraft px-3 py-2.5 outline-none focus:border-orange"
                  placeholder="Sum it up in a few words"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow text-ink-2">Your review</span>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  rows={4}
                  className="mt-1.5 w-full resize-none border border-ink/25 bg-kraft px-3 py-2.5 outline-none focus:border-orange"
                  placeholder="How is it working for your family?"
                />
              </label>
              {error && (
                <p className="text-sm text-clay sm:col-span-2">{error}</p>
              )}
              <div className="sm:col-span-2">
                <button
                  disabled={sending}
                  className="flex items-center gap-2 rounded-full bg-palm px-6 py-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-kraft transition-colors hover:bg-orange disabled:opacity-60"
                >
                  <Send size={14} />
                  {sending ? "Posting…" : "Post review"}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="tabular font-display text-7xl leading-none text-palm">
            {stats.avg.toFixed(1)}
          </p>
          <Stars rating={stats.avg} size={16} className="mt-3" />
          <p className="mt-2 text-sm text-ink-2">
            {stats.total === 0
              ? "No reviews yet — be the first when this launches."
              : `Based on ${stats.total} verified ${
                  stats.total === 1 ? "review" : "reviews"
                }`}
          </p>
          <div className="mt-5 space-y-1.5">
            {stats.dist.map((count, i) => {
              const star = 5 - i;
              const pct = stats.total ? (count / stats.total) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="tabular w-3 text-ink-2">{star}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/12">
                    <motion.div
                      className="h-full bg-orange"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.05 }}
                    />
                  </div>
                  <span className="tabular w-5 text-right text-ink-2">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <ul className="space-y-5">
          {list.map((r) => (
            <li
              key={r.id}
              className="border border-ink/20 bg-paper p-6 transition-shadow hover:shadow-[0_20px_40px_-32px_rgba(20,48,21,0.9)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-palm font-display text-sm text-kraft">
                    {r.author.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-palm">{r.author}</p>
                    <p className="text-[0.74rem] uppercase tracking-[0.12em] text-ink-2">
                      {r.location} · {r.pack}
                    </p>
                  </div>
                </div>
                <Stars rating={r.rating} size={14} />
              </div>
              <h3 className="mt-4 font-display text-xl text-palm">
                {r.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-2">{r.body}</p>
              {r.verified && (
                <p className="eyebrow mt-4 flex items-center gap-1.5 text-palm-2">
                  <BadgeCheck size={14} /> Verified purchase
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
