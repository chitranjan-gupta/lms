import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (data.title || data.categoryId) {
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
    }
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
