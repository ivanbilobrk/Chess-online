import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaPlus } from 'react-icons/fa';
import '../home.css';
import { FiEdit3, FiX } from 'react-icons/fi';
import WithMoveValidation from './Chess';
import { useState } from 'react';

const UpdateDailyTacticsFormDialog = ({handleClickUpdateDailyTactics, title, content, start}) => {
  const [moves, setMoves] = useState([start]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (title,content) => {
    setOpen(false);
  };
  const handleReset = () => {
    
    
  };
  

  return (
    <div>
      <button className="addButton"  onClick={handleClickOpen}>
        <FiEdit3/>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uređivanje taktike</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Za uređivanje taktike unesi novo rješenje.
          </DialogContentText>
          <Button onClick={handleReset}>Resetiraj</Button>
          <div style={{display:'flex', justifyContent:'center'}}>
            <WithMoveValidation start={start} moves = {moves} setMoves = {setMoves}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odustani</Button>
          <Button onClick={()=>handleSubmit(title,content)}>Potvrdi</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateDailyTacticsFormDialog;
