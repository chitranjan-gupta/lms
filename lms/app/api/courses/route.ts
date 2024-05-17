import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
            lectures: {
              where: {
                isPublished: true,
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(courses);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await auth(req);
    const { title } = await req.json();
    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.create({
      data: {
        userId: user.userId,
        title,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
