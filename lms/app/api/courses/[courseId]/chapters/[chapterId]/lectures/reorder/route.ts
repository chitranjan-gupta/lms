import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string; } }
) {
  try {
    const { user } = await auth(req);
    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { list } = await req.json();

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chapterOwner = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });
    if (!chapterOwner) {
      return new NextResponse("Not Found", { status: 404 });
    }
    for (let item of list) {
      await db.lecture.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[LECTURES_REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
