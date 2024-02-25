import { axiosClientService } from "../../utils/axiosConfig";

const getenquiries = async () => {
  try {
    const response = await axiosClientService.get("enquiry");
    return response.result;
  } catch (error) {
    throw error;
  }
};

const updateEnquiry = async (updateEnquiryId, userData) => {
  try {
    const response = await axiosClientService.put(
      `enquiry/${updateEnquiryId}`,
      userData
    );
    return response.result;
  } catch (error) {
    throw error;
  }
};

const deleteEnquiry = async (enquiryId) => {
  try {
    const response = await axiosClientService.delete(`enquiry/${enquiryId}`);
    return response.result;
  } catch (error) {
    throw error;
  }
};

export const enquiryService = {
  getenquiries,
  updateEnquiry,
  deleteEnquiry,
};
