import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { FiEdit3, FiX } from "react-icons/fi";
import UpdateNews from "./UpdateNews"
import '../home.css';
import axios from '../../api/axios';

const NewsElement = ({element, loadAllNews, title, content, setTitle, setContent, user}) => {
    let deleteButton = <></>;
    let editButton = <></>;
    
    const handleClickUpdateNews = async (title, content, showing, id) =>{
      try {
          const response = await axios.post('/news/update', 
              JSON.stringify({ 
                              news:{
                                  title: title,
                                  content: content,
                                  showing: showing,
                                  id: id
                              }
                              }),
                              {
                                  headers: {'Content-Type':'application/json'},
                                  withCredentials: true
                              });
  
      } catch (err) {                                        
          console.error(err.response);
      
      }
      loadAllNews();
  };

    if (user[5] == 'admin'  || (user[5] == 'trener' && user[0] == element.trainer)){
        deleteButton =  <IconButton 
                            aria-label="remove" 
                            onClick={()=>handleClickUpdateNews(title, content, 0, element.id)}
                        >
                            <FiX/>
                        </IconButton>;
        editButton =    <IconButton 
                            aria-label="edit" 
        
                        >
                            <UpdateNews
                                handleClickUpdateNews={handleClickUpdateNews}
                                loadAllNews={loadAllNews}
                                title = {title}
                                content = {content}
                                setTitle = {setTitle}
                                setContent = {setContent}
                                element = {element}
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
