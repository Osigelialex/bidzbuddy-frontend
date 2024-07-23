import { RiAuctionLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { FaRegFaceLaughWink } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { MdOutlineRateReview } from "react-icons/md";

const Sidebar = () => {
  const auth = useAuth();
  const [active, setActive] = useState("overview");

  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-md font-saira text-xl text-gray-500 md:col-span-3 mb-5">
        <div
          className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white"
          style={{
            backgroundColor: active === "overview" ? "rgb(147, 51, 234)" : "",
            color: active === "overview" ? "white" : "",
          }}
          onClick={() => {
            setActive("overview");
            navigate("/account/overview");
          }}
        >
          <RiAccountPinBoxLine size={20} className="mr-2 inline-block" />
          My Profile
        </div>
        {auth.user.role === "SELLER" && (
          <div
            className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white"
            style={{
              backgroundColor:
                active === "myproducts" ? "rgb(147, 51, 234)" : "",
              color: active === "myproducts" ? "white" : "",
            }}
            onClick={() => {
              setActive("myproducts");
              navigate("/account/my-products");
            }}
          >
            <FaRegFaceLaughWink className="mr-2 inline-block" />
            <p>My Products</p>
          </div>
        )}
        {auth.user.role === "BUYER" && (
          <div
            className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white"
            style={{
              backgroundColor: active === "mybids" ? "rgb(147, 51, 234)" : "",
              color: active === "mybids" ? "white" : "",
            }}
            onClick={() => {
              setActive("mybids");
              navigate("/account/my-bids");
            }}
          >
            <RiAuctionLine className="mr-2 inline-block" />
            <p>My Bids</p>
          </div>
        )}

        <div
          className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white"
          style={{
            backgroundColor: active === "reviews" ? "rgb(147, 51, 234)" : "",
            color: active === "reviews" ? "white" : "",
          }}
          onClick={() => {
            setActive("reviews");
            navigate("/account/reviews");
          }}
        >
          <MdOutlineRateReview size={20} className="mr-2 inline-block" />
          <p>Review us</p>
        </div>
        <div
          className="flex cursor-pointer items-center gap-2 bg-white p-3 text-left align-middle hover:bg-purple-600 hover:text-white"
          style={{
            backgroundColor: active === "settings" ? "rgb(147, 51, 234)" : "",
            color: active === "settings" ? "white" : "",
          }}
          onClick={() => {
            setActive("settings");
            navigate("/account/settings");
          }}
        >
          <CiSettings size={20} className="mr-2 inline-block" />
          <p>Settings</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
