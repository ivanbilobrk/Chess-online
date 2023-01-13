import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaPlus } from 'react-icons/fa';


const AddTournaments = ({date, duration, setDate, setDuration, handleAddTournaments, user}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (date, duration) => {
    await handleAddTournaments(user[0], date, duration);
    setOpen(false);
  };

  return (
    <div>
      <button className="addButton"  onClick={handleClickOpen}>
         <FaPlus/> 
      </button> 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add tournament</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add tournament fill required fields.
            Please use format dd/mm/yyyy hh:mm for date and time field
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Date and time"
            type="content"
            fullWidth
            variant="standard"
            onChange={(e) => setDate(e.target.value)}
          />
            <TextField
            margin="dense"
            id="name"
            label="Duration(minutes)"
            type="content"
            fullWidth
            variant="standard"
            onChange={(e) => setDuration(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=> handleSubmit(date, duration)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTournaments;