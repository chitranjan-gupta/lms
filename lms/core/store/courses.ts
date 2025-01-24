import { getCourses, deleteCourse, addCourse } from "@/api";
import type { Course, Pagination } from "@/types";
import { create } from "zustand";

interface Courses {
    courses: Course[];
    pageCount: number;
    getCourses: (pagination: Pagination) => Promise<void>;
    addCourse: (values: { name: string }) => Promise<void>;
    removeCourse: (removeCourseId: string) => Promise<void>;
}

export const useCourses = create<Courses>()((set) => ({
    courses: [],
    pageCount: 0,
    getCourses: async (pagination: Pagination) => {
        const data: any = await getCourses(pagination);
        if (data.data) {
            set({ courses: data.data as Course[], pageCount: data.last_page });
        }
    },
    addCourse: async (values: { name: string }) => {
        const data = await addCourse(values);
        if (data) {
            set((state) => ({ courses: [...state.courses, data] }));
        }
    },
    removeCourse: async (removeCourseId: string) => {
        const data = await deleteCourse(removeCourseId);
        if (data) {
            set((state) => ({
                courses: state.courses.filter((course) => course.id !== data.id),
            }));
        }
    },
}));

export const removeCourse = async (removeCourseId: string) =>
    useCourses.getState().removeCourse(removeCourseId);
