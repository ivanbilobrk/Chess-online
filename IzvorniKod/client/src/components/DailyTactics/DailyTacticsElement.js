import React, { useEffect } from 'react'
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
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CustomizedDialogs from './Dialog';


const DailyTacticsElement = ({loadAllTactics, element, title, content, user}) => {
    const axiosPrivate = useAxiosPrivate();
    let deleteButton = <></>;
    let editButton = <></>;
    const [moves, setMoves] = useState([]);
    const [start, setStart] = useState(element.moves[0].fen);
    const [time, setTime] = useState();
    const [tactic, setTactic] = useState([]);
    const [set, setSet] = useState(false);
    
    const handleClose = () => {
      document.location.reload();
    };
    const handleStart = async () => {
      setSet(true);
      setTime(Date.now())
      setMoves([])
      try {
        const response = await axios.get('/tactics', 
                            {
                                headers: {'Content-Type':'application/json'}
                                
                            });
        
        setTactic(response.data.tactics);
    } catch (err) {                                        
        console.error(err.response);
        
    }

    }
   
    const handleSubmit = async (userId, tacticId, time) => {
      console.log("moves: "+ moves)
      
      tactic[element.id].moves = tactic[element.id].moves.slice(1)
      for (let j = 0; j < tactic[element.id].moves.length; j++){
        console.log("tactic.moves:"+ tactic[element.id].moves[j].fen)
      }
      if (moves.length != tactic[element.id].moves.length) {
         document.location.reload();   //trenutno ne znam kako bi bolje resetirao plocu nego reload cijele stranice
         return;
      }

      for (let i = 0; i < moves.length; i++){
        console.log("move : [" + i +"]" +moves[i])
        console.log("tactic: [" + i +"]"+tactic[element.id].moves[i].fen)
        if (moves[i] != tactic[element.id].moves[i].fen){ 
           console.log('krivo rjesenje')
           document.location.reload()
           return;

        }
      }

      await handleClickAddScore(userId, tacticId, time);
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
      loadAllTactics();
  };
  const handleClickAddScore = async (userId, tacticId, time) =>{
    try {
       await axiosPrivate.post('/score/add',  /* provjeri path */
            JSON.stringify({ 
                            score:{
                                userId: userId,
                                tacticId: tacticId,
                                time: time
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
                            onClick={()=>handleClickEditDailyTactics(element.title, element.content, 0, element.moves, element.id)}
                        >
                            <FiX/>
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
              set = {set}
              setSet = {setSet}
              moves = {moves}
              start = {start}
              setMoves = {setMoves}
            />
            </div>
            <Button onClick={handleStart} >Započni</Button>
            {editButton}
          </Typography>
          <DialogActions>
          <CustomizedDialogs 
            id = {element.id}
          />
          <Button onClick={handleClose}>Odustani</Button>
          <Button onClick={()=>handleSubmit(user[0], element.id, Date.now()-time)}>Potvrdi</Button>
        </DialogActions>
        </AccordionDetails>
      </Accordion>
    
  )
}

export default DailyTacticsElement
