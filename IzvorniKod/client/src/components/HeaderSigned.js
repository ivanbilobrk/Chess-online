import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ToolbarGroup from '@mui/material/Toolbar';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { BiUser } from "react-icons/bi";



export default function HeaderSigned() {
    const navigate = useNavigate();
    const logout = useLogout();
    const signout = async() =>{
        await logout();
        navigate('/');
    }
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx ={{justifyContent: "space-between"}}>
              <ToolbarGroup >
                  <Link to="/" style={{textDecoration: 'none', color: 'white'}} >
                      <Typography variant="h6" component="div" style={{padding: '1px 10px', fontSize: '30px'}} sx={{ 
                      ':hover': {
                      bgcolor: '#1565c0', // theme.palette.primary.main
                      color: 'white',
                       }, }}>
                      Šahisti
                      </Typography>
                  </Link>
              </ToolbarGroup>
              <ToolbarGroup>
                  <Link to="/profile" style={{textDecoration: 'none', color: 'white', float: 'right'}}> 
                      <Button color="inherit" sx={{ mr:1 }}>Osobni podatci <BiUser style={{margin: 4, marginBottom:5, fontSize:18}}/>
                      </Button>
                  </Link>
                  
              </ToolbarGroup>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }