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

const NewsElement = ({element, handleClickUpdateNews, title, content, setTitle, setContent, user}) => {
    let deleteButton = <></>;
    let editButton = <></>;

    if (user[5] == 'admin'  || (user[5] == 'trener' && user[0] == element.trainer)){
        deleteButton =  <IconButton 
                            aria-label="remove" 
                        >
                            <FiX 
                                onClick={()=>handleClickUpdateNews(title, content, 0, element.id)}
                            />
                        </IconButton>;
        editButton =    <IconButton 
                            aria-label="edit" 
        
                        >
                            <UpdateNews
                                handleClickUpdateNews = {handleClickUpdateNews}
                                id = {element.id}
                                title = {title}
                                content = {content}
                                setTitle = {setTitle}
                                setContent = {setContent}
                                user = {user}
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
            {editButton}
          </Typography>
        </AccordionDetails>
      </Accordion>
    
  )
}

export default NewsElement
