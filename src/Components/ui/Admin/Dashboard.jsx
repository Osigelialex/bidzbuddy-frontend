import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfig";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiMoneyLight } from "react-icons/pi";
import { TbCategory2 } from "react-icons/tb";
import { BidChart } from "./BidChart";
import { UserChart } from "./userChart";
import { VerticalBarChart } from "./ItemsBidChart";
import { toast } from "sonner";
import { formatCurrency } from "../../../utils/formatCurrency";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [bids, setBids] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardResponse, bidsResponse, userResponse] =
          await Promise.all([
            axios.get("/api/v1/dashboard"),
            axios.get("/api/v1/bids/all"),
            axios.get("/api/v1/users"),
          ]);

        setDashboardData(dashboardResponse.data);
        setBids(bidsResponse.data);
        setUsers(userResponse.data);
      } catch (error) {
        toast.error("An error occurred while fetching data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pb-10 font-poppins">
      <div className="mx-1 flex flex-col bg-white p-3 align-middle">
        <h1 className="font-semibold">BidzBuddy Admin</h1>
        <div className="flex items-center gap-3 align-middle text-gray-500 text-xs">
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
            <p className="font-semibold">{dashboardData.totalCategories}</p>
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

        <div>
          <div className="grid gap-3 sm:grid-cols-12">
            <BidChart chartData={bids} />
            <UserChart chartData={users} />
          </div>
          <VerticalBarChart chartData={bids} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
