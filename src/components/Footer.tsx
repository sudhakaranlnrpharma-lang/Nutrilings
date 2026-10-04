import Link from "next/link";
import Logo from "@/components/Logo";
import { WHATSAPP_NUMBER } from "@/lib/catalog";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-palm-3 text-kraft">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo className="text-[34px]" />
          <p className="mt-5 max-w-xs font-display text-[0.98rem] leading-relaxed text-kraft/70 italic">
            “Our tradition, your health” — sprouted, sun-dried and stone-ground
            the way Ramanathapuram households have done for generations.
          </p>
        </div>

        <div>
          <p className="eyebrow text-gold">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-kraft/80">
            <li>
              <Link className="hover:text-orange" href="/shop">
                All products
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-orange"
                href="/product/palmyra-tuber-health-mix-250g"
              >
                250 g pouch
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-orange"
                href="/product/palmyra-health-mix-combo-3"
              >
                Combo · 3 × 250 g
              </Link>
            </li>
            <li className="text-kraft/50">Women&apos;s Health Mix — soon</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Help</p>
          <ul className="mt-4 space-y-2 text-sm text-kraft/80">
            <li>
              <Link className="hover:text-orange" href="/#how">
                How to prepare
              </Link>
            </li>
            <li>
              <Link className="hover:text-orange" href="/#faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-orange" href="/checkout">
                Checkout
              </Link>
            </li>
            <li>
              <a
                className="hover:text-orange"
                href={`https://wa.me/91${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">Order on WhatsApp</p>
          <a
            href={`https://wa.me/91${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-display text-3xl text-white hover:text-orange"
          >
            +91 {WHATSAPP_NUMBER}
          </a>
          <p className="mt-3 text-sm leading-relaxed text-kraft/70">
            We take orders on WhatsApp, 9 am – 8 pm IST. Payment on delivery or
            UPI link. Dispatched within 24 hours from Ramanathapuram.
          </p>
        </div>
      </div>

      <div className="border-t border-kraft/15">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-4 py-5 text-[0.72rem] uppercase tracking-[0.16em] text-kraft/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© 2026 Nutrilings · Est. 2024</span>
          <span>FSSAI Lic. 12424023000000 · Ramanathapuram, Tamil Nadu</span>
        </div>
      </div>
    </footer>
  );
}
