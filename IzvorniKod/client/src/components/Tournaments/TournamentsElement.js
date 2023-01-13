import React from "react";
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import { FiX } from 'react-icons/fi';
import { Checkbox } from "@mui/material";
import UpdateTournaments from "./UpdateTournaments";


const TournamentsElement = ({element, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTournaments, handleDeleteTournaments, handleScheduleTournaments, handleCancelTournaments, scheduledData, user}) =>{
  console.log(scheduledData);
  let editButton = <></>;
  let scTournament = [];
  if(scheduledData!=undefined){
    scTournament = scheduledData.filter(item => item.tournament_id==element.id);
  }
  let initState = scTournament.length==1;
  console.log(initState)
  const [checked, setChecked] = useState(false);
  console.log(checked + 'check');
  const handleChecked = () =>{
    if(!checked){
      setChecked(true);
      if(!initState){
              handleScheduleTournaments(element.trainerId, element.tournamentStart, element.tournamentDuration, element.showing, element.id, element.participantsNo);
      }
    }
    if(checked){
      setChecked(false);
      initState=false;
      handleCancelTournaments(element.trainerId, element.tournamentStart, element.tournamentDuration, element.showing, element.id, element.participantsNo);
    }
  }
  let checkboxx = <>{ user[5]=='user' ?
  <Checkbox onChange={handleChecked}>Prijavi me na turnir!</Checkbox>
  : null }</>
  if (user[5] == 'admin' || ( user[0]==element.trainerId && user[5]=='trener')){
    editButton = <>
    <UpdateTournaments
    trainersId = {element.trainerId}
    date = {date}
    duration = {duration}
    showing = {element.showing}
    id = {element.id}
    participantsno = {element.participantsNo}
    setTrainersId = {setTrainersId}
    setDate = {setDate}
    setDuration = {setDuration}
    handleUpdateTournament = {handleUpdateTournaments}
    user = {user}>
    </UpdateTournaments></>
} 
  return(
        <>
        <Accordion style={{width:'100%'}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
        Turnir datuma {element.tournamentStart.slice(0,10)}
          
         </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography style={{backgroundColor:'rgba(214, 196, 205, 0.41)', borderRadius:'3px'}}>
            Početak turnira: {element.tournamentStart.slice(11,16)}<br></br>
          ID trenera koji vodi turnir: {element.trainerId}
          <br></br>
          Vrijeme trajanja turnira: {element.tournamentDuration}
          <br></br>
          Broj prijavljenih natjecatelja na turnir: {element.participantsNo}
          <br></br>
          {checkboxx}
          { user[0]==element.trainerId && user[5]=='trener' || user[5]=='admin' ?
            <IconButton 
            aria-label="remove" 
        >
            <FiX 
                onClick={()=>handleDeleteTournaments(element.trainerId, element.tournamentStart, element.tournamentDuration, 0, element.id)}
            />
        </IconButton>
            : null }
            <br></br>{editButton}
        </Typography>
        
      </AccordionDetails>
    </Accordion>
        </>
    )
}

export default TournamentsElement