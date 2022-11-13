import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ToolbarGroup from '@mui/material/Toolbar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const i = 1;
export default function HeaderUnsigned() {
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
                  <Link to="/login" style={{textDecoration: 'none', color: 'white', float: 'right'}}> 
                      <Button color="inherit" style={{color: '#faebd7'}} sx={{ mr:1 }}>Prijava u sustav</Button>
                  </Link>
                  <Link to="/register" style={{textDecoration: 'none', color: 'white', float: 'right'}}> 
                      <Button color="inherit" style={{color: '#faebd7'}}>Registracija u sustav</Button>
                  </Link>
              </ToolbarGroup>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
 