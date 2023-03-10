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


export default function Profile(){
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const logout = useLogout();
    const location = useLocation();
    const isPaid='1';
    const {auth} = useAuth();           //primjer kako koristiti auth
    const array = ["username", "email", "name", "surname", "role"];
    //const [userData, setUserData] = useState([]);

    let counter = 0;
   /*const handleClickPay = async (month, isPaid) =>{
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
    };*/
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`/user`, {
                });
                isMounted && setData(response.data.podatci);
            } catch (err) {                                         //na ovaj na??in ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
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
        const getData2 = async () => {
            try {
                const response = await axiosPrivate.get(`/user/u/i/${auth.user}`, {
                });
                console.log(response.data.podatcii);
                isMounted && setData2(response.data.podatcii);
            } catch (err) {                                         //na ovaj na??in ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getData2();
        console.log(data2);
        console.log(data2[5]);

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

   
    useEffect(() => {
      // if( data[5]==="admin" || data[5]==="user" || data[5]==="trainer"){
        let isMounted = true;
        const controller = new AbortController();
        
        const getData3 = async () => {
            console.log(data[5])
           // if( data[5]=="user"){
            try {
                const response = await axiosPrivate.get(`/transactions/userTransactions`, {
                });
                console.log(response.data.allUserMemberships);
                isMounted && setData3(response.data.allUserMemberships);
            } catch (err) {                                         //na ovaj na??in ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
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
    }//}
   // else return null;
   // }
   , [])


    function fja(){
        navigate('/members', { state: { from: location }, replace: true });

    }
    function fja2(){
        navigate('/edit', { state: { from: location }, replace: true });

    }
    function fja3(){
        navigate('/', { state: { from: location }, replace: true });

    }
    function fja4(){
        navigate('/PayMembership', { state: { from: location }, replace: true });

    }

    const signout = async() =>{
        await logout();
        navigate('/');
    }
   
    const PaymentAdmin = ({uloga}) =>{
        if(uloga == 'admin'){
            return (<><Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                                    ??LANOVI
                                </Typography><Typography align='center' color="text.secondary">
                                 <Button onClick ={fja} size="large">Klikni za pregled svih ??lanova</Button>
                     {/*                   
                    <Item><Typography color="text.secondary"> <Link to="/members" style={{ color: '#00F'}}>Pogledaj sve clanove</Link>.</Typography></Item> */}
        </Typography></> 
            );
        }
        if(data2[7]){navigate('/payMembership', { state: { from: location }, replace: true });}
        if(data2[6]){navigate('/banned', { state: { from: location }, replace: true });}
        
            return (<>
                <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                   POVIJEST PLA??ANJA
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
           </>);
        
        
    }
    function ButtonCheck1({uloga}){
        //console.log(data[5]);
        if(uloga == 'admin'){
            return null;
        }
            return <Button onClick={fja4} size="large">Plati ??lanarinu</Button>;
        
    }

    function TurniriTrening({uloga}){
        if(uloga == 'admin'){
            return null;
        }
        return (<><Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
            TRENING
        </Typography><Typography align='left' color="text.secondary">
                26. Listopad - trening odra??en <br />
                2. Studeni - trening odra??en <br />
                9. Studeni - trening odra??en
            </Typography>
                </CardContent>
                <CardActions>
                <Button size="large">Uplati trening!</Button>

                </CardActions>
            </Card>
        </Grid><Grid item xs={6}> {/*TURNIRI*/}
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                    <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
            TURNIRI
        </Typography><Typography align='left' color="text.secondary">
                29. Listopad - 3. mjesto <br />
                5. Studeni - 7. mjesto <br />
                12. Studeni - 1. mjesto
            </Typography>
                    </CardContent>
                    <CardActions>
                    <Button  size="large">Pregledaj nadolaze??e turnire</Button>

                    </CardActions>
                </Card>
            </Grid></> );
    }
    
    return(
        <>
            <Box sx={{ width: '100%'}}>
            <Stack spacing={0}>
                <Item><Typography color="text.secondary">Dobrodo??li na svoj profil! Ovdje mo??ete pregledati svoje osobne podatke.</Typography></Item>
                <Item><Typography color="text.secondary">Ukoliko se ??elite vratiti na home page, kliknite  <Button onClick ={fja3} size="small">ovdje</Button>
                {/*<Link to="/" style={{ color: '#00F'}}>ovdje</Link>*/}</Typography></Item>
            </Stack>
            </Box>

            <h1>Va?? profil</h1>

            <hr/>

            <Grid container spacing={3}> {/*OSOBNI PODACI*/}
                <Grid item xs={6}>
                    <Item>
                        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                            OSOBNI PODACI
                        </Typography>

                        {data?.length
                            ? (
                                <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
                                aria-label="contacts">
                                    {data.slice(1).map((podatak, i) => <ListItem disablePadding sx={{ border: 1 }} key={i}><ListItemText inset primary={podatak} secondary={array[counter++]}></ListItemText></ListItem>)}
                                </List>
                            ) : <p>No data to display</p>
                        }
                         <CardActions>
                       < Button  align='center' onClick ={fja2} size="large">Uredi profil</Button>
                       </CardActions>
                    </Item>
                    
                   
                   {/* <Item><Typography color="text.secondary"> <Link to="/edit" style={{ color: '#00F'}}>Uredi profil</Link>.</Typography></Item> */}
                </Grid>

                <Grid item xs={6}> {/*POVIJEST PLACANJA*/}
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <PaymentAdmin uloga={data[5]}/>
                        </CardContent>
                        <CardActions>
                            <ButtonCheck1 uloga={data[5]}/>
                            
                            
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <hr/>

            <Grid container spacing={3}> {/*TRENING*/}
                <TurniriTrening uloga={data[5]}/>                
            </Grid>
            
        <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={signout}>Odjavi se</Button>
        </>
    );
};

export {Profile}
