import type { AxiosInstance } from "axios";
import { useRefreshToken } from './useRefreshToken'
import { Toast } from "../ui-kit";

// Helper function to get the authorization token
const getToken = (): string => {
  const tempState = localStorage.getItem("gokka_login");
  const loginstate = tempState ? JSON.parse(tempState) : "";
  return loginstate?.token;
};

// Src: https://axios-http.com/docs/interceptors

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const useAxiosInterceptor = (axiosInstance: AxiosInstance) => {
  const refresh = useRefreshToken();

  const requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getToken();
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                resolve(axiosInstance(originalRequest));
              },
              reject: (err) => reject(err),
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refresh();
          processQueue(null, newToken);

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.removeItem("gokka_login");
          Toast("Sesi Habis", "error", "Silahkan masuk kembali dan coba lagi.");
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return () => {
    axiosInstance.interceptors.request.eject(requestInterceptor);
    axiosInstance.interceptors.response.eject(responseInterceptor);
  };
};
