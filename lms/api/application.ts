import type { Application } from "@/types";
import { fetchData } from "./common";

export const getApplications = async (path: string = "admin/applications") => {
  const response = await fetchData({
    method: "GET",
    url: path,
  });
  return response as Application[];
};

export const approveApplication = async (
  applicationId: string,
  path: string = "admin/applications/approve"
) => {
  const response = await fetchData({
    method: "POST",
    url: path,
    data: {
      applicationId,
    },
  });
  return response as Application;
};

export const rejectApplication = async (
  applicationId: string,
  path: string = "admin/applications/reject"
) => {
  const response = await fetchData({
    method: "POST",
    url: path,
    data: {
      applicationId,
    },
  });
  return response as Application;
};

export const applyApplication = async (path: string = "admin/applications/apply") => {
  const response = await fetchData({
    method: "POST",
    url: path
  });
  return response as Application;
};
