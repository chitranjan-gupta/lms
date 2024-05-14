import React from "react";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
      },
    },
  });
  if (!course) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50 p-4 border-b flex items-center bg-white shadow-sm"></div>
      <main className="pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
