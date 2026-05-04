import axios from "axios";

const api = axios.create({
  baseURL: "https://coinbase-demo-backend-aee4.onrender.com/api",
  withCredentials: true,
});

export default api;
