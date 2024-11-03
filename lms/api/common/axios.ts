import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { BASE_API_URL } from "@/constants";

const server = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility function to make requests with try-catch
const requestWrapper = async <T>(
  requestConfig: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await server(requestConfig);
    return response.data; // Return the data directly
  } catch (error: unknown) {
    // Handle error accordingly
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response.data);
        throw new Error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
        throw new Error("No response received from the server");
      }
    } else if (error instanceof Error) {
      // Handle other errors that are instances of Error
      console.error("Error message:", error.message);
      throw new Error("An unexpected error occurred");
    } else {
      // Handle non-error objects
      console.error("An unknown error occurred:", error);
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
    console.error(
      "Error fetching data:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return null; // Explicitly returning null
  }
};

const giveData = async <T>(config: AxiosRequestConfig): Promise<T | null> => {
  try {
    const data = await requestWrapper<T>(config);
    return data;
  } catch (error) {
    console.error(
      "Error giving data:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return null; // Explicitly returning null
  }
};

export { server, requestWrapper, fetchData, giveData };
