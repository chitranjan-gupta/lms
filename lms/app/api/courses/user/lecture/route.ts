import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (data.userId && data.courseId && data.chapterId && data.lectureId) {
        const lecture = await db.lecture.findUnique({
            where: {
              id: data.lectureId,
              courseId: data.courseId,
              chapterId: data.chapterId,
            },
            include: {
              muxData: true,
            },
          });
      return NextResponse.json(lecture);
    }
    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
