import axios from "axios";

const api = axios.create({
  baseURL: "https://renteze.onrender.com",
  withCredentials: true,
});

export default api;
