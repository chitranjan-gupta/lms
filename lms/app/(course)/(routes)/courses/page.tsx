"use client";

import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";
import { Category, Course } from "@prisma/client";
import { useEffect, useState } from "react";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<CourseWithProgressWithCategory[]>([]);
  const getData = async () => {
    try {
      const categories = await (
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
          method: "GET",
        })
      ).json();
      const courses = await (
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/search`, {
          method: "POST",
          body: JSON.stringify({
            title: searchParams.title,
            categoryId: searchParams.categoryId,
          }),
        })
      ).json();
      if (categories) {
        setCategories(categories);
      }
      if (courses) {
        setCourses(courses);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    void getData();
  }, [searchParams.title, searchParams.categoryId]);
  return (
    <>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default function Page({ searchParams }: SearchPageProps) {
  return (
    <>
      <div className="px-6 pt-6 block md:mb-0">
        <SearchInput />
      </div>
      <SearchPage searchParams={searchParams} />
    </>
  );
}
