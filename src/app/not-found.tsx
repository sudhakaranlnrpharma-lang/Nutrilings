import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[760px] flex-col items-center justify-center px-4 text-center">
      <p className="eyebrow text-orange">404</p>
      <h1 className="mt-4 font-display text-5xl text-palm sm:text-6xl">
        This pouch is not on the shelf
      </h1>
      <p className="mt-4 max-w-md text-ink-2">
        The page you asked for does not exist — but the health mix does.
      </p>
      <Link
        href="/shop"
        className="eyebrow mt-8 rounded-full bg-palm px-7 py-4 text-kraft transition-colors hover:bg-orange"
      >
        Go to the shop
      </Link>
    </section>
  );
}
