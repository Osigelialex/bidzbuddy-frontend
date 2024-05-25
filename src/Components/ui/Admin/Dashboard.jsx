import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiMoneyLight } from "react-icons/pi";
import { TbCategory2 } from "react-icons/tb";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { BidChart } from "./BidChart";
import { UserChart } from "./userChart";
import RecentBids from "./RecentBids";
import { formatCurrency } from "../../../utils/formatCurrency";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [bids, setBids] = useState([]);
  const [recentBids, setRecentBids] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dashboardResponse = await axios.get("/api/v1/dashboard");
      const bidsResponse = await axios.get("/api/v1/bids/all");
      const userResponse = await axios.get("/api/v1/users");
      const recentBidsResponse = await axios.get("/api/v1/bids/recent");

      setDashboardData(dashboardResponse.data);
      setBids(bidsResponse.data);
      setUsers(userResponse.data);
      setRecentBids(recentBidsResponse.data)
    };
    fetchData();
  }, []);

  return (
    <div className="pb-10">
      <div className="flex items-center justify-between bg-white p-5 mx-1 align-middle">
        <h1 className="font-bold text-lg">BidzBuddy Admin</h1>
        <div className="text-md flex items-center gap-3 align-middle text-gray-500">
          <CalendarMonthIcon />
          <p>{new Date().toJSON().slice(0, 10)}</p>
        </div>
      </div>

      <div className="p-3">
        <div className="my-8 grid gap-3 sm:grid-cols-4">
          <div className="grid place-items-center rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-center gap-3 align-middle">
              <PiUsersThree size={20} className="text-blue-500" />
              <h2>Total Users</h2>
            </div>
            <p className="text-lg font-semibold">{dashboardData.totalUsers}</p>
          </div>
          <div className="grid place-items-center rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-center gap-3 align-middle">
              <MdOutlineShoppingCart size={20} className="text-purple-500" />
              <h2>Total Products</h2>
            </div>
            <p className="text-lg font-semibold">
              {dashboardData.totalProducts}
            </p>
          </div>
          <div className="grid place-items-center rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-center gap-3 align-middle">
              <PiMoneyLight size={20} className="text-green-500" />
              <h2>Total Amount Bid</h2>
            </div>
            <p className="font-semibold">
              ₦ {formatCurrency(dashboardData.totalBidAmount)}
            </p>
          </div>
          <div className="grid place-items-center rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-center gap-3 align-middle">
              <TbCategory2 size={20} className="text-red-500" />
              <h2>Total Categories</h2>
            </div>
            <p className="font-semibold">
              {dashboardData.totalCategories}
            </p>
          </div>
          <div className="grid place-items-center rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-center gap-3 align-middle">
              <PiMoneyLight size={20} className="text-green-500" />
              <h2>Average Bid Amount</h2>
            </div>
            <p className="font-semibold">
              ₦ {formatCurrency(dashboardData.averageBidAmount)}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-12">
          <BidChart chartData={bids} />
          <UserChart chartData={users} />
          <RecentBids recentBids={recentBids} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
