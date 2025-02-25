"use client";

import { type ReactNode, type FC, useEffect } from "react";

import {Loader} from "@/components/loader";
import { useCourse } from "@/core";
import { useUser } from "@/hooks";

interface CourseProps {
  children: ReactNode;
  params: { courseId: string };
}

const CourseLayout: FC<CourseProps> = ({ children, params }) => {
  const { user } = useUser();

  const { course, getCourse, getPurchase } = useCourse();

  useEffect(() => {
    (async () => {
      await getCourse(params.courseId);
    })();
  }, [getCourse, params.courseId]);

  useEffect(() => {
    if (user) {
      (async () => {
        await getPurchase(params.courseId);
      })();
    }
  }, [getPurchase, user, params.courseId]);

  if (!course) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default CourseLayout;
