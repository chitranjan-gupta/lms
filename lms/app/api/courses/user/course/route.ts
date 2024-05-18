import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if ((data.userId && data.title) || data.categoryId) {
      const courses = await db.course.findMany({
        where: {
          isPublished: true,
          title: {
            contains: data.title,
          },
          categoryId: data.categoryId,
        },
        include: {
          category: true,
          chapters: {
            where: {
              isPublished: true,
            },
            select: {
              id: true,
            },
          },
          purchases: {
            where: {
              userId: data.userId,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(courses);
    } else if (data.userId) {
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
            },
          },
          purchases: {
            where: {
              userId: data.userId,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(courses);
    }
    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
