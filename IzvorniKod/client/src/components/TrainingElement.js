import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { FiEdit3, FiX } from "react-icons/fi";
import UpdateNews from "./UpdateNews"
import './home.css';

const TrainingElement = () => {

return (
    <div className='news' style={{backgroundColor:'#3371FF'}}>
        <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          Treningasti trening
         </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography style={{backgroundColor:'#3371FA'}}>
          Treningggg
          <br></br>
          Bla
        </Typography>
      </AccordionDetails>
    </Accordion>
  
    </div>
    
)

}

export default TrainingElement