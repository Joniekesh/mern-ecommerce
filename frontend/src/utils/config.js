import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://mernecommerceapp2.herokuapp.com/api",
});
