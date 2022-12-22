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
import Admin from './Admin';
import Transakcije from './Transakcije';
// list imports
import axios from "../api/axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HeaderSigned from "../components/HeaderSigned";
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


export default function AllMembers(){
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
   
    
    const handleClickZabrani = async (name,surname, username, email, id) =>{
        try {
            const response =await axiosPrivate.post(`/user/zabrani/u/${auth.user}`, 
                JSON.stringify({ 
                                user:{
                                 name:name,
                                 surname:surname,
                                 username:username,
                                 email:email,
                                    id: id
                                }
                                }),
                                {

                                });
    
        } catch (err) {                                        
            console.error(err.response);
        
        }
      
    };
  
    const handleClickOnemoguci = async (id) =>{
        try {
            const response =await axiosPrivate.post(`/user/onemoguci/o/u/${auth.user}`, 
                JSON.stringify({
                              user: { id}
                 } ),
                                {
    
                                });
    
        } catch (err) {                                        
            console.error(err.response);
        
        }
      
    };
      
  
 
    
      

    const loadAllMember = async () => {
        try {
            const response = await axiosPrivate.get(`/user/r/${auth.user}`, {
            });
            /*await axios.get('/', 
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                }); */
            setData(response.data.membersAll);
            console.log(response.data.membersAll);
        } catch (err) {                                        
            console.error(err.response);
            
        }
    };
    
    useEffect(() =>{
        let isMounted = true;
        const controller = new AbortController();
      
        
        loadAllMember();
        
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    },[]);
    
   
  
 
    
      

   
    
    return(
        <>
        <HeaderSigned/>
        <Typography align='center'>
        <Grid align='center'>
                      <h2>Svi članovi</h2>

<Admin
          data={data}
          handleClickZabrani={handleClickZabrani}
          handleClickOnemoguci={handleClickOnemoguci}
         
         
          />
</Grid> </Typography>
<Grid>

<h2>Sve uplate članarina</h2>
<Typography align='center'>
            <Transakcije/>
            </Typography>
            </Grid> 
            
        </>
    );
};

export {AllMembers}
