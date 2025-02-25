"use client";

import { memo, type FC } from "react";

import { Categories } from "./categories";
import { CoursesList } from "./courses-list";

import type { Category, CourseWithProgressWithCategory } from "@/types";

interface SearchPageProps {
  categories: Category[];
  courses: CourseWithProgressWithCategory[];
}

const SearchPageComponent: FC<SearchPageProps> = ({ categories, courses }) => {
  return (
    <>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export const SearchPage = memo(SearchPageComponent);
