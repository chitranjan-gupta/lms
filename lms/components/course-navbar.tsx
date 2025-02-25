"use client";

import { memo, type FC } from "react";

import { NavbarRoutes } from "./navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

import type { Chapter, Course, ChapterProgress, Lecture } from "@/types";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      lectures: Lecture[] | null;
    } & {
      userProgress?: ChapterProgress[] | null;
    })[];
  };
  progressCount?: number;
}

const CourseNavbarComponent: FC<CourseNavbarProps> = ({
  course,
  progressCount,
}) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};

export const CourseNavbar = memo(CourseNavbarComponent);
