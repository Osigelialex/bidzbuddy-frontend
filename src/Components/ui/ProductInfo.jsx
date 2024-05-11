import RemainingTime from "../atom/RemainingTime";
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user) {
      setOpen(true);
      return;
    }

    try {
      await axios.post(`/api/v1/bids/place/${id}`, { bidAmount: amount });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setError(true);
      setTimeout(() => setError(false), 5000);
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
        <Alert onClose={handleClose} severity="error" variant="filled">
          Please login to place bid
        </Alert>
      </Snackbar>

      <ProductDetailCard image={image} title={name} remainingTime={remainingTime} />

      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-md mt-2 leading-7">{description}</p>
        <p className="mt-7 sm:text-xl">
          Bidding Price:{" "}
          <span className="text-2xl font-medium">₦ {currentBid}</span>
        </p>

        <div className="mt-7 w-full rounded-md border p-5">
          {closed ? (
            <div className="flex gap-2">
              <CiLock size={30} />
              <p className="text-red-500">Bidding is closed for this product</p>
            </div>
          ) : (
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
                    success: success ? "border: 1px solid green" : "",
                    error: error ? "border: 1px solid red" : "",
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

          {success && <p className="text-green-500">Bid Placed Successfully</p>}
          {error && (
            <p className="text-red-500">Error placing bid, please try again</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
