import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { FiEdit3, FiX } from "react-icons/fi";
import UpdateProfile from "./UpdateProfile";
import './home.css';

const ProfileElement = ({ handleClickUpdateProfile, username, name, surname, email, setUsername, setName, setSurname, setEmail,  user}) => {
   
    let editButton = <></>;

    
       
        editButton =    <IconButton 
                            aria-label="edit" 
        
                        >
                            <UpdateProfile
                                handleClickUpdateProfile = {handleClickUpdateProfile}
                                username= {username}
                                name={name}
                                surname={surname}
                                email={email}
                                setUsername={setUsername}
                                setName={setName}
                                setSurname={setSurname}
                                setEmail={setEmail}
                                user = {user}
                             
                            />
                            
                        </IconButton>

    
    
  return (
      <Accordion>
       {/* <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {/*{element.title} 
            {editButton} 
           </Typography>
        </AccordionSummary> */}
        <AccordionDetails>
          <Typography>
          {/*  {element.content} */}
            {editButton}
          </Typography>
        </AccordionDetails>
      </Accordion>
    
  )
}

export default ProfileElement
