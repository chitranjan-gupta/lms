import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (data.userId) {
      const purchases = await db.purchase.findMany({
        where: {
          course: {
            userId: data.userId,
          },
        },
        include: {
          course: true,
        },
      });
      return NextResponse.json(purchases);
    }
    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
