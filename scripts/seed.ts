import { db } from "../src/db/index";
import { products, reviews } from "../src/db/schema";
import { seedProducts, seedReviews } from "../src/lib/catalog";

async function main() {
  await db.delete(reviews);
  await db.delete(products);
  await db.insert(products).values(seedProducts);
  await db.insert(reviews).values(seedReviews);

  const rows = await db.select().from(products);
  const revs = await db.select().from(reviews);
  console.log(`Seeded ${rows.length} products and ${revs.length} reviews.`);
  for (const r of rows) {
    console.log(`  - ${r.slug} : INR ${r.price} (${r.packLabel})`);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
