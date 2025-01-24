import type { Course, Pagination } from "@/types";
import { fetchData } from "./common";

export const getCourses = async (pagination: Pagination) => {
    const response = await fetchData({
        method: "GET",
        // url: `courses?page=${pagination.pageIndex + 1}&per_page=${
        //     pagination.pageSize
        // }`,
        url: `courses`,
    });
    return {
        data: response as unknown as Course[],
        last_page: 1,
    }
};

export const addCourse = async (values: { name: string }) => {
    return fetchData<Course>({
        method: "POST",
        url: "courses",
        data: values,
    });
};

export const getCourse = async (courseId: string) => {
    return fetchData<Course>({
        method: "GET",
        url: `courses/${courseId}`
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
