import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './home.css';

const TrainingElement = (element, trainerId, date, duration, setTrainerId, setDate, setDuration, user) => {

return (
    <div className='news' style={{backgroundColor:'#3371FF'}}>
        <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          Trening: {element.trainingstarttimedate}
         </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography style={{backgroundColor:'#3371FA'}}>
          ID trenera koji vodi trening: {element.trainer_Id}
          <br></br>
          Vrijeme trajanja treninga: {element.trainingdurationmin}
        </Typography>
      </AccordionDetails>
    </Accordion>
  
    </div>
    
)

}

export default TrainingElement;