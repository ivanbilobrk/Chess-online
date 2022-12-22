import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from '../../api/axios';
import { TextField } from '@mui/material';

export default function DialogSelect({trainers, id}) {
 const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [trener, setTrener] = useState('');
  const [mistake, setMistake] = useState('');

  const handleChange = (event) => {
    setTrener(event.target.value || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const handleClickAddMistake = async (trainerId, tacticId, description) =>{
    try {
       await axiosPrivate.post('/mistakes/add',  
            JSON.stringify({ 
                            mistake:{
                                trainer: trainerId,
                                tactic: tacticId,
                                description: description
                            }
                            }),
                            {
                                headers: {'Content-Type':'application/json'},
                                withCredentials: true
                            });
    } catch (err) {                                        
        console.error(err.response);
    
    }
    handleClose();

};
  


 
  

  return (
    <div>
      <Button onClick={handleClickOpen}>Prijavi pogrešku</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Odaberi trenera i unesi opesi pogreške</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">trener</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={trener}
                onChange={handleChange}
                input={<OutlinedInput label="Trener" />}
              >
                {trainers.map(trainer => ( 
                    <MenuItem value={trainer.id}>{trainer.id} {trainer.name} {trainer.surname}</MenuItem>
                ))}

              </Select>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                onChange={e => {setMistake(e.target.value)}}
                label="Opis pogreške"
                />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odustani</Button>
          <Button onClick={()=>handleClickAddMistake(trener, id, mistake)}>Pošalji</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
