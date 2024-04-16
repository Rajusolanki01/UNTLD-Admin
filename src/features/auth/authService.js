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
    const response = await axiosClientService.get("user/order/getallorders");
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

const updateOrder = async (orderId, orderStatus) => {
  try {
    const response = await axiosClientService.put(
      `user/order/update-order/${orderId}`,
      { status: orderStatus }
    );
    return response.result;
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (userData) => {
  try {
    const response = await axiosClientService.post(
      "user/admin/forgot-password-token",
      userData
    );
    return response.result;
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (userData) => {
  try {
    const response = await axiosClientService.put(
      `user/reset-password/${userData.token}`,
      { password: userData.password }
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

const getMonthlyOrders = async () => {
  try {
    const response = await axiosClientService.get(
      "user/order/getMonthWiseOrderIncome"
    );
    return response.result;
  } catch (error) {
    throw error;
  }
};

const yearTotalOrders = async () => {
  try {
    const response = await axiosClientService.get(
      "user/order/getYearTotalOrders"
    );
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const authService = {
  login,
  logout,
  forgotPassword,
  resetPassword,
  getOrders,
  getOrderByUser,
  updateOrder,
  getMonthlyOrders,
  yearTotalOrders,
};
