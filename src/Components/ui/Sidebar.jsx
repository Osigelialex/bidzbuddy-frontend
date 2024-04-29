import { useAuth } from "../../hooks/AuthProvider";
import { RiAuctionLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { FaRegFaceLaughWink } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { useState } from "react";

const Sidebar = ({ setSelectedSection }) => {
  const auth = useAuth();
  const [active, setActive] = useState("overview");

  if (!auth.user) {
    return null;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-md md:col-span-3 text-gray-500 text-xl font-saira">
        <div
          className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white"
          style={{ backgroundColor: active === "overview" ? "rgb(147, 51, 234)" : "", color: active === "overview" ? "white" : ""}}
          onClick={() => {
            setSelectedSection("overview")
            setActive("overview")
          }}
        >
          <RiAccountPinBoxLine size={20} className="mr-2 inline-block" />
          Overview
        </div>
        {auth.user.role === "SELLER" && (
          <div
            className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white"
          >
            <FaRegFaceLaughWink className="mr-2 inline-block" />
            <p>My Products</p>
          </div>
        )}
        {auth.user.role === "BUYER" && (
          <div 
            className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white"
            style={{ backgroundColor: active === "mybids" ? "rgb(147, 51, 234)" : "", color: active === "mybids" ? "white" : ""}}
            onClick={() => {
              setSelectedSection("mybids")
              setActive("mybids")
            }}
          >
            <RiAuctionLine className="mr-2 inline-block" />
            <p>My Bids</p>
          </div>
        )}
        {auth.user.role === "ADMIN" && (
          <div className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white">
            <CiUser className="mr-2 inline-block" />
            <p>Users</p>
          </div>
        )}
        {auth.user.role === "ADMIN" && (
          <div className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white">
            <FaRegFaceLaughWink size={20} className="mr-2 inline-block" />
            <p>Products</p>
          </div>
        )}
        {auth.user.role === "ADMIN" && (
          <div className="bg-white p-3 text-left hover:bg-purple-600 hover:text-white">
            Bids
          </div>
        )}
        {auth.user.role === "ADMIN" && (
          <div className="bg-white p-3 text-left hover:bg-purple-600 hover:text-white">
            Categories
          </div>
        )}
        <div className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white">
          <CiSettings size={20} className="mr-2 inline-block" />
          <p>Settings</p>
        </div>
        <div className="border-t bg-white p-3 text-center font-bold text-purple-600 hover:bg-purple-600 hover:text-white">
          Logout
        </div>
      </div>
    </>
  );
};

export default Sidebar;
