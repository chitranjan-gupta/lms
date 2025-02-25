import type { Category, Chapter, Course } from "@/types";

import { getPurchase } from "@/api";

import { getProgress } from "./get-progress";

export type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = (await getPurchase()) as { course: Course }[];
    const courses = purchasedCourses.map(
      (purchase) => purchase.course
    ) as CourseWithProgressWithCategory[];

    for (let course of courses) {
      const progress = await getProgress(course.id);
      course["progress"] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );
    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error: any) {
    if (error.response) {
      console.log("[GET_DASHBOARD_COURSES]", error.response);
    }
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
