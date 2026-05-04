import axios from "axios";

const api = axios.create({
  baseURL: "https://coinbase-demo-backend-aee4.onrender.com/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("jwt");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
