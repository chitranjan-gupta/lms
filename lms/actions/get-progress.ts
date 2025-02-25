import { getPublishedChapters, getValidCompletedChapters } from "@/api";
import type { Chapter } from "@/types";

export const getProgress = async (courseId: string): Promise<number> => {
  try {
    const getpublishedChapters = await getPublishedChapters(courseId)

    let publishedChapters: Chapter[] = [];

    if (getpublishedChapters) {
      publishedChapters = getpublishedChapters as Chapter[];
    }

    let publishedChaptersIds: string[] = [];

    if (publishedChapters.length > 0) {
      publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);
    }

    let validCompletedChapters;

    if (publishedChaptersIds.length > 0) {
      const getvalidCompletedChapters = await getValidCompletedChapters(publishedChaptersIds);
      if (getvalidCompletedChapters) {
        validCompletedChapters = getvalidCompletedChapters as number;
      }
    }

    let progressPercentage: number = 0;

    if (validCompletedChapters) {
      progressPercentage =
        (validCompletedChapters / publishedChaptersIds.length) * 100;
    }

    return progressPercentage;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
    }
    return 0;
  }
};
