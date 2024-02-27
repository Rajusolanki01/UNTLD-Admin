import { axiosClientService } from "../../utils/axiosConfig";

const getCoupon = async () => {
  try {
    const response = await axiosClientService.get("coupon");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const addCoupon = async (userData) => {
  try {
    const response = await axiosClientService.post("coupon", userData);
    return response.result;
  } catch (error) {
    throw error;
  }
};

const updateCoupon = async (couponId, data) => {
  try {
    const response = await axiosClientService.put(`coupon/${couponId}`, data);

    return response.result;
  } catch (error) {
    throw error;
  }
};

const deleteCoupon = async (couponId) => {
  try {
    const response = await axiosClientService.delete(`coupon/${couponId}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const couponService = {
  getCoupon,
  addCoupon,
  updateCoupon,
  deleteCoupon,
};
