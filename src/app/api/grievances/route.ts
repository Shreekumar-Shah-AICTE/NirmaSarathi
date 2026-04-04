import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/grievances — File a new grievance
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, description, studentId } = body;

    if (!category || !description) {
      return NextResponse.json(
        { error: "Category and description are required" },
        { status: 400 }
      );
    }

    // Map category to department
    const departmentMap: Record<string, string> = {
      Academic: "Academic Affairs",
      Infrastructure: "Campus Maintenance",
      Hostel: "Hostel Administration",
      Library: "NIMA Knowledge Centre",
      Financial: "Finance Office",
      Examination: "Examination Cell",
      Harassment: "Internal Complaints Committee (ICC)",
      General: "Student Affairs",
    };

    const department = departmentMap[category] || "Student Affairs";

    // Generate ticket ID: GRV-[CATEGORY_CODE]-[TIMESTAMP]
    const categoryCode = category.substring(0, 4).toUpperCase();
    const timestamp = Date.now().toString().slice(-8);
    const ticketId = `GRV-${categoryCode}-${timestamp}`;

    // Determine priority based on category
    const highPriorityCategories = ["Harassment", "Examination"];
    const priority = highPriorityCategories.includes(category)
      ? "High"
      : "Medium";

    const grievance = await prisma.grievance.create({
      data: {
        ticketId,
        category,
        department,
        description,
        priority,
        studentId: studentId || null,
      },
    });

    return NextResponse.json({
      success: true,
      grievance: {
        ticketId: grievance.ticketId,
        category: grievance.category,
        department: grievance.department,
        status: grievance.status,
        priority: grievance.priority,
        createdAt: grievance.createdAt,
      },
      message: `Grievance filed successfully. Your ticket ID is ${grievance.ticketId}. The ${department} will review within 3 working days.`,
    });
  } catch (error) {
    console.error("Grievance filing error:", error);
    return NextResponse.json(
      { error: "Failed to file grievance" },
      { status: 500 }
    );
  }
}

// GET /api/grievances — List grievances (for admin dashboard)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: Record<string, string> = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const grievances = await prisma.grievance.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const stats = {
      total: await prisma.grievance.count(),
      open: await prisma.grievance.count({ where: { status: "Open" } }),
      inProgress: await prisma.grievance.count({
        where: { status: "In Progress" },
      }),
      resolved: await prisma.grievance.count({
        where: { status: "Resolved" },
      }),
    };

    return NextResponse.json({ grievances, stats });
  } catch (error) {
    console.error("Grievance fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch grievances" },
      { status: 500 }
    );
  }
}
