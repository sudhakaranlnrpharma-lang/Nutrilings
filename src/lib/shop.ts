import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, products, reviews } from "@/db/schema";
import type { Order, Product, Review } from "@/db/schema";
import { seedProducts, seedReviews, type SeedOrder } from "@/lib/catalog";

function toProduct(seed: (typeof seedProducts)[number], i: number): Product {
  return {
    id: i + 1,
    slug: seed.slug,
    family: seed.family,
    name: seed.name,
    packLabel: seed.packLabel,
    tagline: seed.tagline,
    badge: seed.badge ?? null,
    category: seed.category,
    price: seed.price,
    mrp: seed.mrp,
    stock: seed.stock ?? 0,
    available: seed.available ?? true,
    rating: seed.rating ?? 0,
    reviewCount: seed.reviewCount ?? 0,
    image: seed.image,
    images: seed.images,
    description: seed.description,
    highlights: seed.highlights,
    ingredients: seed.ingredients,
    nutrition: seed.nutrition,
    prepare: seed.prepare,
    sortOrder: seed.sortOrder ?? 0,
    createdAt: new Date(),
  };
}

export const fallbackProducts = (): Product[] => seedProducts.map(toProduct);

export const fallbackReviews = (): Review[] =>
  seedReviews.map((r, i) => ({
    id: i + 1,
    family: r.family,
    author: r.author,
    location: r.location,
    rating: r.rating,
    title: r.title,
    body: r.body,
    pack: r.pack,
    verified: r.verified ?? true,
    helpful: r.helpful ?? 0,
    createdAt: new Date(Date.now() - (i + 2) * 86400000 * 9),
  }));

export async function getProducts(): Promise<Product[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) return fallbackProducts();

    // Supabase-la irundhu namma products data-va edukkurom
    const res = await fetch(`${url}/rest/v1/products?select=*`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      },
      cache: 'no-store' // Eppovum pudhu data edukkum
    });

    const data = await res.json();

    if (data && data.length > 0) {
      // Namma database data-va website-ku yetha madhiri maathrom
      return data.map((item: any) => ({
        ...fallbackProducts()[0], // UI break aagama irukka dummy details
        id: item.id,
        name: item.name,
        family: item.name,
        description: item.description,
        price: item.price,
          mrp: item.mrp,
          badge: item.badge,
          packLabel: item.pack_label,
        image: item.image_url || fallbackProducts()[0].image
      }));
    }
    return fallbackProducts();
  } catch (error) {
    return fallbackProducts();
  }
  
}
export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);
    if (rows[0]) return rows[0];
  } catch {
    /* fall through to static catalogue */
  }
  return fallbackProducts().find((p) => p.slug === slug) ?? null;
}

export async function getReviews(family: string): Promise<Review[]> {
  try {
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.family, family))
      .orderBy(desc(reviews.createdAt));
    if (rows.length) return rows;
    return fallbackReviews().filter((r) => r.family === family);
  } catch {
    return fallbackReviews().filter((r) => r.family === family);
  }
}

export async function createOrder(input: SeedOrder): Promise<Order | null> {
  try {
    const code = `NUT-${Date.now().toString(36).toUpperCase().slice(-5)}`;
    const rows = await db
      .insert(orders)
      .values({ ...input, code })
      .returning();
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export type NewReview = {
  family: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  pack: string;
};

export async function createReview(input: NewReview): Promise<Review | null> {
  try {
    const rows = await db.insert(reviews).values(input).returning();
    return rows[0] ?? null;
  } catch {
    return null;
  }
}
