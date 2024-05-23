"use client";

import React, { useEffect, useState, Suspense } from "react";
import { getProgress } from "@/actions/get-actions";
import { CourseSidebar } from "./[chapterId]/lectures/[lectureId]/_components/course-sidebar";
import { CourseNavbar } from "./[chapterId]/lectures/[lectureId]/_components/course-navbar";
import { useAuth } from "@/context/AuthContext";
import { Chapter, Course, Lecture } from "@prisma/client";
import axios from "axios";
import Loader from "@/components/loader";

const CourseLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<
    Course & { chapters: (Chapter & { lectures: Lecture[] })[] }
  >();
  const [progressCount, setProgressCount] = useState<number>(0);
  async function getData() {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${params.courseId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        setCourse(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    } finally {
      setLoading(false);
    }
  }
  async function getAuthData() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/user/progress`,
        JSON.stringify({
          userId: userId,
          courseId: params.courseId,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const progress = await getProgress(userId, params.courseId);
      if (res.status == 200) {
        setCourse(res.data);
      }
      setProgressCount(progress);
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
  if (!course) {
    return <Loader />;
  }
  return (
    <Suspense fallback={<Loader />}>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-full">
          <div className="h-[80px] md:pl-80 fixed inset-y-0 bg-white w-full z-50">
            <CourseNavbar course={course} progressCount={progressCount} />
          </div>
          <div className="hidden md:flex h-full w-80 flex-col bg-white fixed inset-y-0 z-50">
            <CourseSidebar course={course} progressCount={progressCount} />
          </div>
          <main className="md:pl-80 pt-[80px] h-full">{children}</main>
        </div>
      )}
    </Suspense>
  );
};

export default CourseLayout;
