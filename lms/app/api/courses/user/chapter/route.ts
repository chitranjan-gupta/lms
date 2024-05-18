import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (data.userId && data.courseId && data.chapterId) {
      const chapter = await db.chapter.findUnique({
        where: {
          id: data.chapterId,
          courseId: data.courseId,
        },
        include: {
          lectures: {
            orderBy: {
              position: "asc",
            },
          },
          attachments:{
            orderBy: {
              createdAt: "desc",
            },
          }
        },
      });
      return NextResponse.json(chapter);
    } else if (data.userId && data.courseId) {
      const publishedChapters = await db.chapter.findMany({
        where: {
          courseId: data.courseId,
          isPublished: true,
        },
        select: {
          id: true,
        },
      });
      return NextResponse.json(publishedChapters);
    }
    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
