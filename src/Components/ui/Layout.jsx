import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const Account = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="md:grid sm:min-h-screen gap-2 bg-gray-100 px-5 py-10 md:grid-cols-12 font-saira">
        <Sidebar />
        <main className="col-span-9">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Account;
