import axios from "axios";
import { API_BASE_URL } from "./config";
import { clearAuthTokens, getToken } from "../utils/auth";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== "/signin") {
      clearAuthTokens();
      window.location.assign("/signin");
    }

    return Promise.reject(error);
  },
);

export default api;
