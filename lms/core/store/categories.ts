import { getCategories, deleteCategory, addCategory } from "@/api";
import type { Category, Pagination } from "@/types";
import { create } from "zustand";

interface categories {
  categories: Category[];
  pageCount: number;
  getCategories: (pagination: Pagination) => Promise<void>;
  addCategories: (categoryId: string, title: string) => Promise<void>;
  removeCategories: (removeCategoryId: string) => Promise<void>;
}

export const useCategories = create<categories>()((set) => ({
  categories: [],
  pageCount: 0,
  getCategories: async (pagination: Pagination) => {
    const data: any = await getCategories(pagination);
    if (data.data) {
      set({ categories: data.data as Category[], pageCount: data.last_page });
    }
  },
  addCategories: async (title: string) => {
    const data = await addCategory(title);
    if (data) {
      set((state) => ({ categories: [...state.categories, data] }));
    }
  },
  removeCategories: async (removeCategoryId: string) => {
    const data = await deleteCategory(removeCategoryId);
    if (data) {
      set((state) => ({
        categories: state.categories.filter((user) => user.id !== data.id),
      }));
    }
  },
}));
