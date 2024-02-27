import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";
import toast from "react-hot-toast";


let baseURL = process.env.REACT_APP_SERVER_BASE_URL;

export const axiosClientService = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClientService.interceptors.request.use(
  (config) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClientService.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.status === "ok") {
      const statusCode = data.statusCode;
      if (statusCode === 201) {
        toast.success(data.result);
      }
      return data;
    }

    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;

    if (data.statusCode === 201) {
      toast.success(data.result);
    }

    toast.error(error);

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}user/refresh-token`, {
          withCredentials: true,
        })
        .then((refreshResponse) => {
          if (
            refreshResponse.data.status === "ok" &&
            refreshResponse.data.result.accessToken
          ) {
            const newAccessToken = refreshResponse.data.result.accessToken;
            setItem(KEY_ACCESS_TOKEN, newAccessToken);

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axiosClientService(originalRequest);
          } else {
            removeItem(KEY_ACCESS_TOKEN);
            window.location.replace("/admin-login");
            return Promise.reject(error);
          }
        })
        .catch((refreshError) => {
          toast.error("Error refreshing token:", refreshError);
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  },
  async (error) => {
    toast.error(error);
    return Promise.reject(error);
  }
);
