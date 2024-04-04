import { axiosClientService } from "../../utils/axiosConfig";

const getProducts = async () => {
  try {
    const response = await axiosClientService.get("product");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const getSingleProduct = async (productId) => {
  try {
    const response = await axiosClientService.get(`product/${productId}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

const addProduct = async (product) => {
  try {
    const response = await axiosClientService.post("product", product);
    return response.result;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (productId, values) => {
  try {
    const response = await axiosClientService.put(
      `product/${productId}`,
      values
    );
    console.log(response);
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
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
