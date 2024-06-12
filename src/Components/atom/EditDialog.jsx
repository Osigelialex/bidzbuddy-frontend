import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "../../config/axiosConfig"
import { toast } from "sonner";

export default function EditCategoryDialog({ onClose, callback, previous, id }) {
  const [open, setOpen] = React.useState(true);
  const [newValue, setNewValue] = React.useState(previous);

  const editCategory = async () => {
    try {
      await axios.patch(`/api/v1/categories/${id}`, { name: newValue });
      toast.success("Category name changed successfully");
      callback();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.mesage);
      } else if (error.request) {
        toast.error("Network error. Please try again");
      } else {
        toast.error("An error occurred. Please try again");
      }
    }
  }

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            editCategory();
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Category Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the name of the selected category, this action would rename the category across the site
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="category"
            label="Category name"
            name="category"
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}