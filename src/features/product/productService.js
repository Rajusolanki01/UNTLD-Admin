import { axiosClientService } from "../../utils/axiosConfig";

const getProducts = async () => {
  try {
    const response = await axiosClientService.get("product");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axiosClientService.delete(`product/${productId}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const productService = {
  getProducts,
  deleteProduct,
};
