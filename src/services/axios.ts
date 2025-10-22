import axios, { type AxiosInstance, type AxiosRequestConfig, type ResponseType } from "axios";
import { useAxiosInterceptor } from "./useAxiosInterceptor";
import { Toast } from "../ui-kit";

const ENV = import.meta.env;
const baseUrl = ENV.VITE_API_URL || "/api/v1";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// eslint-disable-next-line react-hooks/rules-of-hooks
useAxiosInterceptor(axiosInstance);

// Error handling function
const handleError = (error: any) => {
  console.error(error);
  const errResponse = error.response;

  if (error.code === "ERR_NETWORK") {
    Toast(
      "Kesalahan Koneksi",
      "error",
      "Silakan periksa koneksi internet Anda dan coba lagi."
    );
  } else if (!error.status) {
    Toast(
      "Terjadi Kesalahan!",
      "error",
      "Silahkan kontak admin untuk info lebih lanjut."
    );
  }

  return {
    status: errResponse ? errResponse.status : error.code,
    data: errResponse ? errResponse.data : error.message,
  };
};

// Function to handle API requests
const apiRequest = async (
  method: string,
  url: string,
  data?: any,
  params?: any,
  responseType?: ResponseType,
  isFileUpload: boolean = false
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      responseType,
      headers: isFileUpload
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
      paramsSerializer: (params) =>
        Object.entries(params || {})
          .map(([key, value]) => `${key}=${value}`)
          .join("&"),
    };
    const response = await axiosInstance(config);
    return { status: response.status, data: response.data };
  } catch (error: any) {
    return handleError(error);
  }
};

export const getAPI = (
  url: string,
  data: any,
  params?: any,
  responseType: ResponseType = "json"
) => apiRequest("get", url, data, params, responseType);
export const postAPI = (url: string, data: any) =>
  apiRequest("post", url, data);
export const putAPI = (url: string, data: any) => apiRequest("put", url, data);
export const patchAPI = (url: string, data: any) =>
  apiRequest("patch", url, data);
export const deleteAPI = (url: string, data: any) =>
  apiRequest("delete", url, data);

export const postFileAPI = (url: string, data: any) =>
  apiRequest("post", url, data, undefined, undefined, true);
export const putFileAPI = (url: string, data: any) =>
  apiRequest("put", url, data, undefined, undefined, true);
