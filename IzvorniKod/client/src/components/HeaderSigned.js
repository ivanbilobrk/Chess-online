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
                      <Button color="inherit" sx={{ mr:1 }}>Osobni podatci</Button>
                  </Link>
                  <Button color="inherit" onClick={signout} style={{textDecoration: 'none', color: '#faebd7', float: 'right'}} sx={{ mr:1 }}>Odjavi se</Button>
                  
              </ToolbarGroup>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }