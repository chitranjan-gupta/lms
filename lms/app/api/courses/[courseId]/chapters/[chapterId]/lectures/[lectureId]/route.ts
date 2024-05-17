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
  { params }: { params: { courseId: string; chapterId: string; lectureId: string; } }
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
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chapterOwner = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });
    if (!chapterOwner) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const lecture = await db.lecture.findUnique({
      where: {
        id: params.lectureId,
        chapterId: params.chapterId,
        courseId: params.courseId,
      },
      include: {
        muxData: true
      },
    });
    if (!lecture) {
      return new NextResponse("Not Found", { status: 404 });
    }
    if (lecture.muxData) {
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
    const deletedLecture = await db.lecture.delete({
      where: {
        id: params.lectureId,
      },
    });

    const publishedLecturesInChapter = await db.lecture.findMany({
      where: {
        chapterId: params.chapterId,
        isPublished: true,
      },
    });

    if (!publishedLecturesInChapter.length) {
      await db.chapter.update({
        where: {
          id: params.chapterId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedLecture);
  } catch (error) {
    console.log("[COURSE_CHAPTERS_LECTURES_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string; lectureId: string; } }
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
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chapterOwner = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });
    if (!chapterOwner) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const lecture = await db.lecture.update({
      where: {
        id: params.lectureId,
        chapterId: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });
    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          lectureId: params.lectureId,
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
      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });
      await db.muxData.create({
        data: {
          lectureId: params.lectureId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }
    return NextResponse.json(lecture);
  } catch (error) {
    console.log("[COURSE_CHAPTERS_LECTURES_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
