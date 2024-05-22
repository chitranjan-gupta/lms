import { Course, Purchase } from "@prisma/client";
import axios from "axios";

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

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = (
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/user/purchase`,
        JSON.stringify({
          userId: userId,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).data;
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
