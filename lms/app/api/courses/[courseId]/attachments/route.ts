import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { courseId: string };
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
      return new NextResponse("Unauthroized", { status: 401 });
    }

    const attachment = await db.courseAttachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[COURSE_ID_ATTACHMENTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
