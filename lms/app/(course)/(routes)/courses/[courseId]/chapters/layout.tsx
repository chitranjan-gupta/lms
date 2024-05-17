import React from "react";
import { getProgress } from "@/actions/get-actions";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const userId = "";
  let course;
  if(userId){
    course = await db.course.findUnique({
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
            },
            userProgress: {
              where: {
                userId,
              },
            },
          },
        },
      },
    });
  }else{
    course = await db.course.findUnique({
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
            },
          },
        },
      },
    });
  }
  if (!course) {
    return redirect("/");
  }
  let progressCount;
  if(userId){
    progressCount = await getProgress(userId, course.id);
  }
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 bg-white w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col bg-white fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;