import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaPlus } from 'react-icons/fa';
import '../home.css';
import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import WithMoveValidation from './Chess';


const AddDailyTacticsFormDialog = ({loadAllTactics, title, content, setTitle, setContent, user}) => {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [moves, setMoves] = useState([]);
  const [start, setStart] = useState("start");
  const [set, setSet] = useState(true);

  const handleClickOpen = () => {
    setMoves([start])
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (title, content, moves) => {
    console.log('moves to add')
    console.log(moves)
    await handleClickAddDailyTactics(title, content, moves);
    setOpen(false);
  };
  const handleClickAddDailyTactics = async (title, content, moves) => {
    try {
        const response = await axiosPrivate.post('/tactic/private/add',  
            JSON.stringify({ 
                            tactic:{
                                title: title,
                                content: content,
                                moves: moves 
                            }
                            }),
                            {
                                headers: {'Content-Type':'application/json'},
                                withCredentials: true
                            });
    } catch (err) {                                        
        console.error(err.response);
    
    
    }
    loadAllTactics();
};
const handleStart = () => {
  if (moves.length != 0){
    setMoves(moves.slice(-1));
  } else {
    setMoves([start])
  }
  console.log('after zapo??ni')
  console.log(moves)

    
};

  return (
    <div>
        { user != 'user' ?
      <button className="addButton"  onClick={handleClickOpen}>
         <FaPlus/> 
      </button>
      : null }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj novu dnevnu taktiku</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Za dodavanje nove taktike popuni tra??ena polja.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="title"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Content"
            type="content"
            fullWidth
            variant="standard"
            onChange={(e) => setContent(e.target.value)}
          />
          
          <div style={{display:'flex', justifyContent:'center'}}>
            <WithMoveValidation
             flag = {false}
             set = {set}
             setSet={setSet}
             moves={moves}
             start={start}
             setMoves={setMoves}
            />
           
          </div>
          <Button onClick={handleStart}>Zapo??ni</Button>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odustani</Button>
          <Button onClick={()=>handleSubmit(title, content, moves)}>Potvrdi</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddDailyTacticsFormDialog;
