import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

import { API_URL } from "@/constants";
import { Log } from "@/lib";

import type { TokenType } from "@/types";

export const client = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Utility function to make requests with try-catch
const requestWrapper = async <T>(
  requestConfig: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await client(requestConfig);
    return response.data; // Return the data directly
  } catch (error: unknown) {
    // Handle error accordingly
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        Log.info(error.response.data);
        Log.error("Error response:", error.response.data);
        throw new Error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        // Request was made but no response received
        Log.error("Error request:", error.request);
        throw new Error("No response received from the server");
      }
    } else if (error instanceof Error) {
      // Handle other errors that are instances of Error
      Log.error("Error message:", error.message);
      throw new Error("An unexpected error occurred");
    } else {
      // Handle non-error objects
      Log.error("An unknown error occurred:", error);
      throw new Error("An unexpected error occurred");
    }
  }
  // Ensure the function always has a return type of T and doesn't return undefined
  throw new Error(
    "Unexpected error: function should always return data or throw"
  );
};

const fetchData = async <T>(config: AxiosRequestConfig): Promise<T | null> => {
  try {
    const data = await requestWrapper<T>(config);
    return data;
  } catch (error) {
    return null; // Explicitly returning null
  }
};

export { requestWrapper, fetchData };

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
              withCredentials: true,
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
