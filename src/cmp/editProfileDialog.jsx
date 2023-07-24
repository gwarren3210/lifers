import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createGroup } from '@/server/groups';

export default function ProfileDialog(props) {
   const { updateProfile, loading, username, website, avatar_url } = props;
   const [open, setOpen] = useState(false);
   const [isUpdating, setIsUpdating] = useState(false);
   const [newUsername, setUsername] = useState('');
   const [firstName, setFirstName] = useState('');
   const [LastName, setLastName] = useState('');
   const handleClickOpen = () => setOpen(true);

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
      setIsUpdating(false)
      handleClose();
   };

   return (
      <div>
         <Button 
            className='bg-[#52796f]' 
            onClick={handleClickOpen}
            color='primary'
            variant='contained'
            rounded='full'
         >
            <p>Update Profile</p>
         </Button>
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
                  autoFocus
                  margin="dense"
                  id="last-name"
                  label="First Name"
                  fullWidth
                  required
                  variant="filled"
                  onChange={(e) => setFirstName(e.target.value)}
               />
               <TextField
                  autoFocus
                  margin="dense"
                  id="name"
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
    </div>
  );
}
