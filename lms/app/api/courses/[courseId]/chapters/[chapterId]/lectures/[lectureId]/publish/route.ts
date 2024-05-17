import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string; lectureId: string; } }
) {
  try {
    const { user } = await auth(req);
    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const lecture = await db.lecture.findUnique({
      where: {
        id: params.lectureId,
        chapterId: params.chapterId,
        courseId: params.courseId,
      }
    });

    const muxData = await db.muxData.findUnique({
        where:{
            lectureId: params.lectureId
        }
    })

    if (
      !lecture ||
      !lecture.title ||
      !lecture.description ||
      !lecture.videoUrl ||
      !muxData
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const publishedLecture = await db.lecture.update({
      where: {
        id: params.lectureId,
        chapterId: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedLecture);
  } catch (error) {
    console.log("[LECTURES_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
