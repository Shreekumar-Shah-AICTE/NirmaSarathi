import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/feedback — Submit feedback for a message
export async function POST(req: Request) {
  try {
    const { conversationId, rating, comment } = await req.json();

    if (!rating || !["thumbs_up", "thumbs_down"].includes(rating)) {
      return NextResponse.json(
        { error: "Rating must be 'thumbs_up' or 'thumbs_down'" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        conversationId: conversationId || null,
        rating,
        comment: comment || null,
      },
    });

    return NextResponse.json({ success: true, id: feedback.id });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}

// GET /api/feedback — Get feedback stats
export async function GET() {
  try {
    const total = await prisma.feedback.count();
    const positive = await prisma.feedback.count({
      where: { rating: "thumbs_up" },
    });
    const negative = await prisma.feedback.count({
      where: { rating: "thumbs_down" },
    });

    const satisfactionRate =
      total > 0 ? Math.round((positive / total) * 100 * 10) / 10 : 0;

    return NextResponse.json({
      total,
      positive,
      negative,
      satisfactionRate,
    });
  } catch (error) {
    console.error("Feedback fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}
