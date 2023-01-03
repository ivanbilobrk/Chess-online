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
import { withRouter } from 'react-router-dom';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
// list imports
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import handleClickPay from './Profile'
// card imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from '../api/axios';
import { MenuItem, TextField } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));





export default function PayMembership(){
    const axiosPrivate = useAxiosPrivate();
    const [data3, setData3] = useState([]);
    const [data, setData] = useState([]);
    const [month, setMonth] = useState('');
    const navigate = useNavigate();
    const logout = useLogout();
    const paid=1;
    const location = useLocation();
    const {auth} = useAuth();  
    const array = ["username", "email", "name", "surname", "role"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthList = months.map(month => {
        return <option value={month}>{month}</option>
    });

    let counter = 0;
    function fja3(){
        navigate('/', { state: { from: location }, replace: true });

    }
    function fja5(){
        navigate('/profile', { state: { from: location }, replace: true });

    }
    console.log(data[0])
    const fjaUplati = async (month) => {
        console.log(month)
        await handleClickPay(month, paid);
        console.log(data3.userId)
        await handleClickOmoguci(data[0]);
        navigate('/profile', { state: { from: location }, replace: true });
       
      };
      const handleClickPay = async (month, isPaid) =>{
        try {
            const response = await axiosPrivate.post('/transactions/addTransaction', 
                JSON.stringify({ 
                                membership:{
                                    month: month,
                                    isPaid: isPaid
                                    
                                }
                                }),
                               );

                               
    
        } catch (err) {                                        
            console.error(err.response);
        
        }
    };
    const handleClickOmoguci = async (id) =>{
        try {
            const response =await axiosPrivate.post(`/user/omoguci/o/u/o/o/${auth.user}`, 
                JSON.stringify({
                              user: { id}
                 } ),
                                {
    
                                });
    
        } catch (err) {                                        
            console.error(err.response);
        
        }
      
    };

    

        const signout = async() =>{
            await logout();
            navigate('/');
        }
       
        useEffect(() => {
            let isMounted = true;
            const controller = new AbortController();
            const getData = async () => {
                try {
                    const response = await axiosPrivate.get(`/user/${auth.user}`, {
                    });
                    console.log(response.data.podatci);
                    isMounted && setData(response.data.podatci);
                } catch (err) {                                         //na ovaj način ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
                    console.error(err);
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }
    
            getData();
            console.log(data);
            console.log(data[5]);
    
            return () => {
                isMounted = false;
                controller.abort();
            }
        }, [])
  
    
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getData3 = async () => {
            try {
                const response = await axiosPrivate.get(`/transactions/userTransactions`, {
                });
                console.log(response.data.allUserMemberships);
                isMounted && setData3(response.data.allUserMemberships);
            } catch (err) {                                         //na ovaj način ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getData3();
        console.log(data3);
        console.log(data3[5]);

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return(
        <>
            <Box sx={{ width: '100%'}}>
            <Stack spacing={0}>
                <Item><Typography color="text.secondary">Ovdje možete izvršiti uplatu članarine. Pažljivo provjerite svoje osobne podatke prije uplate.</Typography></Item>
                <Item><Typography color="text.secondary">Ukoliko se želite vratiti na home page, kliknite  <Button onClick ={fja3} size="small">ovdje</Button></Typography></Item>
            </Stack>
            </Box>

            <h1>Uplata članarine</h1>

            <hr/>

            

            <Grid container spacing={2}> {/*OSOBNI PODACI*/}
                <Grid item xs={6}>
                    <Item>
                    <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                   POVIJEST PLAĆANJA
               </Typography>
               <Typography align='left' color="text.secondary">
              
               {data3?.length
                            ? (

                                <table align='center' >           
    {data3.map((eachData) => (
      <tr> Mjesec: <td>{eachData.month}</td>  
      <tr> |</tr>         
       <td>Placeno: {eachData.isPaid ? ("da"): ("ne")}</td>
       
       
      </tr>
      ))  
    } </table>
    ): <p>Nema uplata</p> }
                  
               </Typography>
                    </Item>
                </Grid>

                <Grid item xs={6}> {/*POVIJEST PLACANJA*/}
                    <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                    <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                    ODABIR MJESECA
                    </Typography>

<Box>
                   <TextField label='Odaberi mjesec' select 
                   value={month} onChange={(e) => setMonth(e.target.value)} fullWidth>
                    <MenuItem value='1'>Siječanj</MenuItem>
                    <MenuItem value='2'>Veljača</MenuItem>
                    <MenuItem value='3'>Ožujak</MenuItem>
                    <MenuItem value='4'>Travanj</MenuItem>
                    <MenuItem value='5'>Svibanj</MenuItem>
                    <MenuItem value='6'>Lipanj</MenuItem>
                    <MenuItem value='7'>Srpanj</MenuItem>
                    <MenuItem value='8'>Kolovoz</MenuItem>
                    <MenuItem value='9'>Rujan</MenuItem>
                    <MenuItem value='10'>Listopad</MenuItem>
                    <MenuItem value='11'>Studeni</MenuItem>
                    <MenuItem value='12'>Prosinac</MenuItem>


                   </TextField>

                   < Button  align='left' onClick ={()=>fjaUplati(month)} size="large">Uplati</Button>
                 {/*  < Button  align='left' onClick ={fjaUplati(month)} size="large">Uplati</Button> */}
                   </Box>
                    </CardContent>
                
                    </Card>
                 </Grid>

                

            </Grid>

            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={signout}>Odjavi se</Button>

        </>
    );
};

export {PayMembership}
