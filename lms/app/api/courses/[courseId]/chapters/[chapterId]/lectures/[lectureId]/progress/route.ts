import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string; lectureId: string; } }
) {
  try {
    const { user } = await auth(req);
    const { isCompleted } = await req.json();
    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userProgress = await db.lectureProgress.upsert({
      where: {
        userId_lectureId: {
          userId: user.userId,
          lectureId: params.lectureId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId: user.userId,
        lectureId: params.lectureId,
        isCompleted,
      },
    });
    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[LECTURE_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
