import { NextResponse } from "next/server";
import { createReview } from "@/lib/shop";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rating = Number(body.rating);
    if (
      !body.family ||
      !body.author ||
      !body.location ||
      !body.title ||
      !body.body ||
      !body.pack
    ) {
      return NextResponse.json(
        { error: "Please fill in every field." },
        { status: 400 },
      );
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 },
      );
    }

    const review = await createReview({
      family: String(body.family),
      author: String(body.author).slice(0, 60),
      location: String(body.location).slice(0, 60),
      rating: Math.round(rating),
      title: String(body.title).slice(0, 120),
      body: String(body.body).slice(0, 2000),
      pack: String(body.pack).slice(0, 40),
    });

    if (!review) {
      return NextResponse.json(
        { error: "Could not save your review right now." },
        { status: 500 },
      );
    }
    return NextResponse.json({ review }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }
}
