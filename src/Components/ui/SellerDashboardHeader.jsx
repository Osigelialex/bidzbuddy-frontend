import { RiAuctionFill } from "react-icons/ri";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SellerDashboardHeader = () => {
  return (
    <div className="border-b px-10 py-3 flex items-center align-middle justify-between">
      <div className="flex cursor-pointer gap-2 text-lg font-bold text-purple-500">
        <RiAuctionFill size={30} />
        <p className="text-lg font-bold text-purple-950">Bidzbuddy</p>
      </div>

      <div className="flex items-center align-middle gap-4">
        <p>osigelialex@gmail.com</p>
        <AccountCircleIcon size={20} />
      </div>
    </div>
  );
}

export default SellerDashboardHeader;