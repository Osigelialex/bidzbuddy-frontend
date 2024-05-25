import { useContext, createContext } from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../config/axiosConfig";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/v1/auth/me");
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [accessToken]);

  useEffect(() => {
    const checkTokenExpired = () => {
      if (accessToken) {
        const decodedJwt = jwtDecode(accessToken);
        if (decodedJwt.exp * 1000 < Date.now()) {
          logout();
          console.log("TOKEN REMOVED");
        } else {
          console.log("NOT EXPIRED");
        }
      }
    };

    const intervalId = setInterval(checkTokenExpired, 20000);
    return () => clearInterval(intervalId);
  }, []);

  const loginAction = async (data) => {
    const response = await axios.post("/api/v1/auth/login", data);

    const newToken = response.data.accessToken;
    setAccessToken(newToken);

    Cookies.set("accessToken", newToken, { secure: "true" });

    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setUser(null);
    setAccessToken("");
    Cookies.remove("accessToken");
    axios.defaults.headers.common["Authorization"] = "";
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
