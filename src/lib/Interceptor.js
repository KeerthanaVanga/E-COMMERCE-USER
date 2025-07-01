import { refreshToken } from "../store/auth-actions";
import axios from "axios";
import store from "../store";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axiosInstance(originalRequest);
        }

        refreshPromise = store.dispatch(refreshToken());
        const refreshSuccess = await refreshPromise;
        refreshPromise = null;

        if (!refreshSuccess) {
          return Promise.reject(error);
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
