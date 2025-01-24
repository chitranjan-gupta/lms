import { User } from "@/types";
import { fetchData } from "./common";

export const login = async (email: string, password: string) => {
  const response = await fetchData({
    method: "POST",
    url: `user/signin`,
    data: {
      email: email,
      password: password,
    },
  });
  return response as User;
};

export const register = async (
  name: string,
  username: string,
  email: string,
  password: string
) => {
  const response = await fetchData({
    method: "POST",
    url: `user/signup`,
    data: {
      name: name,
      username: username,
      email: email,
      password: password,
    },
  });
  return response as User;
};

export const logout = async () => {
  return fetchData({
    method: "GET",
    url: `user/logout`
  });
}
