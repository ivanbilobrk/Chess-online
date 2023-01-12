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


const TournamentsElement = ({element, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTournaments, handleScheduleTournaments,scheduledData, user}) =>{
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
            Početak treninga: {element.tournamentStart.slice(11,16)}<br></br>
          ID trenera koji vodi trening: {element.trainerId}
          <br></br>
          Vrijeme trajanja treninga: {element.tournamentDuration}
          <br></br>
        </Typography>
      </AccordionDetails>
    </Accordion>
        </>
    )
}

export default TournamentsElement