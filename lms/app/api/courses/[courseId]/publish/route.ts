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
      return new NextResponse("Unauthroized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.userId,
      },
      include: {
        chapters: true,
      },
    });
    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const hasPublished = course.chapters.some((chapter) => chapter.isPublished);

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !hasPublished
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId: user.userId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
