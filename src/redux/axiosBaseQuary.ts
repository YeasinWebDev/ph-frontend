import { axiosInstance } from "@/lib/axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      
      // Safe access to error response
      const responseData = err.response?.data;
      
      if (responseData && typeof responseData === 'object') {
        return {
          error: {
            status: err.response?.status,
            data: responseData,
          },
        };
      }
      
      // Handle cases where response.data might be undefined
      return {
        error: {
          status: err.response?.status || 500,
          data: {
            success: false,
            message: err.message || "Something went wrong",
            errorSources: [],
          },
        },
      };
    }
  };