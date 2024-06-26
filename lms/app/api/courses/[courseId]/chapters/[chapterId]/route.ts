import { auth } from "@/lib/auth";
import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
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
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      include: {
        lectures: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!chapter) {
      return new NextResponse("Not Found", { status: 400 });
    }
    if (chapter.lectures) {
      for (const lecture of chapter.lectures) {
        const existingMuxData = await db.muxData.findFirst({
          where: {
            lectureId: lecture.id,
          },
        });
        if (existingMuxData) {
          await video.assets.delete(existingMuxData.assetId);
          await db.muxData.delete({
            where: {
              id: existingMuxData.id,
            },
          });
        }
      }
    }
    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[COURSE_CHAPTERS_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { user } = await auth(req);
    const { isPublished, ...values } = await req.json();
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
    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSE_CHAPTERS_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
