import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const instance = axios.create({
  baseURL: "https://bidzbuddy.onrender.com",
  // baseURL: "http://localhost:8080",
  timeout: 10000
});

instance.interceptors.request.use(config => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    return config;
  }

  try {
    const decodedJwt = jwtDecode(accessToken);
    if (decodedJwt.exp * 1000 < Date.now()) {
      Cookies.remove("accessToken");
      return config;
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  } catch (error) {
    Cookies.remove("accessToken");
  }
});

export default instance;
