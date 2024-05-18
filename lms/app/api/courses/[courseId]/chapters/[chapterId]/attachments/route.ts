import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { courseId: string; chapterId: string; };
  }
) {
  try {
    const { user } = await auth(req);
    const { url } = await req.json();
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

    const attachment = await db.chapterAttachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        chapterId: params.chapterId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[CHAPTER_ID_ATTACHMENTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
