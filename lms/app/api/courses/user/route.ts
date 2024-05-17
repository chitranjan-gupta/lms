import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (data.userId && data.courseId) {
      const course = await db.course.findUnique({
        where: {
          id: data.courseId,
          userId: data.userId,
        },
        include: {
          chapters: {
            orderBy: {
              position: "asc",
            },
          },
          attachments: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      return NextResponse.json(course);
    } else if (data.userId) {
      const courses = await db.course.findMany({
        where: {
          userId: data.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(courses);
    }
    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
