import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; attachmentId: string } }
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
      return new NextResponse("Unauthroized", { status: 401 });
    }
    const attachment = await db.courseAttachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[ATTACHMENT_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
