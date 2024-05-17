import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (data.userId && data.courseId) {
      const course = await db.course.findUnique({
        where: {
          id: data.courseId,
        },
        include: {
          chapters: {
            where: {
              isPublished: true,
            },
            include: {
              lectures: {
                where: {
                  isPublished: true,
                },
                include: {
                  userProgress: {
                    where: {
                      userId: data.userId,
                    },
                  },
                },
              },
              userProgress: {
                where: {
                  userId: data.userId,
                },
              },
            },
          },
        },
      });
      return NextResponse.json(course);
    }
    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
