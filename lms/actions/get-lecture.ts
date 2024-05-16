import { db } from "@/lib/db";
import { Attachment, Chapter, Lecture } from "@prisma/client";

interface GetLectureProps {
  userId?: string | null;
  courseId: string;
  chapterId: string;
  lectureId: string;
}

export const getLecture = async ({
  userId,
  courseId,
  chapterId,
  lectureId,
}: GetLectureProps) => {
  try {
    let purchase;
    if (userId) {
      purchase = await db.purchase.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });
    }
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });
    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }
    const lecture = await db.lecture.findUnique({
      where:{
        id: lectureId,
        isPublished: true
      }
    });
    if(!lecture){
      throw new Error("Lecture not found");
    }
    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;
    let nextLecture: Lecture | null = null;
    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (lecture.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          lectureId: lectureId,
        },
      });

      nextLecture = await db.lecture.findFirst({
        where:{
          courseId: courseId,
          isPublished: true,
          position:{
            gt: lecture?.position
          }
        },
        orderBy:{
          position: "asc"
        }
      })

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
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
    if(userId){
      userProgress = await db.userProgress.findUnique({
        where: {
          userId_chapterId: {
            userId,
            chapterId,
          },
        },
      });
    }
    return {
      lecture,
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("[GET_LECTURE]", error);
    return {
      lecture: null,
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
