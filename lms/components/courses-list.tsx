"use client";

import { memo, type FC } from "react";

import { CourseCard } from "./course-card";

import type { CourseWithProgressWithCategory } from "@/types";

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

const CoursesListComponent: FC<CoursesListProps> = ({ items }) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length!}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};

export const CoursesList = memo(CoursesListComponent);