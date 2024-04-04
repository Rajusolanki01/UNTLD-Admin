import { axiosClientService } from "../../utils/axiosConfig";

const getColor = async () => {
  try {
    const response = await axiosClientService.get("color");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const addColor = async (userData) => {
  try {
    const response = await axiosClientService.post("color", userData);
    return response.result;
  } catch (error) {
    throw error;
  }
};

const updateColor = async (colorId, updateColor) => {
  try {
    const response = await axiosClientService.put(`color/${colorId}`, {
      title: updateColor,
    });

    return response.result;
  } catch (error) {
    throw error;
  }
};

const deleteColor = async (colorId) => {
  try {
    const response = await axiosClientService.delete(`color/${colorId}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const colorService = {
  getColor,
  addColor,
  updateColor,
  deleteColor,
};
