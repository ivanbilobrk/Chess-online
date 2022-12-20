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

export default function Payment(){

    const [data, setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const logout = useLogout();
    const location = useLocation();
    const {auth} = useAuth();  
    const array = ["username", "email", "name", "surname", "role"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthList = months.map(month => {
        return <option value={month}>{month}</option>
    });

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

    return(
        <>
            <Box sx={{ width: '100%'}}>
            <Stack spacing={0}>
                <Item><Typography color="text.secondary">Ovdje možete izvršiti uplatu članarine. Pažljivo provjerite svoje osobne podatke prije uplate.</Typography></Item>
                <Item><Typography color="text.secondary">Ukoliko se želite vratiti na home page, kliknite <Link to="/" style={{ color: '#00F'}}>ovdje</Link>.</Typography></Item>
            </Stack>
            </Box>

            <h1>Uplata članarine</h1>

            <hr/>

            

            <Grid container spacing={2}> {/*OSOBNI PODACI*/}
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
                    <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                    ODABIR MJESECA
                    </Typography><Typography align='left' color="text.secondary">
                    <form>
                        <select style={{width:"35%", marginTop:"3%", marginBottom:"3%", marginRight:"3%", height:"1.5rem"}}>
                            <option selected value="sijecanj">Siječanj</option>
                            <option value="veljaca">Veljača</option>
                            <option value="ozujak">Ožujak</option>
                            <option value="travanj">Travanj</option>
                            <option value="svibanj">Svibanj</option>
                            <option value="lipanj">Lipanj</option>
                            <option value="srpanj">Srpanj</option>
                            <option value="kolovoz">Kolovoz</option>
                            <option value="rujan">Rujan</option>
                            <option value="listopad">Listopad</option>
                            <option value="studeni">Studeni</option>
                            <option value="proinac">Prosinac</option>
                         </select>
                         
                        <button color="primary" type="submit">Uplata</button>{' '}
                        
                    </form>

                    </Typography>
                    </CardContent>
                
                    </Card>
                 </Grid>

                

            </Grid>

        </>
    );
};

export {Payment}

