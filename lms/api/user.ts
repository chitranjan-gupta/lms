import { User } from "@/types";
import { fetchData } from "./common";

export const getUsers = async () => {
  return fetchData<User[]>({
    method: "GET",
    url: "admin/users",
  });
};

export const removeUser = async (removeUserId: string) => {
  return fetchData<User>({
    method: "DELETE",
    url: "admin/users",
    data: {
      removeUserId: removeUserId
    },
  });
};
