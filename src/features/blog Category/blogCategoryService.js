import { axiosClientService } from "../../utils/axiosConfig";

const getBlogCategoires = async () => {
  try {
    const response = await axiosClientService.get("blogcategory");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const addTheBlogCategory = async (userData) => {
  try {
    const response = await axiosClientService.post("blogcategory", userData);
    return response.result;
  } catch (error) {
    throw error;
  }
};
const deleteTheBlogCategory = async (blogCategoryId) => {
  try {
    const response = await axiosClientService.delete(
      `blogcategory/${blogCategoryId}`
    );
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const blogCategoryService = {
  getBlogCategoires,
  addTheBlogCategory,
  deleteTheBlogCategory,
};
