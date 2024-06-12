import { RiAuctionFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiShoppingCart } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { RiAuctionLine } from "react-icons/ri";
import { useState } from "react";
import { MdOutlinePendingActions } from "react-icons/md";

const AdminSidebar = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  return (
    <div className="h-screen fixed top-0 left-0 w-48 col-span-2 hidden flex-col justify-between shadow-sm px-3 sm:flex font-saira">
      <ul className="mt-3 flex flex-col gap-4 text-gray-500">
        <li className="mx-auto flex items-center align-middle w-full cursor-pointer gap-2 rounded-md border border-purple-500 bg-purple-200 p-3 text-lg font-bold text-purple-500">
          <RiAuctionFill size={20} />
          <p className="text-lg font-extrabold text-purple-950">Bidzbuddy</p>
        </li>
        <Link to="/admin/dashboard">
          <li
            onClick={() => setSelectedItem("Dashboard")}
            className={`text-md flex cursor-pointer text-sm items-center gap-2 rounded-sm px-1 py-3 align-middle font-medium hover:border-r-4 hover:border-purple-500 hover:text-purple-800 ${selectedItem === "Dashboard" ? "border-r-4 border-purple-500 text-purple-800" : ""}`}
          >
            <LuLayoutDashboard size={16} />
            <p>Dashboard</p>
          </li>
        </Link>
        <Link to="/admin/products">
          <li
            onClick={() => setSelectedItem("Products")}
            className={`text-md flex cursor-pointer text-sm items-center gap-2 px-1 py-3 align-middle font-medium hover:border-r-4 hover:border-purple-500 hover:text-purple-800 ${selectedItem === "Products" ? "border-r-4 border-purple-500 text-purple-800" : ""}`}
          >
            <GiShoppingCart size={16} />
            <p>Products</p>
          </li>
        </Link>
        <Link to="/admin/unapproved">
          <li
            onClick={() => setSelectedItem("Unapproved")}
            className={`text-md flex cursor-pointer text-sm items-center gap-2 px-1 py-3 align-middle font-medium hover:border-r-4 hover:border-purple-500 hover:text-purple-800 ${selectedItem === "Unapproved" ? "border-r-4 border-purple-500 text-purple-800" : ""}`}
          >
            <MdOutlinePendingActions size={16} />
            <p>Unapproved</p>
          </li>
        </Link>
        <Link to="/admin/users">
          <li
            onClick={() => setSelectedItem("Users")}
            className={`text-md flex cursor-pointer text-sm items-center gap-2 px-1 py-3 align-middle font-medium hover:border-r-4 hover:border-purple-500 hover:text-purple-800 ${selectedItem === "Users" ? "border-r-4 border-purple-500 text-purple-800" : ""}`}
          >
            <FaRegUser size={16} />
            <p>Users</p>
          </li>
        </Link>
        <Link to="">
          <li
            onClick={() => setSelectedItem("Bids")}
            className={`text-md flex cursor-pointer text-sm items-center gap-2 px-1 py-3 align-middle font-medium hover:border-r-4 hover:border-purple-500 hover:text-purple-800 ${selectedItem === "Bids" ? "border-r-4 border-purple-500" : ""}`}>
            <RiAuctionLine size={16} />
            <p>Bids</p>
          </li>
        </Link>
        <Link to="/admin/categories">
          <li
            onClick={() => setSelectedItem("Categories")}
            className={`text-md flex cursor-pointer text-sm items-center gap-2 px-1 py-3 align-middle font-medium hover:border-r-4 hover:border-purple-500 hover:text-purple-800 ${selectedItem === "Categories" ? "border-r-4 border-purple-500 text-purple-800" : ""}`}
          >
            <BiCategoryAlt size={16} />
            <p>Categories</p>
          </li>
        </Link>
      </ul>
      <li className="text-md mb-3 flex text-sm cursor-pointer items-center gap-2 border-t px-1 py-1 align-middle font-medium">
        <CiLogout size={16} />
        <Link to="/">Back to Site</Link>
      </li>
    </div>
  );
};

export default AdminSidebar;
