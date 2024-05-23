import { RiAuctionFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { CiUser } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { RiAuctionLine } from "react-icons/ri";

const AdminSidebar = () => {
  return (
    <div className="relative col-span-2 hidden flex-col justify-between border-r px-3 sm:flex">
      <ul className="mt-3 flex flex-col gap-4 text-gray-500">
        <li className="mx-auto flex items-center align-middle w-full cursor-pointer gap-2 rounded-md border border-purple-500 bg-purple-200 p-3 text-lg font-bold text-purple-500">
          <RiAuctionFill size={20} />
          <p className="text-lg font-extrabold text-purple-950">Bidzbuddy</p>
        </li>
        <Link to="/admin/dashboard">
          <li className="text-md flex cursor-pointer items-center gap-2 rounded-sm px-1 py-3 align-middle font-medium hover:bg-purple-300 hover:text-purple-800">
            <LuLayoutDashboard size={18} />
            <p>Dashboard</p>
          </li>
        </Link>
        <Link to="/admin/products">
          <li className="text-md flex cursor-pointer items-center gap-2 px-1 py-3 align-middle font-medium hover:bg-purple-300 hover:text-purple-800">
            <ProductionQuantityLimitsIcon />
            <p>Products</p>
          </li>
        </Link>
        <Link to="">
          <li className="text-md flex cursor-pointer items-center gap-2 px-1 py-3 align-middle font-medium hover:bg-purple-300 hover:text-purple-800">
            <CiUser size={18} />
            <p>Users</p>
          </li>
        </Link>
        <Link to="">
          <li className="text-md flex cursor-pointer items-center gap-2 px-1 py-3 align-middle font-medium hover:bg-purple-300 hover:text-purple-800">
            <RiAuctionLine />
            <p>Bids</p>
          </li>
        </Link>
        <Link to="">
          <li className="text-md flex cursor-pointer items-center gap-2 px-1 py-3 align-middle font-medium hover:bg-purple-300 hover:text-purple-800">
            <BiCategoryAlt size={18} />
            <p>Categories</p>
          </li>
        </Link>
      </ul>
      <li className="text-md mb-3 flex cursor-pointer items-center gap-2 border-t-2 px-1 py-1 align-middle font-medium">
        <CiLogout size={18} />
        <Link to="/">Back to Site</Link>
      </li>
    </div>
  );
};

export default AdminSidebar;
