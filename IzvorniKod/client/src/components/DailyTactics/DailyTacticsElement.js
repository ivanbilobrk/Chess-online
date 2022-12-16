import React from 'react'
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { FiEdit3, FiX } from "react-icons/fi";
import UpdateDailyTactics from "./UpdateDailyTactics"
import WithMoveValidation from './Chess';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import axios from '../../api/axios';
import DialogActions from '@mui/material/DialogActions';
import '../home.css';
import UpdateDailyTacticsFormDialog from './UpdateDailyTactics';

const DailyTacticsElement = ({element, title, content, user}) => {
    let deleteButton = <></>;
    let editButton = <></>;
    const [moves, setMoves] = useState("");

    const handleClose = () => {
    };
    const handleSubmit = () => {
    };
    const handleRangList = () => {
    };
    const handleClickUpdateDailyTactics = async (title, content, showing, moves) =>{
      try {
          const response = await axios.post('/tactics/edit',  /* provjeri path */
              JSON.stringify({ 
                              tactic:{
                                  title: title,
                                  id: user.id,
                                  content: content,
                                  showing: showing,
                                  moves: moves
                                 /* dodaj vrijednosti */ 
                              }
                              }),
                              {
                                  headers: {'Content-Type':'application/json'},
                                  withCredentials: true
                              });
  
      } catch (err) {                                        
          console.error(err.response);
      
      }
  };

    if (user[5] == 'admin'  || (user[5] == 'trener' && user[0] == element.trainer)){
        deleteButton =  <IconButton 
                            aria-label="remove" 
                        >
                            <FiX 
                                onClick={()=>handleClickUpdateDailyTactics(title, content, 0, [])}
                            />
                        </IconButton>;
        editButton =    <IconButton 
                            aria-label="edit" 
        
                        >
                            <UpdateDailyTacticsFormDialog
                                handleClickUpdateDailyTactics={handleClickUpdateDailyTactics}
                                title = {element.title}
                                content={element.content}
                            />
                            
                        </IconButton>

    } 
    
  return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {element.title} 
            {deleteButton} 
           </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{display:'flex', justifyContent:'center'}}>
              <WithMoveValidation
               moves = {moves}
               setMoves = {setMoves}
               />
            </div>
            {editButton}
          </Typography>
          <DialogActions>
          <Button onClick={handleRangList}>Rang lista</Button>
          <Button onClick={handleClose}>Odustani</Button>
          <Button onClick={handleSubmit}>Potvrdi</Button>
        </DialogActions>
        </AccordionDetails>
      </Accordion>
    
  )
}

export default DailyTacticsElement
