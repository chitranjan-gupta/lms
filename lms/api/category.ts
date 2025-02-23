import type { Category, Pagination } from "@/types";
import { fetchData } from "./common";

export const getCategories = async (pagination: Pagination, path: string = "categories") => {
  const response = await fetchData({
    method: "GET",
    url: path,
    // url: `categories?page=${
    //   pagination.pageIndex + 1
    // }&per_page=${pagination.pageSize}`,
  });
  return {
    data: response as unknown as Category[],
    last_page: 1,
  }
};

export const addCategory = async (name: string, path: string = "categories") => {
  return fetchData<Category>({
    method: "POST",
    url: path,
    data: { name },
  });
};

export const editCategory = async (categoryId: string, name: string, path: string = "categories") => {
  return fetchData<Category>({
    method: "PUT",
    url: path,
    data: { categoryId, name },
  });
};

export const deleteCategory = async (categoryId: string, path: string = "categories") => {
  return fetchData<Category>({
    method: "DELETE",
    url: path,
    data: {
      categoryId: categoryId,
    },
  });
};
