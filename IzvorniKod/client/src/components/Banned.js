import { useState, useEffect } from 'react';
import{Link} from 'react-router-dom'
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// card imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function Banned(){
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

   
   

    const signout = async() =>{
        await logout();
        navigate('/');
    }
   
 
   
    
    
    return(
        <>
           

            <h2>Zabranjen pristup profilu</h2>

            
            
        <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={signout}>Odjavi se</Button>
        </>
    );
};

export {Banned}
