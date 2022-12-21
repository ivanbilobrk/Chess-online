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
import { useNavigate, useLocation } from "react-router-dom";

import { useState, useEffect } from 'react';
import axios, { axiosPrivate } from "../api/axios";
import Button from "@mui/material/Button";
import useAuth from "../hooks/useAuth";
const AdminElement = ({element, handleClickZabrani, handleClickOnemoguci}) => {
  const {auth} = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const idx=element.id
    let deleteButton = <></>;
    let editButton = <></>;
    

  const handleSubmit = async (id) => {
    await handleClickZabrani(id);
    //setOpen(false);
    navigate('/members', { state: { from: '/members'}, replace: true });
  };

  const handleSubmit2 = async (id) => {
    await handleClickOnemoguci(id);
    //setOpen(false);
    navigate('/members', { state: { from: '/members'}, replace: true });
  };
  
 
  
    
    
    
  return (
      <Accordion>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
           Ime i prezime : {element.name}  {element.surname}
           
           </Typography>
           
        </AccordionSummary>
      
        <AccordionDetails>
          <Typography>
          Transakcije:  {data}
            {editButton}
            {/*<Button onClicick="funkcija();" >Zabrani pristup</Button> */}
            <Button onClick={()=>handleSubmit(element.id)}>Zabrani pristup</Button>
            <Button onClick={()=>handleSubmit2(element.id)}>Omogući samo plaćanje</Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    
  )
}

export default AdminElement;
