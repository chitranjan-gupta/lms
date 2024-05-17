import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (data.userId && data.courseId && data.chapterId) {
        const chapter = await db.chapter.findUnique({
            where: {
              id: data.chapterId,
              courseId: data.courseId,
            },
            include: {
              lectures: {
                orderBy:{
                  position: "asc"
                }
              },
            },
          });
      return NextResponse.json(chapter);
    }
    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
