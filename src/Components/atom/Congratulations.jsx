import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Congratulations({ username, productName, productImage }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Congratulations ${username}, you won the auction on the ${productName}!!`}
        </DialogTitle>
        <DialogContent>
          <div className='flex justify-between'>
            <img src="/congratulations.gif" loading="lazy" />
            <img src={productImage} className='w-56' loading='lazy' />
            <img src="/congratulations.gif" loading='lazy' />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "purple" }} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
