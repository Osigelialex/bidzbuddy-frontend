import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="grid sm:grid-cols-12 min-h-screen">
      <AdminSidebar />
      <main className="col-span-10 bg-[#fcfcfc]">
        <Outlet />
      </main>
    </div>
  );
}
 
export default AdminLayout;