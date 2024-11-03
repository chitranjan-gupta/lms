import { getTeachers, removeTeacher } from "@/api";
import { User } from "@/types";
import { create } from "zustand";

interface Teachers {
  teachers: User[];
  getTeachers: () => Promise<void>;
  addTeachers: () => Promise<void>;
  removeTeachers: (removeTeacherId: string) => Promise<void>;
}

export const useTeachers = create<Teachers>()((set) => ({
  teachers: [],
  getTeachers: async () => {
    const data = await getTeachers();
    if (data) {
      set({ teachers: data });
    }
  },
  addTeachers: async () => {
    const data = await getTeachers();
    if (data) {
      set((state) => ({ teachers: [...state.teachers, ...data] }));
    }
  },
  removeTeachers: async (removeTeacherId: string) => {
    const data = await removeTeacher(removeTeacherId);
    if (data) {
      set((state) => ({
        teachers: state.teachers.filter((teacher) => teacher.id !== data.id),
      }));
    }
  },
}));

export const removeTeachers = async (removeTeacherId: string) =>
  useTeachers.getState().removeTeachers(removeTeacherId);
