"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Chapter,
  Course,
  Lecture,
  ChapterProgress,
  Purchase,
} from "@prisma/client";
import { CourseSidebarDropDownItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import { useUser } from "@/hooks";
import axios from "axios";
import { Accordion } from "@/components/ui/accordion";

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

export const CourseSidebar = ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { user } = useUser();
  const [purchase, setPurchase] = useState<Purchase>();
  const getData = useCallback(async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/purchases`,
        JSON.stringify({
          userId: user?.userId,
          courseId: course.id,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        setPurchase(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }, [course.id, user?.userId])
  useEffect(() => {
    if (user?.userId) {
      void getData();
    }
  }, [user, course.id, getData]);
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
