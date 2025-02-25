"use client";

import { memo, useEffect, useState, useCallback, type FC } from "react";

import { Loader } from "./loader";
import { CoursesList } from "./courses-list";

import type { CourseWithProgressWithCategory } from "@/types";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
  courses: CourseWithProgressWithCategory[];
  searchCourses:  (pagination: any, params?: any, path?: string) => Promise<void>;
}

const SearchPageComponent: FC<SearchPageProps> = ({ searchParams, courses, searchCourses }: SearchPageProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const getData = useCallback(
    async (title?: string, categoryId?: string) => {
      setLoading(true);
      try {
        await searchCourses(
          { pageIndex: 1, pageSize: 10 },
          {
            title: title,
            categoryId: categoryId,
          }
        );
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [searchCourses]
  );
  useEffect(() => {
    (async () => {
      await getData(searchParams.title, searchParams.categoryId);
    })();
  }, [searchParams.title, searchParams.categoryId, getData]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <CoursesList
          items={courses as unknown as CourseWithProgressWithCategory[]}
        />
      )}
    </>
  );
};

export const SearchPage = memo(SearchPageComponent);
