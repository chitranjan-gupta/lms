import type { Course, Pagination } from "@/types";
import { fetchData } from "./common";

export const getCourses = async (
  pagination: Pagination,
  path: string = "courses"
) => {
  const response = await fetchData({
    method: "GET",
    // url: `courses?page=${pagination.pageIndex + 1}&per_page=${
    //     pagination.pageSize
    // }`,
    url: path,
  });
  return {
    data: response as unknown as Course[],
    last_page: 1,
  };
};

export const addCourse = async (values: { title: string }) => {
  return await fetchData<Course>({
    method: "POST",
    url: "courses",
    data: values,
  });
};

export const getCourse = async (courseId: string) => {
  return await fetchData<Course>({
    method: "GET",
    url: `courses/${courseId}`,
  });
};

export const deleteCourse = async (removeCourseId: string) => {
  return fetchData<Course>({
    method: "DELETE",
    url: "admin/courses",
    data: {
      removeCourseId: removeCourseId,
    },
  });
};

export const searchCourses = async (
  pagination: Pagination,
  params?: any,
  path: string = "courses/search"
) => {
  const response = await fetchData({
    method: "POST",
    // url: `courses/search?page=${pagination.pageIndex + 1}&per_page=${
    //     pagination.pageSize
    // }`,
    url: path,
    data: params,
  });
  return {
    data: response as unknown as Course[],
    last_page: 1,
  };
};

export const getPurchase = async (courseId?: string) => {
  return await fetchData({
    method: "POST",
    url: "purchases",
    data: {
      courseId,
    },
  });
};

export const checkOut = async (courseId: string) => {
  return await fetchData({
    method: "POST",
    url: `courses/${courseId}/checkout`,
  });
};

export const fetchCourses = async (courseId?: string) => {
  return await fetchData({
    method: "POST",
    url: "courses/user",
    data: {
      courseId,
    },
  });
};
