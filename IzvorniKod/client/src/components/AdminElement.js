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
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios, { axiosPrivate } from "../api/axios";
import Button from "@mui/material/Button";
import useAuth from "../hooks/useAuth";
const AdminElement = ({element, handleClickZabrani, handleClickOnemoguci, handleClickOdobri}) => {
  const {auth} = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  
  const [isDisabled, setDisabled] = useState(element.isBanned);
  const [isDisabled2, setDisabled2] = useState(!element.isBanned);
  const [isDisabled3, setDisabled3] = useState(element.onlyPay);
let count
  //const idx=element.id
    let deleteButton = <></>;
    let editButton = <></>;
if(element.isBanned){
 count =1;}
else { count =0;}


  const handleSubmit = async (name, surmame, username, email, id, isBanned) => {
    count++;
    await handleClickZabrani(name, surmame, username, email, id);
    //setOpen(false);
   // handleClickZabrani.disabled(true);
   if(count%2==1){
    setDisabled(!isBanned);
    setDisabled2(isBanned);}
    else{setDisabled(isBanned);
      setDisabled2(!isBanned);}

    //window.location.reload(true);
    navigate('/members', { state: { from: '/members'}, replace: true });
  };

  const handleSubmit2 = async (id, onlyPay) => {
    await handleClickOnemoguci(id);
    //setOpen(false);
    setDisabled3(!onlyPay);
    navigate('/members', { state: { from: '/members'}, replace: true });
  };

  const handleSubmit3 = async (id, isBanned) => {
    count++;
    await handleClickOdobri(id);
    //setOpen(false);
    if(count%2==0){
    setDisabled(!isBanned);
    setDisabled2(isBanned);}
    else{setDisabled(isBanned);
      setDisabled2(!isBanned);}
   // window.location.reload(true);

    navigate('/members', { state: { from: '/members'}, replace: true });
  };
  
 
  
    
    
    
  return (
    <p align='center'>
      <Accordion >
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography align='center' color="text.secondary">
           Ime i prezime : {element.name}  {element.surname} (Id: {element.id}) 
           
           </Typography>
           
        </AccordionSummary>
      
        <AccordionDetails>
          <Typography>
    {/*Transakcije:  {data} */}
            {editButton}
            {/*<Button onClicick="funkcija();" >Zabrani pristup</Button> */}

            <Button disabled={isDisabled} onClick={()=>handleSubmit(element.name, element.surname, element.username, element.email,element.id, element.isBanned)}>Zabrani pristup</Button>
            <Button disabled={isDisabled2} onClick={()=>handleSubmit3(element.id, element.isBanned)}>Odobri pristup</Button>
            <Button disabled={isDisabled3} onClick={()=>handleSubmit2(element.id, element.onlyPay)}>Omogući samo plaćanje</Button>
            
          </Typography>
        </AccordionDetails>
      </Accordion>
   </p>
  )
}

export default AdminElement;
