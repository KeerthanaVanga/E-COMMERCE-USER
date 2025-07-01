import { authActions } from "./auth-slice";
import {
  loginUser,
  checkUser,
  refreshToken as refreshTokenService,
  logoutUser,
} from "../api/AuthService";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const checkUserAuth = () => {
  return async (dispatch) => {
    dispatch(authActions.setCheckingAuth(true));

    try {
      const response = await checkUser();

      if (response.status === 200 && response.data.success) {
        dispatch(authActions.setAuth(true));
      } else {
        dispatch(authActions.setAuth(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(authActions.setAuth(false));
    } finally {
      dispatch(authActions.setCheckingAuth(false));
    }
  };
};

export const refreshToken = () => {
  return async (dispatch) => {
    try {
      const response = await refreshTokenService();

      if (response.status === 200 && response.data.success) {
        return true;
      } else {
        throw new Error("Refresh failed");
      }
    } catch (error) {
      console.log(error);
      dispatch(authActions.setAuth(false));
      toast.error("Session expired. Please login again.");
      return false;
    }
  };
};

export const loginThunk = (formData, mode) => {
  return async (dispatch) => {
    try {
      if (!["login", "signup"].includes(mode)) {
        toast.error("Invalid mode provided.");
        return null;
      }

      const email = formData.get("email");
      const password = formData.get("password");
      const name = formData.get("name");

      if (!email || !password || (mode === "signup" && !name)) {
        toast.error("Please fill in all required fields.");
        return null;
      }

      const authData = { email, password };
      if (mode === "signup") authData.name = name;

      const response = await loginUser(authData, mode);

      if (!response.data.success) {
        toast.error(response.data.message || "Authentication failed.");
        return null;
      }

      toast.success(
        mode === "signup" ? "Signup successful!" : "Login successful!"
      );
      dispatch(authActions.setAuth(true));

      return redirect("/home");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      return null;
    }
  };
};

export const logoutThunk = () => {
  return async (dispatch) => {
    try {
      const response = await logoutUser();

      if (!response.data.success) {
        toast.error(response.data.message || "Logout failed.");
        return false;
      }

      toast.success("Logout successful.");
      dispatch(authActions.setAuth(false));
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      return false;
    }
  };
};
