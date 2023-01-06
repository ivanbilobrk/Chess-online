import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaPlus } from 'react-icons/fa';
import './home.css';
import { FiEdit3, FiX } from 'react-icons/fi';
import { useNavigate, useLocation } from "react-router-dom";
const UpdateProfileFormDialog = ({ handleClickUpdateProfile, username, name, surname, email, setUsername, setName, setSurname, setEmail,  user}) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setUsername(user[1])
    setName(user[3])
    setSurname(user[4])
    setEmail(user[2])
    //setContent(element.content)
    //setTitle(element.title)
    setOpen(true);
  };



  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (username, name, surname, email) => {
    await handleClickUpdateProfile(username, name, surname, email, user[0]);
    setOpen(false);
    navigate('/profile', { state: { from: '/edit'}, replace: true });
  };

  return (
    <div>
      <button className="addButton"  onClick={handleClickOpen}>
        <FiEdit3/>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit profile fill required fields correctly.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="username"
            fullWidth
            variant="standard"
            defaultValue={user[1]}
            onChange={(e) => setUsername(e.target.value)}
          />
             <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
            variant="standard"
            defaultValue={user[3]}
            onChange={(e) => setName(e.target.value)}
          />
             <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Surname"
            type="surname"
            fullWidth
            variant="standard"
            defaultValue={user[4]}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={user[2]}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleSubmit(username, name, surname, email)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateProfileFormDialog;
