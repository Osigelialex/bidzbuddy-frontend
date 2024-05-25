import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "../../config/axiosConfig";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { CiLock } from "react-icons/ci";
import ProductDetailCard from "../atom/ProductDetailCard";
import { formatCurrency } from "../../utils/formatCurrency";

const ProductInfo = ({
  id,
  name,
  image,
  description,
  currentBid,
  remainingTime,
  closed,
}) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user) {
      setMessage({ type: "error", text: "Please login to place bid" });
      setOpen(true);
      return;
    }

    try {
      await axios.post(`/api/v1/bids/place/${id}`, { bidAmount: amount });
      setMessage({ type: "success", text: "Bid Placed Successfully" });
      setOpen(true);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error placing bid, please try again",
      });
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="mb-10 mt-28 flex flex-wrap justify-center gap-20 p-3 text-gray-950 sm:mx-24 sm:mb-32 sm:flex-nowrap sm:gap-8">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={5000}
        action={action}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={message.type} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>

      <ProductDetailCard
        image={image}
        title={name}
        remainingTime={remainingTime}
      />

      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-md mt-2 leading-7">{description}</p>
        <p className="mt-7 sm:text-xl">
          Current Bidding Price:{" "}
          <span className="text-xl font-medium">₦ {formatCurrency(currentBid)}</span>
        </p>

        <div className="mt-7 w-full rounded-md border p-5">
          {closed ? (
            <div className="flex gap-2 items-center align-middle">
              <CiLock size={50} />
              <p className="text-red-500">Auction Closed for this product</p>
            </div>
          ) : (
            <>
              {/* Not logged in */}
              {!auth.user && (
                <div className="flex gap-2 items-center align-middle">
                  <CiLock size={50} />
                  <p className="text-red-500">
                    Please login to place a bid on this product
                  </p>
                </div>
              )}
              
              {/* Logged in as seller */}
              {auth.user && auth.user.role === "SELLER" && (
                <div className="flex gap-2 items-center align-middle">
                  <CiLock size={50} />
                  <p className="text-red-500">
                    Looks like you're signed in as a seller. Bidding is for
                    buyers only, but you can check out your own listings!
                  </p>
                </div>
              )}

              {/* Logged in as Admin */}
              {auth.user && auth.user.role === "ADMIN" && (
                <div className="flex gap-2 items-center align-middle">
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
                      step={1000}
                      placeholder="Enter amount"
                      className="my-2 w-full border p-3 outline-none"
                      style={{
                        border:
                          message.type === "success"
                            ? "1px solid green"
                            : message.type === "error"
                              ? "1px solid red"
                              : "",
                      }}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                    <button className="w-40 rounded-md bg-purple-600 p-3 text-white">
                      Place Bid
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
