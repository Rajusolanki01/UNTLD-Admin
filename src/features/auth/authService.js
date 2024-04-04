import { setItem, KEY_ACCESS_TOKEN } from "../../utils/localStorageManager";
import { axiosClientService } from "../../utils/axiosConfig";

const login = async (userData) => {
  try {
    const response = await axiosClientService.post(
      "user/admin-login",
      userData
    );
    const accessToken = response?.result?.accessToken;
    if (accessToken) {
      setItem(KEY_ACCESS_TOKEN, accessToken);
    }
    return response.result;
  } catch (error) {
    throw error;
  }
};

const getOrders = async () => {
  try {
    const response = await axiosClientService.get("user/getallorders");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const getOrderByUser = async (id) => {
  try {
    const response = await axiosClientService.post(`user/getOrderByUser/${id}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (userData) => {
  try {
    const response = await axiosClientService.post(
      "user/forgot-password-token",
      userData
    );
    return response.result;
  } catch (error) {
    throw error;
  }
};

const logout = async (userData) => {
  try {
    const response = await axiosClientService.get("user/logout", userData);
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const authService = {
  login,
  getOrders,
  getOrderByUser,
  forgotPassword,
  logout,
};
