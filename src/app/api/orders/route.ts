import { NextResponse } from "next/server";
import type { OrderItem } from "@/db/schema";
import {
  SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
  buildWhatsAppMessage,
} from "@/lib/catalog";
import { createOrder, getProducts } from "@/lib/shop";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const required = ["name", "phone", "address", "city", "pincode"];
    for (const key of required) {
      if (!body[key] || String(body[key]).trim().length < 2) {
        return NextResponse.json(
          { error: `Please provide your ${key}.` },
          { status: 400 },
        );
      }
    }
    const phone = String(body.phone).replace(/\D/g, "");
    if (phone.length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number." },
        { status: 400 },
      );
    }

    const rawItems = Array.isArray(body.items) ? body.items : [];
    if (rawItems.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 },
      );
    }

    // Prices always come from the catalogue, never from the client.
    const catalogue = await getProducts();
    const items: OrderItem[] = [];
    for (const raw of rawItems) {
      const product = catalogue.find((p) => p.slug === raw.slug);
      if (!product || !product.available) continue;
      const qty = Math.max(1, Math.min(12, Number(raw.qty) || 1));
      items.push({
        slug: product.slug,
        name: product.name,
        packLabel: product.packLabel,
        price: product.price,
        qty,
      });
    }
    if (items.length === 0) {
      return NextResponse.json(
        { error: "No orderable items in your cart." },
        { status: 400 },
      );
    }

    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
    const shipping =
      subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const total = subtotal + shipping;

    const input = {
      name: String(body.name).slice(0, 80),
      phone,
      email: body.email ? String(body.email).slice(0, 120) : null,
      address: String(body.address).slice(0, 240),
      city: String(body.city).slice(0, 80),
      pincode: String(body.pincode).slice(0, 12),
      notes: body.notes ? String(body.notes).slice(0, 400) : null,
      items,
      subtotal,
      shipping,
      total,
    };

    const order = await createOrder(input);
    const code = order?.code ?? `NUT-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        order: { ...input, code, status: "awaiting_whatsapp" },
        whatsapp: buildWhatsAppMessage({ ...input, code }),
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }
}
