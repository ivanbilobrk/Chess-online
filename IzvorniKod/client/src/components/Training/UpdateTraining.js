import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FiEdit3 } from 'react-icons/fi';


const UpdateTraining = ({trainersId, date, duration, showing, id, setTrainersId, setDate, setDuration, handleUpdateTraining, user}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (trainersId, date, duration, showing, id) => {
    await handleUpdateTraining(duration, date, showing, id, trainersId);
    setOpen(false);
  };

  return (
    <div>
        { user != 'user' ?
      <button className="addButton"  onClick={handleClickOpen}>
         <FiEdit3> </FiEdit3>
      </button> 
      : null}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit training fill required fields.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="TrainerId"
            type="title"
            fullWidth
            variant="standard"
            onChange={(e) => setTrainersId(e.target.value)}
          />
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
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateTraining;
