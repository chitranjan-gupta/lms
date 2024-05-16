import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  try {
    const data = await req.json();
    if (data.userId) {
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
    return NextResponse.json([]);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
