import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import { FiX } from 'react-icons/fi';
import './home.css';

const TrainingElement = (element, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTraining, user) => {

  let deleteButton = <></>;

  if (user[5] == 'admin' || user[5] == 'trener'){
    deleteButton =  <IconButton 
                        aria-label="remove" 
                    >
                        <FiX 
                            onClick={()=>handleUpdateTraining(duration, date, 0, element.id, trainersId)}
                        />
                    </IconButton>;
} 
return (
    <div className='news' style={{backgroundColor:'#3371FF'}}>
        <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          Trening: {element.trainingstarttimedate}   {deleteButton}
         </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography style={{backgroundColor:'#3371FA'}}>
          ID trenera koji vodi trening: {element.trainer_id}
          <br></br>
          Vrijeme trajanja treninga: {element.trainingdurationmin}
        </Typography>
      </AccordionDetails>
    </Accordion>
  
    </div>
    
)

}

export default TrainingElement;