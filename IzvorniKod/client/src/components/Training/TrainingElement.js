import React, { useEffect } from 'react'

import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import { FiX } from 'react-icons/fi';
import { FiEdit3 } from 'react-icons/fi';
import { Checkbox } from "@mui/material";
import UpdateTraining from './UpdateTraining';

const TrainingElement = ({element, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTraining, 
  handleScheduleTraining, handleCancelTraining, scheduledData, user}) => {
  
  let scTraining = [];
  if(scheduledData!=undefined){
    scTraining = scheduledData.filter(item => item.training_id==element.id);
  }
  console.log(scTraining.length);
  
  let checkboxx = <></>;
  let editButton = <></>;
  const[checked, setChecked] = useState(false)
  let initState = scTraining.length==1;
  let unchecked = false
  console.log(initState+ ' ' + unchecked)
  const checkboxHandle = () => {
    if(!checked){
      setChecked(true);
      handleScheduleTraining(trainersId, date, duration, 1, element.id);
    }
    else{
      setChecked(false);
      handleCancelTraining(trainersId, date, duration, 1, element.id);
      unchecked = true;
    }
  }

  if (user[5] == 'admin' || ( user[0]==element.trainerId && user[5]=='trener')){
        editButton = <>
        <UpdateTraining
        trainersId = {element.trainerId}
        date = {date}
        duration = {duration}
        showing = {element.showing}
        id = {element.id}
        setTrainersId = {setTrainersId}
        setDate = {setDate}
        setDuration = {setDuration}
        handleUpdateTraining = {handleUpdateTraining}
        user = {user}>
        </UpdateTraining></>
} 
    if(user[5]=='user'){
        checkboxx = <>Prijavi me na trening! <Checkbox onChange={checkboxHandle} ></Checkbox></>
    }
return (
        <Accordion style={{width:'100%'}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
        <pre style={{fontFamily:'inherit'}}>
        Trening datuma {element.trainingStart.slice(0,10)}     {initState==true&&unchecked==false || checked==true ? <span style={{color:'green', float:'right'}}>Prijavljeni ste na ovaj trening </span> : null}
        </pre>
          
         </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography style={{backgroundColor:'rgba(214, 196, 205, 0.41)', borderRadius:'3px'}}>
            Početak treninga: {element.trainingStart.slice(11,16)}<br></br>
          ID trenera koji vodi trening: {element.trainerId}
          <br></br>
          Vrijeme trajanja treninga u minutama: {element.trainingDuration}
          <br></br>
          {checkboxx}
          { user[0]==element.trainerId && user[5]=='trener' || user[5]=='admin' ?
            <IconButton 
            aria-label="remove" 
        >
            <FiX 
                onClick={()=>handleUpdateTraining(duration, date, 0, element.id, trainersId)}
            />
        </IconButton>
            : null }
          <br></br>
          {editButton}
        </Typography>
      </AccordionDetails>
    </Accordion>
    
)

}

export default TrainingElement;
