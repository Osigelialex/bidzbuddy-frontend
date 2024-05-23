import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/AuthProvider";

const AdminRoute = () => {
  const auth = useAuth();
  if (!auth.user || !auth.user.role === "ADMIN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default AdminRoute;