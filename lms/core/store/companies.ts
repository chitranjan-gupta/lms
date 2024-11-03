import { getCompanies, deleteCompany, addCompany } from "@/api";
import type { Company, Pagination } from "@/types";
import { create } from "zustand";

interface Companies {
  companies: Company[];
  pageCount: number;
  getCompanies: (pagination: Pagination) => Promise<void>;
  addCompanies: (values: { name: string }) => Promise<void>;
  removeCompanies: (removeCompanyId: string) => Promise<void>;
}

export const useCompanies = create<Companies>()((set) => ({
  companies: [],
  pageCount: 0,
  getCompanies: async (pagination: Pagination) => {
    const data:any = await getCompanies(pagination);
    if (data) {
      set({ companies: data.data as Company[], pageCount: data.last_page });
    }
  },
  addCompanies: async (values: { name: string }) => {
    const data = await addCompany(values);
    if (data) {
      set((state) => ({ companies: [...state.companies, data] }));
    }
  },
  removeCompanies: async (removeCompanyId: string) => {
    const data = await deleteCompany(removeCompanyId);
    if (data) {
      set((state) => ({
        companies: state.companies.filter((user) => user.id !== data.id),
      }));
    }
  },
}));

export const removeCompanies = async (removeCompanyId: string) =>
  useCompanies.getState().removeCompanies(removeCompanyId);
