import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import BasicList from './RangList';
import axios from '../../api/axios';
import { useEffect } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({id}) {
  const [open, setOpen] = React.useState(false);
  const [rang, setRang] = React.useState([]);

  const handleClickOpen = () => {
    loadRangList(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const loadRangList = async (id) => {
        
    try {
        const response = await axios.post('/scores', 
            JSON.stringify({ 
                              tactic:{
                                id: id
                              }
                            
                            }),
                            {
                                headers: {'Content-Type':'application/json'}
                                
                            });
        
        setRang(response.data.scores);
    } catch (err) {                                        
        console.error(err.response);
        
    }
};

  return (
    <div>
      <Button style={{marginTop:-13}} onClick={handleClickOpen}>
        Rang Lista
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Rang lista
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <BasicList 
          rang={ !rang?.length  ? rang : rang.sort(function(a,b){return a.time - b.time}).filter((element => element.showing == 1))}/>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
