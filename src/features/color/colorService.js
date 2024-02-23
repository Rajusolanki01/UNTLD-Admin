import { axiosClientService } from "../../utils/axiosConfig";

const getcolor = async () => {
  try {
    const response = await axiosClientService.get("color");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const addcolor = async (userData) => {
  try {
    const response = await axiosClientService.post("color", userData);
    return response.result;
  } catch (error) {
    throw error;
  }
};
const deletecolor = async (colorId) => {
  try {
    const response = await axiosClientService.delete(`color/${colorId}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const colorService = {
  getcolor,
  addcolor,
  deletecolor,
};
