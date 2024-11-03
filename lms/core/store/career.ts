import { getCareer, deleteCareer } from "@/api";
import type { Career as CareerType } from "@/types";
import { create } from "zustand";

interface Career {
  career: CareerType | null;
  getCareer: (companyId: string, careerId: string) => Promise<void>;
  removeCareer: (removeCareerId: string) => Promise<void>;
}

export const useCareer = create<Career>()((set) => ({
  career: null,
  getCareer: async (companyId: string,careerId: string) => {
    const data = await getCareer(companyId, careerId);
    if (data) {
      set({ career: data });
    }
  },
  removeCareer: async (removeCareerId: string) => {
    const data = await deleteCareer(removeCareerId);
    if (data) {
      set((state) => ({
        career: null,
      }));
    }
  },
}));

export const removeCareer = async (removeCareerId: string) =>
  useCareer.getState().removeCareer(removeCareerId);
