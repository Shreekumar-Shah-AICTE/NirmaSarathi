import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const upcoming = searchParams.get("upcoming"); // "true" to get only future events

    const where: Record<string, unknown> = {};
    if (category && category !== "All") where.category = category;
    if (upcoming === "true") {
      where.date = { gte: new Date() };
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ events, total: events.length });
  } catch (error) {
    console.error("Events GET error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
