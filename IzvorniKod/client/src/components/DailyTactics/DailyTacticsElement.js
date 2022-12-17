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
import axios from '../../hooks/useAxiosPrivate';
import DialogActions from '@mui/material/DialogActions';
import '../home.css';
import UpdateDailyTacticsFormDialog from './UpdateDailyTactics';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const DailyTacticsElement = ({element, title, content, user}) => {
    const axiosPrivate = useAxiosPrivate();
    let deleteButton = <></>;
    let editButton = <></>;
    const [moves, setMoves] = useState([]);
    const [start, setStart] = useState(element.moves[1].fen);

    const handleClose = () => {
    };
    const handleSubmit = () => {
    };
    const handleRangList = () => {
      console.log(element)
    };
    const handleClickEditDailyTactics = async (title, content, showing, moves, id) =>{
      try {
         await axiosPrivate.post('/tactic/private/edit',  /* provjeri path */
              JSON.stringify({ 
                              tactic:{
                                  title: title,
                                  id: id,
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

    if (user[5] == 'admin'  || (user[5] == 'trener' && user[0] == element.trainer_id)){
        deleteButton =  <IconButton 
                            aria-label="remove" 
                        >
                            <FiX 
                                onClick={()=>handleClickEditDailyTactics(element.title, element.content, 0, element.moves, element.id)}
                            />
                        </IconButton>;
        editButton =    <IconButton 
                            aria-label="edit" 
        
                        >
                            <UpdateDailyTacticsFormDialog
                                handleClickUpdateDailyTactics={handleClickEditDailyTactics}
                                start = {start}
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
            {element.content} 
           </Typography>


          <Typography>
            <div style={{display:'flex', justifyContent:'center'}}>
              <WithMoveValidation
               moves = {moves}
               start = {start}
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
