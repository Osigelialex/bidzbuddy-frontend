import { RiAuctionFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { RiAuctionLine } from "react-icons/ri";

const AdminSidebar = () => {
  return (
    <div className="h-screen fixed top-0 left-0 w-48 col-span-2 hidden flex-col justify-between shadow-sm px-3 sm:flex">
      <ul className="mt-3 flex flex-col gap-4 text-gray-500">
        <li className="mx-auto flex items-center align-middle w-full cursor-pointer gap-2 rounded-md border border-purple-500 bg-purple-200 p-3 text-lg font-bold text-purple-500">
          <RiAuctionFill size={20} />
          <p className="text-lg font-extrabold text-purple-950">Bidzbuddy</p>
        </li>
        <Link to="/admin/dashboard">
          <li className="text-md flex cursor-pointer text-sm items-center gap-2 rounded-sm px-1 py-3 align-middle font-medium hover:bg-purple-300 hover:text-purple-800">
            <LuLayoutDashboard size={15} />
            <p>Dashboard</p>
          </li>
        </Link>
        <Link to="/admin/products">
          <li className="text-md flex cursor-pointer text-sm items-center gap-2 px-1 py-3 align-middle font-medium hover:bg-purple-300 hover:text-purple-800">
            <ProductionQuantityLimitsIcon size={15} />
            <p>Products</p>
          </li>
        </Link>
        <Link to="/admin/users">
          <li className="text-md flex cursor-pointer text-sm items-center gap-2 px-1 py-3 align-middle font-medium hover:bg-purple-300 hover:text-purple-800">
            <FaRegUser size={15} />
            <p>Users</p>
          </li>
        </Link>
        <Link to="">
          <li className="text-md flex cursor-pointer text-sm items-center gap-2 px-1 py-3 align-middle font-medium hover:bg-purple-300 hover:text-purple-800">
            <RiAuctionLine size={15} />
            <p>Bids</p>
          </li>
        </Link>
        <Link to="">
          <li className="text-md flex cursor-pointer text-sm items-center gap-2 px-1 py-3 align-middle font-medium hover:bg-purple-300 hover:text-purple-800">
            <BiCategoryAlt size={15} />
            <p>Categories</p>
          </li>
        </Link>
      </ul>
      <li className="text-md mb-3 flex text-sm cursor-pointer items-center gap-2 border-t px-1 py-1 align-middle font-medium">
        <CiLogout size={15} />
        <Link to="/">Back to Site</Link>
      </li>
    </div>
  );
};

export default AdminSidebar;
