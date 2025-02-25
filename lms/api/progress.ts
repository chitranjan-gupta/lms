import { fetchData } from "./common";

export const getProgressWithCourse = async (courseId: string) => {
  return await fetchData({
    method: "POST",
    url: "courses/user/progress",
    data: {
      courseId,
    },
  });
};

export const getValidCompletedChapters = async (chapterIds: string[]) => {
  return await fetchData({
    method: "POST",
    url: "courses/user/progress",
    data: {
      chapterIds,
    },
  });
};

export const getPublishedChapters = async (courseId: string) => {
  return await fetchData({
    method: "POST",
    url: "courses/user/chapter",
    data: {
      courseId,
    },
  });
};

export const getLectureProgress = async (
  courseId: string,
  chapterId: string,
  lectureId: string,
  purchase: boolean
) => {
  return await fetchData({
    method: "POST",
    url: "courses/user/lecture",
    data: {
      courseId,
      chapterId,
      lectureId,
      purchase,
    },
  });
};

export const getCourseProgress = async (
  categoryId?: string,
  title?: string
) => {
  return await fetchData({
    method: "POST",
    url: "courses/user/course",
    data: {
      title,
      categoryId,
    },
  });
};

export const setCourseProgress = async (
  courseId: string,
  chapterId: string,
  lectureId: string,
  isCompleted?: boolean
) => {
  return await fetchData({
    method: "PUT",
    url: `courses/${courseId}/chapters/${chapterId}/lectures/${lectureId}/progress`,
    data: {
      isCompleted,
    },
  });
};

export const setChapterProgress = async (courseId: string, chapterId: string, isCompleted: boolean) => {
  return await fetchData({
    method: "PUT",
    url: `courses/${courseId}/chapters/${chapterId}/progress`,
    data: {
      isCompleted
    }
  })
}