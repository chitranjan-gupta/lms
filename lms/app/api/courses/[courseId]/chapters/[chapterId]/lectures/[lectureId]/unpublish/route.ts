import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; lectureId: string; } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedLecture = await db.lecture.update({
      where: {
        id: params.lectureId,
        chapterId: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });
    const publishedLecturesInChapter = await db.lecture.findMany({
      where: {
        chapterId: params.chapterId,
        isPublished: true,
      },
    });
    if (!publishedLecturesInChapter.length) {
      await db.chapter.update({
        where: {
          id: params.chapterId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(unpublishedLecture);
  } catch (error) {
    console.log("[LECTURES_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
