import { NextRequest, NextResponse } from "next/server";
import { computeAvailableSlots } from "@/lib/google/calendar";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date must be provided as YYYY-MM-DD" }, { status: 400 });
  }

  try {
    const slots = await computeAvailableSlots(date);
    return NextResponse.json({ slots });
  } catch (err) {
    console.error("availability lookup failed", err);
    return NextResponse.json({ error: "Could not load availability right now." }, { status: 502 });
  }
}
