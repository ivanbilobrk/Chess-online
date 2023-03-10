import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaPlus } from 'react-icons/fa';
import '../home.css';
import axios from '../../api/axios';


const AddNewsFormDialog = ({loadAllNews, title, content, setTitle, setContent, user}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (title,content) => {
    await handleClickAddNews(title,content);
    setOpen(false);
  };
  const handleClickAddNews = async (title, content) => {
    try {
        const response = await axios.post('/news/add', 
            JSON.stringify({ 
                            news:{
                                title: title,
                                content: content
                            }
                            }),
                            {
                                headers: {'Content-Type':'application/json'},
                                withCredentials: true
                            });
    } catch (err) {                                        
        console.error(err.response);
    
    }
    loadAllNews();
};

  return (
    <div>
        { user != 'user' ?
      <button className="addButton"  onClick={handleClickOpen}>
         <FaPlus/> 
      </button>
      : null }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add news</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To sumbit news fill required fields.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="title"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Content"
            type="content"
            fullWidth
            variant="standard"
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleSubmit(title,content)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddNewsFormDialog;
