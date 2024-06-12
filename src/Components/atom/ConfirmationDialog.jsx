import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import axios from "../../config/axiosConfig";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog({ data }) {
  const [isCloseBiddingPromptOpen, setIsCloseBiddingPromptOpen] =
    useState(false);
  const [isDeleteProductPromptOpen, setIsDeleteProductPromptOpen] =
    useState(false);

  // Open Close Bidding Prompt
  const handleOpenCloseBiddingPrompt = () => {
    setIsCloseBiddingPromptOpen(true);
  };

  const handleCloseCloseBiddingPrompt = () => {
    setIsCloseBiddingPromptOpen(false);
  };

  const handleOpenDeleteProductPrompt = () => {
    setIsDeleteProductPromptOpen(true);
  };

  const handleCloseDeleteProductPrompt = () => {
    setIsDeleteProductPromptOpen(false);
  };

  const closeBidding = async () => {
    try {
      await axios.patch(`api/v1/products/close/${data.id}`);
      handleCloseCloseBiddingPrompt();
      setIsConfirmationAlertOpen(true);
    } catch (error) {
      handleCloseCloseBiddingPrompt();
      setHasError(true);
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`api/v1/products/${data.id}`);
      handleCloseDeleteProductPrompt();
    } catch (error) {
      handleCloseDeleteProductPrompt();
    }
  };

  return (
    <React.Fragment>
      {/* Actions */}
      <div className="flex items-center gap-3 align-middle">
        {data.biddingClosed === false && (
          <div className="bg-red-200 p-1">
            <HiOutlineLockClosed
              size={20}
              onClick={handleOpenCloseBiddingPrompt}
              className="cursor-pointer text-red-400"
            />
          </div>
        )}
        <div className="bg-red-200 p-1">
          <MdDelete
            size={20}
            onClick={handleOpenDeleteProductPrompt}
            className="cursor-pointer text-red-400"
          />
        </div>
      </div>

      {/* Close Bidding Prompt */}
      {isCloseBiddingPromptOpen ? (
        <Dialog
          open={isCloseBiddingPromptOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseCloseBiddingPrompt}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {`Are you sure you want to close bidding for "${data.name}" ?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {`By clicking continue, you will end the auctioning process for the
              ${data.name} and buyers would not be able to bid it anymore.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCloseBiddingPrompt}>Close</Button>
            <Button style={{ color: "red" }} onClick={closeBidding}>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={isDeleteProductPromptOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDeleteProductPrompt}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {`Are you sure you want to delete "${data.name}"?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {`By clicking continue, you will delete the product "${data.name}" from the database.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteProductPrompt}>Close</Button>
            <Button style={{ color: "red" }} onClick={deleteProduct}>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}
