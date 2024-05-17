import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string };
  }
) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          include: {
            lectures: {
              where: {
                isPublished: true,
              },
              orderBy: {
                position: "asc",
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { user, message, status } = await auth(req);
    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.userId,
      },
      include: {
        chapters: {
          include: {
            lectures: {
              include: {
                muxData: true,
              },
            },
          },
        },
      },
    });
    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }
    for (const chapter of course.chapters) {
      for (const lecture of chapter.lectures) {
        if (lecture.muxData?.assetId) {
          await video.assets.delete(lecture.muxData.assetId);
        }
      }
    }
    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { user, message, status } = await auth(req);
    const values = await req.json();
    if (!user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.update({
      where: {
        id: params.courseId,
        userId: user.userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
