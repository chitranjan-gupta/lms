"use client";

import { memo, type FC } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { CourseSidebar } from "./course-sidebar";

import type { Chapter, Course, ChapterProgress, Lecture } from "@/types";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      lectures: Lecture[] | null;
    } & {
      userProgress?: ChapterProgress[] | null;
    })[];
  };
  progressCount?: number;
}

const CourseMobileSidebarComponent: FC<CourseMobileSidebarProps> = ({
  course,
  progressCount,
}) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export const CourseMobileSidebar = memo(CourseMobileSidebarComponent);