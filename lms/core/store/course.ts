import { create } from "zustand";

import { getCourse, getPurchase } from "@/api";
import type { CourseWithChaptersWithAttachments } from "@/types";

interface Course {
  course: CourseWithChaptersWithAttachments | null;
  courseid: string | null;
  loading: boolean;
  isPurchased: boolean;
  getCourse: (courseId: string) => Promise<void>;
  getPurchase: (courseId: string) => Promise<void>;
}

export const useCourse = create<Course>()((set) => ({
  course: null,
  courseid: null,
  loading: false,
  isPurchased: false,
  getCourse: async (courseId: string) => {
    set({ loading: true });
    const data: any = await getCourse(courseId);
    if (data) {
      set({ course: data, courseid: courseId });
    }
    set({ loading: false });
  },
  getPurchase: async (courseId: string) => {
    const data: any = await getPurchase(courseId);
    if (data) {
      set({ isPurchased: courseId === data.courseId });
    }
  },
}));
