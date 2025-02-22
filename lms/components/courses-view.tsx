"use client";
import { Categories } from "./categories";
import { CoursesList } from "@/components/courses-list";
import { Category, Course } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface SearchPageProps {
  categories: Category[];
  courses: CourseWithProgressWithCategory[];
}

export const SearchPage = ({ categories, courses }: SearchPageProps) => {
  return (
    <>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};
