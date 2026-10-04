import { NextResponse } from "next/server";
import { pool } from "@/db";

export async function GET() {
  try {
    await pool.query("SELECT 1");
    return NextResponse.json({ ok: true, db: "up" });
  } catch {
    return NextResponse.json({ ok: true, db: "down" });
  }
}
