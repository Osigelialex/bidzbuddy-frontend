import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      Cookies.remove("accessToken");
    }

    return Promise.reject(error);
  }
);

export default instance;