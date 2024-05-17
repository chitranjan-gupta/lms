"use client";
import React, { useEffect, useState } from "react";
// import { getProgress } from "@/actions/get-actions";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import { useAuth } from "@/context/AuthContext";
import { Chapter, Course, Lecture } from "@prisma/client";
import axios from "axios";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = useAuth();
  const [course, setCourse] = useState<
    Course & { chapters: (Chapter & { lectures: Lecture[] })[] }
  >();
  async function getData() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${params.courseId}`
      );
      if (res.status == 200) {
        setCourse(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }
  async function getAuthData() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/user/progress`,
        JSON.stringify({
          userId: userId,
          courseId: params.courseId,
        })
      );
      if (res.status == 200) {
        setCourse(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }
  useEffect(() => {
    if (userId) {
      void getAuthData();
    } else {
      void getData();
    }
  }, [userId, params.courseId]);
  if (userId) {
  } else {
  }
  if (!course) {
    return <div>No Course</div>;
  }
  let progressCount = 0;
  // if(userId){
  //   progressCount = await getProgress(userId, course.id);
  // }
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
