import axios from "axios";

import { API_URL } from "@/constants";

import type { TokenType } from "@/types";

export * from "./axios";

export const client = axios.create({
  baseURL: API_URL,
});

export const setRequestInterceptor = ({ token }: { token: TokenType }) => {
  return client.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const setResponseInterceptior = ({
  token,
  refresh,
}: {
  token: TokenType;
  refresh: (newToken: TokenType | null, logout: boolean) => Promise<void>;
}) => {
  return client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = token.refresh_token;
        if (refreshToken) {
          try {
            const response = await axios.get(`${API_URL}/user/refresh`, {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            });
            if (response.status === 200) {
              // don't use axious instance that already configured for refresh token api call
              const newAccessToken = response.data.access_token;
              const token = {
                access_token: response.data.access_token,
                refresh_token: response.data.access_token,
              };
              refresh(token, false); //set new access token
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(originalRequest); //recall Api with new token
            } else if (response.status === 401) {
              refresh(null, true);
            }
          } catch (e) {
            // Handle token refresh failure
            // mostly logout the user and re-authenticate by login again
            console.log(e);
            refresh(null, true);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
