import { create } from "zustand";

import {
  getCategories,
  deleteCategory,
  addCategory,
  editCategory,
} from "@/api";
import type { Category, Pagination } from "@/types";

interface Categories {
  categories: Category[];
  pageCount: number;
  getCategories: (pagination: Pagination, path?: string) => Promise<void>;
  addCategories: (name: string, path?: string) => Promise<void>;
  editCategories: (
    categoryId: string,
    name: string,
    path?: string
  ) => Promise<void>;
  removeCategories: (categoryId: string, path?:string) => Promise<void>;
}

export const useCategories = create<Categories>()((set) => ({
  categories: [],
  pageCount: 0,
  getCategories: async (
    pagination: Pagination,
    path: string = "categories"
  ) => {
    const data: any = await getCategories(pagination, path);
    if (data.data) {
      set({ categories: data.data as Category[], pageCount: data.last_page });
    }
  },
  addCategories: async (name: string, path: string = "categories") => {
    const data = await addCategory(name, path);
    if (data) {
      set((state) => ({ categories: [...state.categories, data] }));
    }
  },
  editCategories: async (
    categoryId: string,
    name: string,
    path: string = "categories"
  ) => {
    const data = await editCategory(categoryId, name, path);
    if (data) {
      set((state) => ({ categories: [...state.categories.filter((category) => category.id !== data.id), data] }));
    }
  },
  removeCategories: async (categoryId: string, path: string = "categories") => {
    const data = await deleteCategory(categoryId, path);
    if (data) {
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== data.id),
      }));
    }
  },
}));
