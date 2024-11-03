import { getCareers, deleteCareer, addCareer } from "@/api";
import type { Career, Pagination } from "@/types";
import { create } from "zustand";

interface Careers {
  careers: Career[];
  pageCount: number;
  getCareers: (companyId: string, pagination: Pagination) => Promise<void>;
  addCareers: (companyId: string, title: string) => Promise<void>;
  removeCareers: (removeCareerId: string) => Promise<void>;
}

export const useCareers = create<Careers>()((set) => ({
  careers: [],
  pageCount: 0,
  getCareers: async (companyId: string, pagination: Pagination) => {
    const data: any = await getCareers(companyId, pagination);
    if (data) {
      set({ careers: data.data as Career[], pageCount: data.last_page });
    }
  },
  addCareers: async (companyId: string, title: string) => {
    const data = await addCareer(companyId, title);
    if (data) {
      set((state) => ({ careers: [...state.careers, data] }));
    }
  },
  removeCareers: async (removeCareerId: string) => {
    const data = await deleteCareer(removeCareerId);
    if (data) {
      set((state) => ({
        careers: state.careers.filter((user) => user.id !== data.id),
      }));
    }
  },
}));

export const removeCareers = async (removeCareerId: string) =>
  useCareers.getState().removeCareers(removeCareerId);
