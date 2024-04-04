import axiosClientService from "../../utils/axiosConfig";

const uploadImg = async (data, config) => {
  const response = await axiosClientService.post("upload", data, config);
  return response.result;
};

const deleteImg = async (id) => {
  const response = await axiosClientService.delete(
    `upload/delete-image/${id}`,
  );
  return response.result;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
