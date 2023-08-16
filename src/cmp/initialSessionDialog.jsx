'use client';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ProfileDialog(props) {
   const { open, setOpen } = props;
   const [isUpdating, setIsUpdating] = useState(false);
   const [newUsername, setUsername] = useState('');
   const [firstName, setFirstName] = useState('');
   const [LastName, setLastName] = useState('');

   const handleClose = () => {
      if (isUpdating) return;
      setOpen(false);
      setFirstName('');
      setLastName('');
      setUsername('');
   };
   const handleCreate = async () => {
      setIsUpdating(true);
      const res = await updateProfile(newUsername, firstName, LastName);
      console.log('res', res)
      setIsUpdating(false)
      handleClose();
   };

   return (
      <Dialog open={open} onClose={handleClose} >
         <DialogTitle>Update your Lifers Profile</DialogTitle>
         <DialogContent>
         <TextField
               autoFocus
               margin="dense"
               id="first-name"
               label="Username"
               fullWidth
               multiline
               variant="filled"
               onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
               value={firstName}
               autoFocus
               margin="dense"
               id="first-name"
               label="First Name"
               fullWidth
               required
               variant="filled"
               onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
               autoFocus
               margin="dense"
               id="last-name"
               label="Last Name"
               fullWidth
               required
               variant="filled"
               onChange={(e) => setLastName(e.target.value)}
            />
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose} disabled={isUpdating} >Cancel</Button>
            <Button onClick={handleCreate} disabled={isUpdating} >Update</Button>
         </DialogActions>
      </Dialog>
  );
}
