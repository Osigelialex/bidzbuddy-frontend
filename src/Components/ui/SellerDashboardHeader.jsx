import { RiAuctionFill } from "react-icons/ri";

const SellerDashboardHeader = () => {
  return (
    <div className="border-b px-6 py-3 flex justify-between">
      <div className="flex cursor-pointer gap-2 text-lg font-bold text-purple-500">
        <RiAuctionFill size={30} />
        <p className="text-lg font-bold">Bidz Buddy</p>
      </div>
    </div>
  );
}

export default SellerDashboardHeader;