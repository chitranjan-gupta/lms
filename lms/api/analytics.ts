import { fetchData } from "./common";

export const getAnalytics = async (path: string = "admin/analytics") => {
  return await fetchData({
    method: "GET",
    url: path,
  });
};

export const getCourseAnalytics = async () => {
  return await fetchData({
    method: "POST",
    url: "courses/user/purchase"
  })
}