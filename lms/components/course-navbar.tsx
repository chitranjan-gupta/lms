'use client';
import React from "react";
import { NavbarRoutes } from "@/components/navbar-routes";
import { Chapter, Course, ChapterProgress, Lecture } from "@prisma/client";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

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

export const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};
