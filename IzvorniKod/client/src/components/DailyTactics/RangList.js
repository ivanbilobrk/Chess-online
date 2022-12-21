import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function BasicList({rang}) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      
     
      <nav aria-label="secondary mailbox folders">
        <List>
        {!rang?.length ? (
        <p style={{margin:'2rem', fontSize:'18px'}}>Još nitko nije riješio dnevnu taktiku.</p>
      ) : (
        rang.map((element) => (
            <ListItem key= {element.id} disablePadding>
            <ListItemButton style={{width:400}}>
              {element.user} {element.time}
            </ListItemButton>
          </ListItem>
        )
        ))
        }
          
        </List>
      </nav>
    </Box>
  );
}
