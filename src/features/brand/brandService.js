import { axiosClientService } from "../../utils/axiosConfig";

const getBrands = async () => {
  try {
    const response = await axiosClientService.get("brand");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const createBrand = async (userData) => {
  try {
    const response = await axiosClientService.post("brand", userData);
    return response.result;
  } catch (error) {
    throw error;
  }
};

const updateBrand = async (brandId, title) => {
  try {
    const response = await axiosClientService.put(`brand/${brandId}`, {
      title: title,
    });

    return response.result;
  } catch (error) {
    throw error;
  }
};

const deleteBrand = async (deleteId) => {
  try {
    const response = await axiosClientService.delete(`brand/${deleteId}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const brandService = {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};
