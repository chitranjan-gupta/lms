import { db } from "@/lib/db";
import {
  Chapter,
  ChapterAttachment,
  ChapterProgress,
  Lecture,
  LectureAttachment,
  LectureProgress,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (data.courseId && data.chapterId && data.purchase) {
      let purchase = null;
      if (data.userId) {
        purchase = await db.purchase.findUnique({
          where: {
            userId_courseId: {
              userId: data.userId,
              courseId: data.courseId,
            },
          },
        });
      }
      const course = await db.course.findUnique({
        where: {
          isPublished: true,
          id: data.courseId,
        },
        select: {
          price: true,
        },
      });
      if (!course) {
        return new NextResponse("Course not found", { status: 404 });
      }
      const chapter = await db.chapter.findUnique({
        where: {
          id: data.chapterId,
          isPublished: true,
        },
        include: {
          lectures: {
            where: {
              isPublished: true,
            },
          },
        },
      });
      if (!chapter) {
        return new NextResponse("Chapter not found", { status: 404 });
      }
      const lecture = await db.lecture.findUnique({
        where: {
          id: data.lectureId,
          isPublished: true,
        },
      });
      if (!lecture) {
        return new NextResponse("Lecture not found", { status: 404 });
      }
      let muxData = null;
      let lectureAttachments: LectureAttachment[] = [];
      let chapterAttachments: ChapterAttachment[] = [];
      let nextChapter: Chapter | null = null;
      let nextLecture: Lecture | null = null;
      if (purchase) {
        lectureAttachments = await db.lectureAttachment.findMany({
          where: {
            lectureId: data.lectureId,
          },
        });
        chapterAttachments = await db.chapterAttachment.findMany({
          where: {
            chapterId: data.chapterId,
          },
        });
      }

      if (lecture.isFree || purchase) {
        muxData = await db.muxData.findUnique({
          where: {
            lectureId: data.lectureId,
          },
        });
        nextLecture = await db.lecture.findFirst({
          where: {
            courseId: data.courseId,
            chapterId: chapter.id,
            isPublished: true,
            position: {
              gt: lecture?.position,
            },
          },
          orderBy: {
            position: "asc",
          },
        });

        nextChapter = await db.chapter.findFirst({
          where: {
            courseId: data.courseId,
            isPublished: true,
            position: {
              gt: chapter?.position,
            },
          },
          orderBy: {
            position: "asc",
          },
        });

        if (nextChapter && !nextLecture) {
          nextLecture = await db.lecture.findFirst({
            where: {
              courseId: data.courseId,
              chapterId: nextChapter.id,
              isPublished: true,
            },
            orderBy: {
              position: "asc",
            },
          });
        }
      }

      let chapterProgress: ChapterProgress | null = null;
      let lectureProgress: LectureProgress | null = null;
      if (data.userId) {
        chapterProgress = await db.chapterProgress.findUnique({
          where: {
            userId_chapterId: {
              userId: data.userId,
              chapterId: data.chapterId,
            },
          },
        });

        lectureProgress = await db.lectureProgress.findUnique({
          where: {
            userId_lectureId: {
              userId: data.userId,
              lectureId: data.lectureId,
            },
          },
        });
      }

      return NextResponse.json({
        lecture,
        chapter,
        course,
        muxData,
        lectureAttachments,
        chapterAttachments,
        nextChapter,
        nextLecture,
        chapterProgress,
        lectureProgress,
        purchase,
      });
    } else if (
      data.userId &&
      data.courseId &&
      data.chapterId &&
      data.lectureId
    ) {
      const lecture = await db.lecture.findUnique({
        where: {
          id: data.lectureId,
          courseId: data.courseId,
          chapterId: data.chapterId,
        },
        include: {
          muxData: true,
          attachments: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      return NextResponse.json(lecture);
    }
    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
