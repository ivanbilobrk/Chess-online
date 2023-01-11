import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaPlus } from 'react-icons/fa';


const AddTraining = ({trainersId, date, duration, setTrainersId, setDate, setDuration, handleAddTraining, user}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (trainersId, date, duration) => {
    await handleAddTraining(user[0], date, duration);
    setOpen(false);
  };

  return (
    <div>
      <button className="addButton"  onClick={handleClickOpen}>
         <FaPlus/> 
      </button> 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add training fill required fields.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Date"
            type="content"
            fullWidth
            variant="standard"
            onChange={(e) => setDate(e.target.value)}
          />
            <TextField
            margin="dense"
            id="name"
            label="Duration"
            type="content"
            fullWidth
            variant="standard"
            onChange={(e) => setDuration(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=> handleSubmit(trainersId, date, duration)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;
