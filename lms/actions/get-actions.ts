import { Chapter } from "@prisma/client";
import axios from "axios";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const getpublishedChapters = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses/user/chapter`,
      JSON.stringify({
        userId: userId,
        courseId: courseId,
      }),
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let publishedChapters: Chapter[] = [];

    if (getpublishedChapters.status == 200) {
      publishedChapters = getpublishedChapters.data;
    }

    let publishedChaptersIds: string[] = [];

    if (publishedChapters.length > 0) {
      publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);
    }

    let validCompletedChapters;

    if (publishedChaptersIds.length > 0) {
      const getvalidCompletedChapters = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/user/progress`,
        JSON.stringify({
          userId: userId,
          chapterIds: publishedChaptersIds,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (getvalidCompletedChapters.status == 200) {
        validCompletedChapters = getvalidCompletedChapters.data;
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
