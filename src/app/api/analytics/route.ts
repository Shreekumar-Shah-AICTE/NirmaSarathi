import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/analytics — Dashboard analytics data
export async function GET() {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Count conversations today
    const totalQueriesToday = await prisma.conversation.count({
      where: { createdAt: { gte: todayStart } },
    });

    // Total conversations all time
    const totalQueriesAllTime = await prisma.conversation.count();

    // Language distribution
    const langCounts = await prisma.conversation.groupBy({
      by: ["language"],
      _count: { id: true },
    });

    const totalLang = langCounts.reduce((sum: number, l: { _count: { id: number } }) => sum + l._count.id, 0) || 1;
    const languageDistribution = langCounts.map((l: { language: string; _count: { id: number } }) => ({
      language: l.language,
      count: l._count.id,
      percentage: Math.round((l._count.id / totalLang) * 100),
    }));

    // Category distribution
    const catCounts = await prisma.conversation.groupBy({
      by: ["category"],
      _count: { id: true },
    });

    const totalCat = catCounts.reduce((sum: number, c: { _count: { id: number } }) => sum + c._count.id, 0) || 1;
    const categoryDistribution = catCounts
      .filter((c: { category: string | null }) => c.category)
      .map((c: { category: string | null; _count: { id: number } }) => ({
        category: c.category,
        count: c._count.id,
        percentage: Math.round((c._count.id / totalCat) * 100),
      }));

    // Sentiment distribution
    const sentimentCounts = await prisma.conversation.groupBy({
      by: ["sentiment"],
      _count: { id: true },
    });

    // Grievance stats
    const grievanceStats = {
      total: await prisma.grievance.count(),
      open: await prisma.grievance.count({ where: { status: "Open" } }),
      resolved: await prisma.grievance.count({ where: { status: "Resolved" } }),
    };

    // Feedback stats
    const feedbackTotal = await prisma.feedback.count();
    const feedbackPositive = await prisma.feedback.count({
      where: { rating: "thumbs_up" },
    });
    const satisfactionRate =
      feedbackTotal > 0
        ? Math.round((feedbackPositive / feedbackTotal) * 100 * 10) / 10
        : 94.2; // Default seed value

    // Wellness flags
    const wellnessFlags = await prisma.wellnessFlag.count({
      where: { handled: false },
    });

    // Recent conversations
    const recentConversations = await prisma.conversation.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        sessionId: true,
        query: true,
        category: true,
        language: true,
        sentiment: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      kpis: {
        totalQueriesToday,
        totalQueriesAllTime,
        grievancesOpen: grievanceStats.open,
        satisfactionRate,
        wellnessFlags,
        grievanceStats,
      },
      languageDistribution,
      categoryDistribution,
      sentimentCounts,
      recentConversations,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
