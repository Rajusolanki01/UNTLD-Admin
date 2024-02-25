import { axiosClientService } from "../../utils/axiosConfig";

const getCategory = async () => {
  try {
    const response = await axiosClientService.get("category");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const addCategory = async (userData) => {
  try {
    const response = await axiosClientService.post("category", userData);
    return response.result;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosClientService.delete(`category/${categoryId}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const categoryService = {
  getCategory,
  addCategory,
  deleteCategory,
};
