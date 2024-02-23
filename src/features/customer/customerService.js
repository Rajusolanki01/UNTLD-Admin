import { axiosClientService } from "../../utils/axiosConfig";

const getUsers = async () => {
  try {
    const response = await axiosClientService.get("user/all-users");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const getASingleUsers = async (id) => {
  try {
    const response = await axiosClientService.get(`user/${id}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

const blockUser = async (id) => {
  try {
    const response = await axiosClientService.put(`user/block-user/${id}`);
    return response?.result;
  } catch (error) {
    throw error;
  }
};

const UnblockUser = async (id) => {
  try {
    const response = await axiosClientService.put(`user/unblock-user/${id}`);
    return response?.result;
  } catch (error) {
    throw error;
  }
};

export const customerService = {
  getUsers,
  getASingleUsers,
  blockUser,
  UnblockUser,
};
