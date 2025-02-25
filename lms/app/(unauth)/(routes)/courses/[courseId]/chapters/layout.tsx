"use client";

import {
  useEffect,
  useState,
  Suspense,
  type FC,
  type ReactNode,
} from "react";

import { CourseSidebar } from "@/components/course-sidebar";
import { CourseNavbar } from "@/components/course-navbar";
import {Loader} from "@/components/loader";

import { getProgress } from "@/actions";
import { useUser } from "@/hooks";
import { useCourse } from "@/core";

interface ChapterProps {
  children: ReactNode;
  params: { courseId: string };
}

const ChapterLayout: FC<ChapterProps> = ({ children, params }) => {
  const { user } = useUser();
  const { course } = useCourse();
  const [progressCount, setProgressCount] = useState<number>(0);

  useEffect(() => {
    if(user){
      (async () => {
        setProgressCount(await getProgress(params.courseId));
      })()
    }    
  }, [params.courseId, user])

  return (
    <Suspense fallback={<Loader />}>
      {course && (
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

export default ChapterLayout;
