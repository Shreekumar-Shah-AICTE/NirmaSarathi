import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "lost" | "found"
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (type) where.type = type;
    if (category) where.category = category;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } },
      ];
    }

    const items = await prisma.lostFoundItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ items, total: items.length });
  } catch (error) {
    console.error("Lost & Found GET error:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, category, title, description, location, contactInfo, studentId } = body;

    if (!type || !category || !title || !description || !location) {
      return NextResponse.json(
        { error: "Missing required fields: type, category, title, description, location" },
        { status: 400 }
      );
    }

    const item = await prisma.lostFoundItem.create({
      data: {
        type,
        category,
        title,
        description,
        location,
        contactInfo: contactInfo || null,
        studentId: studentId || null,
      },
    });

    return NextResponse.json({ item, message: "Item reported successfully" }, { status: 201 });
  } catch (error) {
    console.error("Lost & Found POST error:", error);
    return NextResponse.json({ error: "Failed to report item" }, { status: 500 });
  }
}
