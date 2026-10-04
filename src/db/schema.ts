import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  family: text("family").notNull(),
  name: text("name").notNull(),
  packLabel: text("pack_label").notNull(),
  tagline: text("tagline").notNull(),
  badge: text("badge"),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  mrp: integer("mrp").notNull(),
  stock: integer("stock").notNull().default(0),
  available: boolean("available").notNull().default(true),
  rating: integer("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  image: text("image").notNull(),
  images: text("images").array().notNull(),
  description: text("description").notNull(),
  highlights: text("highlights").array().notNull(),
  ingredients: jsonb("ingredients").$type<Ingredient[]>().notNull(),
  nutrition: jsonb("nutrition").$type<NutritionRow[]>().notNull(),
  prepare: jsonb("prepare").$type<PrepareStep[]>().notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  family: text("family").notNull(),
  author: text("author").notNull(),
  location: text("location").notNull(),
  rating: integer("rating").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  pack: text("pack").notNull(),
  verified: boolean("verified").notNull().default(true),
  helpful: integer("helpful").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  pincode: text("pincode").notNull(),
  notes: text("notes"),
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  subtotal: integer("subtotal").notNull(),
  shipping: integer("shipping").notNull(),
  total: integer("total").notNull(),
  status: text("status").notNull().default("awaiting_whatsapp"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Ingredient = {
  name: string;
  benefit: string;
  note: string;
  short: string;
};

export type NutritionRow = { label: string; value: string };

export type PrepareStep = { title: string; body: string };

export type OrderItem = {
  slug: string;
  name: string;
  packLabel: string;
  price: number;
  qty: number;
};

export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
