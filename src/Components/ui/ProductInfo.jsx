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
    <div className="mb-20 mt-28 grid gap-5 px-5 align-middle md:grid-cols-2 md:gap-1">
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

      <div className="max-h-48 grid place-items-center">
        <div className="bg-gray-800 min-h-14 text-white w-3/4 grid place-items-center">
          <RemainingTime milliseconds={remainingTime} size={30} />
        </div>
        <img src={image} className="w-3/4 h-96 object-fit" />
      </div>

      <div>
        <h1 className="text-2xl font-extrabold sm:text-4xl">{name}</h1>
        <p className="text-md my-5 leading-7 text-gray-600">{description}</p>
        <p className="font-medium sm:text-3xl">
          Current Bid: <span className="font-extrabold">₦ {currentBid}</span>
        </p>

        <div className="mt-7 w-full rounded-md border p-5 shadow-md">
          {closed ? (
            <div className="flex gap-2">
              <CiLock size={30} />
              <p className="text-red-500">Bidding is closed for this product</p>
            </div>
          ) : (
            <>
              <h1 className="text-lg font-bold">Place your bid</h1>
              <p className="text-md text-gray-600">
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
                <button className="w-28 rounded-md bg-purple-600 p-3 text-white">
                  Bid
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
