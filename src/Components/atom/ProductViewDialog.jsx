import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductViewDialog({
  name,
  productImageUrl,
  description,
  category,
  minimumBid,
  condition,
  onClose,
}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="grid font-saira sm:grid-cols-12">
          <div className="col-span-6">
            <img
              src={productImageUrl}
              alt={name}
              className="h-96 w-full object-fill"
            />
          </div>
          <div className="col-span-6 flex flex-col justify-between p-2 font-saira">
            <div>
              <h1
                id="alert-dialog-title"
                className="text-2xl font-bold sm:text-3xl"
              >
                {name}
              </h1>
              <hr className="bg-gray-300" />
              <p id="alert-dialog-description" className="my-5 text-gray-700">
                {description}
              </p>
            </div>
            <div>
              <p id="alert-dialog-description" className="">
                Category: {category}
              </p>
              <p id="alert-dialog-description">
                Minimum Bid: {` ₦${formatCurrency(minimumBid)}`}
              </p>
              <p id="alert-dialog-description">
                Condition: {condition}
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-purple-500 p-3 text-white mt-5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
