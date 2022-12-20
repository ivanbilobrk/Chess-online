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
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const logout = useLogout();
    const location = useLocation();
    const {auth} = useAuth();           //primjer kako koristiti auth
    const array = ["username", "email", "name", "surname", "role"];
    //const [userData, setUserData] = useState([]);

    let counter = 0;

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

    const signout = async() =>{
        await logout();
        navigate('/');
    }

    const redirectToPayment = () => {
        //Redirect to the Payment page
        navigate("/Payment");
      };

    
    const PaymentAdmin = ({uloga}) =>{
        if(uloga == 'admin'){
            return (<><Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                                    ČLANOVI
                                </Typography><Typography align='left' color="text.secondary">
                                        Clan1 <Button size="large" >Pregled transakcija</Button><Button size="large" >Zabrani pristup</Button><br></br>
                                        Clan2 <Button size="large">Pregled transakcija</Button><Button size="large" >Zabrani pristup</Button><br></br>
                                        Clan3 <Button size="large">Pregled transakcija</Button><Button size="large" >Zabrani pristup</Button><br></br>
                                        Clan4 <Button size="large">Pregled transakcija</Button><Button size="large" >Zabrani pristup</Button>
                                    </Typography></>
            );
        }
            return (<>
                <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                   POVIJEST PLAĆANJA
               </Typography>
               <Typography align='left' color="text.secondary">
                   Srpanj - plaćen <br/>
                   Kolovoz - plaćen <br/>
                   Rujan - plaćen <br/>
                   Listopad - <Link>plati</Link> <br/>
                   Studeni - <Link>plati</Link>
               </Typography>
           </>);
        
        
    }
    function ButtonCheck1({uloga}){
        //console.log(data[5]);
        if(uloga == 'admin'){
            return null;
        }
            return (<div><Button size="large">Pregledaj cijelu povijest</Button> <Button size="large" onClick={redirectToPayment}>Uplata članarine</Button></div>);
        
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
                26. Listopad - trening odrađen <br />
                2. Studeni - trening odrađen <br />
                9. Studeni - trening odrađen
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
                    <Button size="large">Pregledaj nadolazeće turnire</Button>

                    </CardActions>
                </Card>
            </Grid></> );
    }
    
    return(
        <>
            <Box sx={{ width: '100%'}}>
            <Stack spacing={0}>
                <Item><Typography color="text.secondary">Dobrodošli na svoj profil! Ovdje možete pregledati svoje osobne podatke.</Typography></Item>
                <Item><Typography color="text.secondary">Ukoliko se želite vratiti na home page, kliknite <Link to="/" style={{ color: '#00F'}}>ovdje</Link>.</Typography></Item>
            </Stack>
            </Box>

            <h1>Vaš profil</h1>

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
                    </Item>
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
