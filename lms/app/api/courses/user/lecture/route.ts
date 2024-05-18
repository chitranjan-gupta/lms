import { db } from "@/lib/db";
import {
  Chapter,
  ChapterAttachment,
  Lecture,
  LectureAttachment,
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
      const chapter = await db.chapter.findUnique({
        where: {
          id: data.chapterId,
          isPublished: true,
        },
      });
      if (!chapter || !course) {
        return new NextResponse("Chapter or course not found", { status: 404 });
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
      let attachments: LectureAttachment[] = [];
      let chapterAttachments: ChapterAttachment[] = [];
      let nextChapter: Chapter | null = null;
      let nextLecture: Lecture | null = null;
      if (purchase) {
        attachments = await db.lectureAttachment.findMany({
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
      }
      let userProgress;
      if (data.userId) {
        userProgress = await db.chapterProgress.findUnique({
          where: {
            userId_chapterId: {
              userId: data.userId,
              chapterId: data.chapterId,
            },
          },
        });
      }
      return NextResponse.json({
        lecture,
        chapter,
        course,
        muxData,
        attachments,
        chapterAttachments,
        nextChapter,
        nextLecture,
        userProgress,
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
