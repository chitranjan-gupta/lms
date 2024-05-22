import { Category, Chapter, Course, Purchase } from "@prisma/client";
import { getProgress } from "./get-actions";
import axios from "axios";

export type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = (
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/user/course`,
        JSON.stringify({
          userId: userId,
          title: title,
          categoryId: categoryId,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).data as (Course & { category: Category } & { chapters: Chapter[] } & {
      purchases: Purchase[];
    })[];
    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }
          const progressPercentage = await getProgress(userId, course.id);
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );
    return coursesWithProgress;
  } catch (error: any) {
    if (error.response) {
      console.log("[GET_COURSES]", error.response);
    }
    return [];
  }
};
