import { User } from "@/types";
import { fetchData } from "./common";

export const getTeachers = async () => {
  return fetchData<User[]>({
    method: "GET",
    url: "admin/subadmins",
  });
};

export const removeTeacher = async (removeTeacherId: string) => {
  return fetchData<User>({
    method: "DELETE",
    url: "admin/subadmins",
    data: {
      removeSubadminId: removeTeacherId,
    },
  });
};
