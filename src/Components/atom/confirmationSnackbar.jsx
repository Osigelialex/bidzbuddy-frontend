import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import Alert from "@mui/material/Alert";

const ConfirmationSnackbar = ({ message, severity }) => {
  const [state, setState] = useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "middle" }}
      open={open}
      onClose={handleClose}
      message={message}
      severity={severity}
      key={vertical + horizontal}
      autoHideDuration={2000}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{
          backgroundColor: "purple",
          color: "white",
          marginTop: "10",
          border: "1px solid green",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ConfirmationSnackbar;
