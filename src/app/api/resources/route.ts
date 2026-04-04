import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const branch = searchParams.get("branch");
    const semester = searchParams.get("semester");
    const subject = searchParams.get("subject");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (branch) where.branch = branch;
    if (semester) where.semester = parseInt(semester);
    if (subject) where.subject = { contains: subject };
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { subject: { contains: search } },
      ];
    }

    const resources = await prisma.studyResource.findMany({
      where,
      orderBy: { upvotes: "desc" },
    });

    return NextResponse.json({ resources, total: resources.length });
  } catch (error) {
    console.error("Resources GET error:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, type, subject, branch, semester, uploadedBy, url } = body;

    if (!title || !description || !type || !subject || !branch || !semester || !uploadedBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resource = await prisma.studyResource.create({
      data: {
        title,
        description,
        type,
        subject,
        branch,
        semester: parseInt(semester),
        uploadedBy,
        url: url || null,
      },
    });

    return NextResponse.json({ resource, message: "Resource shared!" }, { status: 201 });
  } catch (error) {
    console.error("Resources POST error:", error);
    return NextResponse.json({ error: "Failed to share resource" }, { status: 500 });
  }
}
