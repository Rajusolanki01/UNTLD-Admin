import { axiosClientService } from "../../utils/axiosConfig";

const getBlogs = async () => {
  try {
    const response = await axiosClientService.get("blog");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const addBlog = async (userData) => {
  try {
    const response = await axiosClientService.post("blog", userData);
    return response.result;
  } catch (error) {
    throw error;
  }
};
const deleteBlog = async (blogId) => {
  try {
    const response = await axiosClientService.delete(`blog/${blogId}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const blogService = {
  getBlogs,
  addBlog,
  deleteBlog,
};
