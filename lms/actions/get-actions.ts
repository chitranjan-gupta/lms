import { Chapter } from "@prisma/client";
import axios from "axios";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = (
      await axios.post(
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
      )
    ).data as Chapter[];

    const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);
    const validCompletedChapters = (
      await axios.post(
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
      )
    ).data;
    const progressPercentage =
      (validCompletedChapters / publishedChaptersIds.length) * 100;
    return progressPercentage;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
    }
    return 0;
  }
};
