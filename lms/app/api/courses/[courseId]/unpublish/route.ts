import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { user, message, status } = await auth(req);
    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.userId,
      },
    });
    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }
    
    const unpublishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId: user.userId,
      },
      data: {
        isPublished: false,
      },
    });
    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
