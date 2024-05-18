import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (data.userId && data.courseId) {
      const purchase = await db.purchase.findUnique({
        where: {
          userId_courseId: {
            userId: data.userId,
            courseId: data.courseId,
          },
        },
      });
      return NextResponse.json(purchase)
    } else if (data.userId) {
      const purchasedCourses = await db.purchase.findMany({
        where: {
          userId: data.userId,
        },
        select: {
          course: {
            include: {
              category: true,
              chapters: {
                where: {
                  isPublished: true,
                },
              },
            },
          },
        },
      });
      return NextResponse.json(purchasedCourses);
    }
    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
