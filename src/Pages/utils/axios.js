import axios from "axios";

const api = axios.create({
  baseURL: "https://renteze.onrender.com",
  // baseURL: "http://localhost:3000",
  // baseURL: "https://phpstack-501953-5654745.cloudwaysapps.com",


  withCredentials: true,
});

export default api;
