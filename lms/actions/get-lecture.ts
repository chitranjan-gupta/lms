import { getLectureProgress } from "@/api";
import type { LectureAttachment, ChapterAttachment } from "@/types";

interface GetLectureProps {
  courseId: string;
  chapterId: string;
  lectureId: string;
}

export const getLecture = async ({
  courseId,
  chapterId,
  lectureId,
}: GetLectureProps) => {
  try {
    const res: any = await getLectureProgress(
      courseId,
      chapterId,
      lectureId,
      true
    );
    return {
      lecture: res.lecture,
      chapter: res.chapter,
      course: res.course,
      muxData: res.muxData,
      lectureAttachments: res.lectureAttachments as LectureAttachment[],
      chapterAttachments: res.chapterAttachments as ChapterAttachment[],
      nextLecture: res.nextLecture,
      nextChapter: res.nextChapter,
      chapterProgress: res.chapterProgress,
      lectureProgress: res.lectureProgress,
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
      lectureAttachments: [],
      chapterAttachments: [],
      nextLecture: null,
      nextChapter: null,
      chapterProgress: null,
      lectureProgress: null,
      purchase: null,
    };
  }
};
