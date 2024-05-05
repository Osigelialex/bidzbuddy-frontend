import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
