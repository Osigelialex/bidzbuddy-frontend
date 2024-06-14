import { GoVerified } from "react-icons/go";
import { Link } from "react-router-dom";

const OrderConfirmed = () => {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="flex flex-col gap-4 text-center">
        <div className="p-3 bg-green-500 mx-auto text-white rounded-full">
          <GoVerified size={70} />
        </div>
        <h1 className="text-3xl font-bold">Payment Confirmed!</h1>
        <h3 className="text-lg font-bold">Your order has been completed successfully</h3>
        <div className="flex gap-3 items-center align-middle text-center">
          <p className="text-center w-2/3 mx-auto">A detailed receipt of your order has been sent to your email. Please keep this receipt for your records. Thank you for your purchase!</p>
        </div>
        <Link to="/orders">
          <p className="text-blue-500 underline">View Orders &rarr;</p>
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmed;