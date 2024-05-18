"use client";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import {
  getCourses,
  CourseWithProgressWithCategory,
} from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { useAuth } from "@/context/AuthContext";
import { Category } from "@prisma/client";
import { useState, useEffect } from "react";
import axios from "axios";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const { userId } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<CourseWithProgressWithCategory[]>([]);
  async function getData() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`
      );
      if (res.status == 200) {
        setCategories(res.data);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }
  useEffect(() => {
    void getData();
    if (userId) {
      getCourses({
        userId,
        ...searchParams,
      }).then((value) => {
        setCourses(value);
      });
    }
  }, [userId, searchParams.title, searchParams.categoryId]);

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
