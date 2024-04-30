import SellerDashboardHeader from "./SellerDashboardHeader";
import { Outlet } from "react-router-dom";

const Seller = () => {
  return (
    <div>
      <SellerDashboardHeader />
      <Outlet />
    </div>
  );
}
 
export default Seller;