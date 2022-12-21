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
import { useFetcher } from 'react-router-dom';
import { elementTypeAcceptingRef } from '@mui/utils';


const DailyTacticsElement = ({loadAllTactics, element, title, content, user}) => {
    const axiosPrivate = useAxiosPrivate();
    let deleteButton = <></>;
    let editButton = <></>;
    const [moves, setMoves] = useState([]);
    const [start, setStart] = useState(element.moves[0].fen);
    const [time, setTime] = useState();
    const [tactic, setTactic] = useState([]);
    const [set, setSet] = useState(false);


    const refereshTactics = async () => {
      try {
        const response = await axios.get('/tactics', 
                            {
                                headers: {'Content-Type':'application/json'}
                                
                            });
        
        setTactic(response.data.tactics); 
        console.log(response.data.tactics)
      } catch (err) {                                        
          console.error(err.response);
          
      }
      loadAllTactics();
    }

    useEffect( () => {
      refereshTactics();
    }, []);

    const handleStart = async () => {
      setSet(true);
      setTime(Date.now())
      setMoves([])
      refereshTactics(); 
      console.log('SET - dte: ')
      console.log(set)
    }
   
    const handleSubmit = async (userId, tacticId, time) => {
      setSet(false)
      console.log("moves to submit: ")
      console.log(moves)
      console.log("tactic rjesenje")
      tactic[element.id].moves = tactic[element.id].moves.slice(1)
      for (let j = 0; j < tactic[element.id].moves.length; j++){
        console.log("tactic:"+ tactic[element.id].moves[j].fen)
      }
      if (moves.length != tactic[element.id].moves.length) {
        console.log("Krivo rješenje. Pokušajte ponovo!")
         return;
      }

      for (let i = 0; i < moves.length; i++){
        console.log("move : [" + i +"]" +moves[i])
        console.log("tactic: [" + i +"]"+tactic[element.id].moves[i].fen)
        if (moves[i] != tactic[element.id].moves[i].fen){ 
           console.log("Krivo rješenje. Pokušajte ponovo!")
           return;

        }
      }
      console.log("Točno rješenje. Čestitam!")
      refereshTactics();
      await handleClickAddScore(userId, tacticId, time);
    };
   
    const handleClickEditDailyTactics = async (title, content, showing, moves, id) =>{
      if (!showing){
        moves = moves.map((el) => 
          el.fen
        )
        console.log('BRISANJE')
        console.log(moves)
      } else {
        console.log('EDITANJE')
        console.log(moves)
      }
     
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
      refereshTactics();
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
    refereshTactics();
};

    if (user[5] == 'admin'  || (user[5] == 'trener' && user[0] == element.trainer_id)){
        deleteButton =  <IconButton 
                            aria-label="remove" 
                            onClick={()=>handleClickEditDailyTactics(element.title, element.content, 0, tactic[element.id].moves, element.id)}
                        >  
                            <FiX/>
                        </IconButton>;
        editButton =    <IconButton 
                            aria-label="edit" 
        
                        >
                            <UpdateDailyTacticsFormDialog
                                id = {element.id}
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
              flag = {true}
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
          <Button onClick={()=>handleSubmit(user[0], element.id, Date.now()-time)}>Potvrdi</Button>
        </DialogActions>
        </AccordionDetails>
      </Accordion>
    
  )
}

export default DailyTacticsElement
