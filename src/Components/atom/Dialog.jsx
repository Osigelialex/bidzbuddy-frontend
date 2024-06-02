import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogBox({ title, message, callback, onClose }) {

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose()
  };

  const handleAccept = () => {
    setOpen(false);
    callback()
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleAccept} style={{ color: "red" }} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
