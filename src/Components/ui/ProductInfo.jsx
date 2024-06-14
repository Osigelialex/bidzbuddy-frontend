import axios from "../../config/axiosConfig";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { CiLock } from "react-icons/ci";
import ProductDetailCard from "../atom/ProductDetailCard";
import { formatCurrency } from "../../utils/formatCurrency";
import { GiPartyPopper } from "react-icons/gi";
import PaystackPayment from "../atom/PaystackPayment";
import { toast } from "sonner";

const ProductInfo = ({
  id,
  name,
  image,
  description,
  currentBid,
  remainingTime,
  closed,
  handleRefresh,
  winner,
  paid
}) => {
  const [amount, setAmount] = useState("");

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user) {
      toast("Please login to place a bid on this product", { type: "error" });
      return;
    }

    try {
      await axios.post(`/api/v1/bids/place/${id}`, { bidAmount: amount });
      toast.success("Bid placed successfully");
      handleRefresh();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network error, try again");
      } else {
        toast.error("An error occurred, try again");
      }
    }

    setAmount("");
  };

  return (
    <div className="mb-10 mt-28 flex flex-wrap justify-center gap-20 p-3 text-gray-950 sm:mx-20 sm:mb-32 sm:flex-nowrap sm:gap-8">
      <ProductDetailCard
        image={image}
        title={name}
        remainingTime={remainingTime}
      />

      <div>
        <h1 className="text-4xl font-bold">{name}</h1>
        <p className="text-md mt-2 leading-7">{description}</p>
        <p className="mt-7 sm:text-xl">
          Current Bidding Price:{" "}
          <span className="text-xl font-medium">
            ₦ {formatCurrency(currentBid)}
          </span>
        </p>

        <div className="mt-7 w-full rounded-md border p-5">
          {closed && !winner ? (
            <div className="flex items-center gap-2 align-middle">
              <CiLock size={50} />
              <p className="text-red-500">Auction Closed for this product</p>
            </div>
          ) : (winner && !paid) ? (
            <div className="flex items-center gap-5 align-middle">
              <GiPartyPopper size={80} />
              <p className="text-green-500">
                {`Congratulations on winning the auction for the ${name}! Click the button below to proceed to checkout and make payment.`}
              </p>
            </div>
          ) : (winner && paid) ? (
            <div className="flex items-center gap-2 align-middle">
              <GiPartyPopper size={50} />
              <p className="text-green-500">
                Payment successful! You can now pick up your product
              </p>
            </div>
          ) : (
            <>
              {/* Not logged in */}
              {!auth.user && (
                <div className="flex items-center gap-2 align-middle">
                  <CiLock size={50} />
                  <p className="text-red-500">
                    Please login to place a bid on this product
                  </p>
                </div>
              )}

              {/* Logged in as seller */}
              {auth.user && auth.user.role === "SELLER" && (
                <div className="flex items-center gap-2 align-middle">
                  <CiLock size={50} />
                  <p className="text-red-500">
                    Looks like you're signed in as a seller. Bidding is for
                    buyers only, but you can check out your own listings!
                  </p>
                </div>
              )}

              {/* Logged in as Admin */}
              {auth.user && auth.user.role === "ADMIN" && (
                <div className="flex items-center gap-2 align-middle">
                  <CiLock size={50} />
                  <p className="text-red-500">
                    Looks like you're signed in as an admin. Bidding is for
                    buyers only
                  </p>
                </div>
              )}

              {/* Logged in as Buyer */}
              {auth.user && auth.user.role === "BUYER" && (
                <>
                  <h1 className="text-lg font-bold">Place your bid</h1>
                  <p className="sm:text-md text-sm text-gray-600">
                    Bid Amount must be greater than current Bid by a 1000
                  </p>
                  <form
                    className="mx-auto flex items-center gap-2 align-middle"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <input
                      type="number"
                      min={currentBid + 1000 || 1000}
                      value={amount}
                      step={1000}
                      placeholder="Enter amount"
                      className="my-2 w-full border p-3 outline-none"
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                    <button
                      className={`w-40 rounded-md bg-purple-600 p-3 text-white`}
                    >
                      Place Bid
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
        {/* proceed to payment */}
        {(winner && !paid) && (
          <>
            <PaystackPayment
              amount={currentBid * 100}
              email={'osigelialex@gmail.com'}
              publicKey={"pk_test_42726b31137327bf7e1b529ca436aa9857794be7"}
              productId={id}
              handleRefresh={handleRefresh}
            />
            <div className="flex gap-2 items-center align-middle mt-3">
              <img src="/visa-card.svg" />
              <img src="/mastercard.svg" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
