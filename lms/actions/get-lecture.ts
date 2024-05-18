import { LectureAttachment, ChapterAttachment } from "@prisma/client";
import axios from "axios";

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
    const res = (
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/user/lecture`,
        JSON.stringify({
          userId: userId,
          courseId: courseId,
          chapterId: chapterId,
          lectureId: lectureId,
          purchase: true,
        })
      )
    ).data;
    return {
      lecture: res.lecture,
      chapter: res.chapter,
      course: res.course,
      muxData: res.muxData,
      attachments: res.attachments as LectureAttachment[],
      chapterAttachments: res.chapterAttachments as ChapterAttachment[],
      nextLecture: res.nextLecture,
      nextChapter: res.nextChapter,
      userProgress: res.userProgress,
      purchase: res.purchase,
    };
  } catch (error: any) {
    if (error.response) {
      console.log("[GET_LECTURE]", error.response);
    }
    return {
      lecture: null,
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      chapterAttachments: [],
      nextLecture: null,
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
