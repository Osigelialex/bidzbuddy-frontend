import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiMoneyLight } from "react-icons/pi";
import { TbCategory2 } from "react-icons/tb";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { BidChart } from "./BidChart";
import { UserChart } from "./userChart";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [bids, setBids] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dashboardResponse = await axios.get("/api/v1/dashboard");
      const bidsResponse = await axios.get("/api/v1/bids/all");
      const userResponse =  await axios.get("/api/v1/users");

      setDashboardData(dashboardResponse.data);
      setBids(bidsResponse.data);
      setUsers(userResponse.data);
      console.log(users);
    };
    fetchData();
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center align-middle">
        <h1 className="font-semibold">Welcome to BidzBuddy Admin</h1>
        <div className="text-md flex items-center align-middle gap-3 text-gray-500">
          <CalendarMonthIcon />
          <p>{new Date().toJSON().slice(0, 10)}</p>
        </div>
      </div>

      <div className="my-8 grid gap-3 sm:grid-cols-4">
        <div className="grid place-items-center rounded-lg bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-center gap-3 align-middle">
            <PiUsersThree size={20} className="text-blue-500" />
            <h2 className="text-lg">Total Users</h2>
          </div>
          <p className="text-2xl font-semibold">{dashboardData.totalUsers}</p>
        </div>
        <div className="grid place-items-center rounded-lg bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-center gap-3 align-middle">
            <MdOutlineShoppingCart size={20} className="text-purple-500" />
            <h2 className="text-lg">Total Products</h2>
          </div>
          <p className="text-2xl font-semibold">
            {dashboardData.totalProducts}
          </p>
        </div>
        <div className="grid place-items-center rounded-lg bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-center gap-3 align-middle">
            <PiMoneyLight size={20} className="text-green-500" />
            <h2 className="text-lg">Total Bids</h2>
          </div>
          <p className="text-2xl font-semibold">
            ₦ {dashboardData.totalBidAmount}
          </p>
        </div>
        <div className="grid place-items-center rounded-lg bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-center gap-3 align-middle">
            <TbCategory2 size={20} className="text-red-500" />
            <h2 className="text-lg">Total Categories</h2>
          </div>
          <p className="text-2xl font-semibold">
            {dashboardData.totalCategories}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12">
        <BidChart chartData={bids} />
        <UserChart chartData={users} />
      </div>
    </div>
  );
};

export default Dashboard;
