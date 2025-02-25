import { getCourseAnalytics } from "@/api";
import type { Course, Purchase } from "@/types";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};
  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getAnalytics = async () => {
  try {
    const purchases = (await getCourseAnalytics()) as PurchaseWithCourse[];
    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total: total,
      })
    );
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;
    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error: any) {
    if (error.response) {
      console.log("[GET_ANALYTICS]", error.response);
    }
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
