import { fetchData } from "./common";

export const getAnalytics = async (path: string = "admin/analytics") => {
  const response = await fetchData({
    method: "GET",
    url: path,
  });
  return response
};