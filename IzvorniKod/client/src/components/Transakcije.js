import { useState, useEffect } from 'react';
import{Link, renderMatches} from 'react-router-dom'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from '../hooks/useLogout';
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Stack from '@mui/material/Stack';


// list imports
import axios from "../api/axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// card imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Table } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function Transakcije(){
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const logout = useLogout();
    const location = useLocation();
    const {auth} = useAuth();           //primjer kako koristiti auth
    const array = ["username", "email", "name", "surname", "role"];
    //const [userData, setUserData] = useState([]);

    let counter = 0;
   
    
    
  
 
    const loadAllPayments = async () => {
        try {
            const response = await axiosPrivate.get('/transactions', 
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
            setData(response.data.allMemberships);
            console.log(response.data.allMemberships);
        } catch (err) {                                        
            console.error(err.response);
            
        }
    };
    
    useEffect(() =>{
        let isMounted = true;
        const controller = new AbortController();
     
        
        loadAllPayments();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    },[]);
      

   
   
    
    return(
        <Typography align='center' color="text.secondary">



<table align='center' >

    {data.map((eachData) => (
      <tr> Mjesec: <td>{eachData.month}</td>  
      <tr> |</tr>         
       <td>Placeno: {eachData.isPaid ? ("da"): ("ne")}</td>
       <tr> |</tr>   
       <td>ClanID: { JSON.stringify(eachData.userId)}</td>
      </tr>
      ))
    }
      </table>
      
      </Typography>  




            
        
    );
};

export {Transakcije}
