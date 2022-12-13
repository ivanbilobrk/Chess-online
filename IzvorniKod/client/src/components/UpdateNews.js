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

const UpdateNewsFormDialog = ({handleClickUpdateNews, title, content, setTitle, setContent, element}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (title,content) => {
    await handleClickUpdateNews(title, content, 1, element.id);
    setOpen(false);
  };

  return (
    <div>
      <button className="addButton"  onClick={handleClickOpen}>
        <FiEdit3/>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add news</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit news fill required fields.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="title"
            fullWidth
            variant="standard"
            defaultValue={element.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Content"
            type="content"
            fullWidth
            variant="standard"
            defaultValue={element.content}
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

export default UpdateNewsFormDialog;
