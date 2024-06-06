import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="grid sm:grid-cols-12 min-h-screen h-screen">
      <AdminSidebar />
      <main className="col-span-10 bg-slate-50 sm:ml-48 min-w-full">
        <Outlet />
      </main>
    </div>
  );
}
 
export default AdminLayout;