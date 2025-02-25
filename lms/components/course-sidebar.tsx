"use client";

import { useEffect, useState, memo, type FC } from "react";

import { Accordion } from "./ui/accordion";

import { CourseSidebarDropDownItem } from "./course-sidebar-item";
import { CourseProgress } from "./course-progress";

import { useUser } from "@/hooks";
import { getPurchase } from "@/api";

import type {
  Chapter,
  Course,
  Lecture,
  ChapterProgress,
  Purchase,
} from "@/types";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      lectures: Lecture[] | null;
    } & {
      userProgress?: ChapterProgress[] | null;
    })[];
  };
  progressCount?: number;
}

const CourseSidebarComponent: FC<CourseSidebarProps> = ({
  course,
  progressCount,
}) => {
  const { user } = useUser();
  const [purchase, setPurchase] = useState<Purchase>();
  useEffect(() => {
    if (user) {
      (async () => {
        const data: any = await getPurchase(course.id);
        if (data) {
          setPurchase(data);
        }
      })();
    }
  }, [user, course.id]);
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && progressCount && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        <Accordion type="single" collapsible>
          {course.chapters.map((chapter) => (
            <CourseSidebarDropDownItem
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !purchase}
              purchase={purchase ? true : false}
              lectures={chapter.lectures!}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export const CourseSidebar = memo(CourseSidebarComponent);
