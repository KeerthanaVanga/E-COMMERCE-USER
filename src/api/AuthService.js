import axiosInstance from "../lib/Interceptor";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const loginUser = (authData, mode) => {
  return axiosInstance.post(`/user/${mode}`, authData);
};

export const logoutUser = () => {
  return axiosInstance.get("/user/logout");
};

export const checkUser = () => {
  return axiosInstance.get("/user/check-user");
};

export const refreshToken = () => {
  return axios.post(`${backendUrl}/user/user-refresh`, null, {
    withCredentials: true,
  });
};

export const profile = async ({ signal }) => {
  const response = await axiosInstance.get("/user/get-profile", { signal });

  if (response.data.success) {
    return response.data.user;
  }

  throw new Error(
    response.data.message || "Failed to fetch best seller product"
  );
};
