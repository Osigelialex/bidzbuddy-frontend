import { useContext, createContext } from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../config/axiosConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    Cookies.get("accessToken") || "",
  );

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const response = await axios.get("/api/v1/auth/get-user", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [accessToken]);

  const loginAction = async (data) => {
    const response = await axios.post("/api/v1/auth/login", data);

    const newToken = response.data.accessToken;
    setAccessToken(newToken);

    Cookies.set("accessToken", newToken, {
      secure: "true",
      expires: new Date(Date.now() + 20000)
    });

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
