import type { Company, Pagination } from "@/types";
import { fetchData } from "./common";

export const getCompanies = async (pagination: Pagination) => {
  return fetchData({
    method: "GET",
    url: `companies?page=${pagination.pageIndex + 1}&per_page=${
      pagination.pageSize
    }`,
  });
};

export const addCompany = async (values: { name: string }) => {
  return fetchData<Company>({
    method: "POST",
    url: "companies",
    data: values,
  });
};

export const getCompany = async (companyId: string) => {
  return fetchData<Company>({
    method: "GET",
    url: `companies/${companyId}`
  });
};

export const deleteCompany = async (removeCompanyId: string) => {
  return fetchData<Company>({
    method: "DELETE",
    url: "admin/users",
    data: {
      removeCompanyId: removeCompanyId,
    },
  });
};
