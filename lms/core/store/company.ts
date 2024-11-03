import { getCompany, deleteCompany } from "@/api";
import type { Company as CompanyType } from "@/types";
import { create } from "zustand";

interface Company {
  company: CompanyType | null;
  getCompany: (companyId: string) => Promise<void>;
  removeCompany: (removeCompanyId: string) => Promise<void>;
}

export const useCompany = create<Company>()((set) => ({
  company: null,
  getCompany: async (companyId: string) => {
    const data = await getCompany(companyId);
    if (data) {
      set({ company: data });
    }
  },
  removeCompany: async (removeCompanyId: string) => {
    const data = await deleteCompany(removeCompanyId);
    if (data) {
      set((state) => ({
        company: null,
      }));
    }
  },
}));

export const removeCompany = async (removeCompanyId: string) =>
  useCompany.getState().removeCompany(removeCompanyId);
