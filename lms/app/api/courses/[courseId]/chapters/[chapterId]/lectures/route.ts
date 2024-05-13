import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
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
    const chapterOwner = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });
    if (!chapterOwner) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const lastLecture = await db.lecture.findFirst({
      where: {
        chapterId: params.chapterId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPosition = lastLecture ? lastLecture.position + 1 : 1;
    const lecture = await db.lecture.create({
      data: {
        title,
        courseId: params.courseId,
        chapterId: params.chapterId,
        position: newPosition,
      },
    });
    return NextResponse.json(lecture);
  } catch (error) {
    console.log("[LECTURES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
