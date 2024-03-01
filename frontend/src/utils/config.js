import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mern-ecommerce-cswv.onrender.com/api",
});
