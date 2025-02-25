"use client";

import { useEffect, Suspense } from "react";

import { Categories } from "@/components/categories_";
import { SearchInput } from "@/components/search-input";
import {Loader} from "@/components/loader";
import { SearchPage } from "@/components/search-page";

import { useCategories, useCourses } from "@/core";

import type { CourseWithProgressWithCategory } from "@/types";

interface SearchProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

export default function Page({ searchParams }: SearchProps) {
  const { categories, getCategories } = useCategories();
  const { courses, searchCourses } = useCourses();

  useEffect(() => {
    (async () => {
      await getCategories({ pageIndex: 1, pageSize: 10 });
    })();
  }, [getCategories]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="px-6 pt-6 block md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <SearchPage
          courses={courses as unknown as CourseWithProgressWithCategory[]}
          searchCourses={searchCourses}
          searchParams={searchParams}
        />
      </div>
    </Suspense>
  );
}
