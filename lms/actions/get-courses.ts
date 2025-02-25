import type { Category, Chapter, Course, CourseWithProgressWithCategory, Purchase } from "@/types";

import { getCourseProgress } from "@/api";

import { getProgress } from "./get-progress";

type GetCourses = {
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = (await getCourseProgress(categoryId, title)) as (Course & {
      category: Category;
    } & { chapters: Chapter[] } & {
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
          const progressPercentage = await getProgress(course.id);
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
