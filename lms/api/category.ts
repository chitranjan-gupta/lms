import type { Category, Pagination } from "@/types";
import { fetchData } from "./common";

export const getCategories = async (pagination: Pagination) => {
  const response = await fetchData({
    method: "GET",
    url: "categories",
    // url: `categories?page=${
    //   pagination.pageIndex + 1
    // }&per_page=${pagination.pageSize}`,
  });
  return {
    data: response as unknown as Category[],
    last_page: 1,
  }
};

export const addCategory = async (title: string) => {
  return fetchData<Category>({
    method: "POST",
    url: `categories`,
    data: { title },
  });
};

export const deleteCategory = async (removeCategoryId: string) => {
  return fetchData<Category>({
    method: "DELETE",
    url: "categories",
    data: {
      removeCategoryId: removeCategoryId,
    },
  });
};
