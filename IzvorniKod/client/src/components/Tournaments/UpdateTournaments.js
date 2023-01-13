import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FiEdit3 } from 'react-icons/fi';


const UpdateTournaments = ({trainersId, date, duration, showing, id, participantsno, setTrainersId, setDate, setDuration, handleUpdateTournament, user}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (trainersId, date, duration, showing, id, participants) => {
    await handleUpdateTournament(trainersId, date, duration, showing, id, participants);
    setOpen(false);
  };

  return (
    <div>
      Uredi turnir
      <button className="addButton"  onClick={handleClickOpen}>
         <FiEdit3> </FiEdit3>
      </button> 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update tournament</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit tournament fill required fields.
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
          <Button onClick={()=>handleSubmit(trainersId, date, duration, 1, id, participantsno)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateTournaments;
