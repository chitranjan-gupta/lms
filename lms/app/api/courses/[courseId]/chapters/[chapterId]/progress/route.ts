import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { user } = await auth(req);
    const { isCompleted } = await req.json();
    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userProgress = await db.chapterProgress.upsert({
      where: {
        userId_chapterId: {
          userId: user.userId,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId: user.userId,
        chapterId: params.chapterId,
        isCompleted,
      },
    });
    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
