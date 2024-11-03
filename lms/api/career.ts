import type { Career, Pagination } from "@/types";
import { fetchData } from "./common";

export const getCareers = async (companyId: string, pagination: Pagination) => {
  return fetchData({
    method: "GET",
    url: `companies/${companyId}/careers?page=${
      pagination.pageIndex + 1
    }&per_page=${pagination.pageSize}`,
  });
};

export const addCareer = async (companyId: string, title: string) => {
  return fetchData<Career>({
    method: "POST",
    url: `companies/${companyId}/careers`,
    data: { companyId, title },
  });
};

export const getCareer = async (companyId: string,careerId: string) => {
  return fetchData<Career>({
    method: "GET",
    url: `companies/${companyId}/careers/${careerId}`,
  });
};

export const deleteCareer = async (removeCareerId: string) => {
  return fetchData<Career>({
    method: "DELETE",
    url: "admin/users",
    data: {
      removeCareerId: removeCareerId,
    },
  });
};
