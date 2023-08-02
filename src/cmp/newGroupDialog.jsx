import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { createGroup } from '@/server/groups';1

export default function FormDialog(props) {
   const { user, supabase } = props;
   const [open, setOpen] = useState(false);
   const [isCreating, setIsCreating] = useState(false);
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [usingCode, setUsingCode] = useState(false);

   const handleClickOpen = () => setOpen(true);
   const handleClose = () => {
      setOpen(false);
      setName('');
      setDescription('');
   };
   const handleCreate = async () => {
      setIsCreating(true);
      try {
         const res = await supabase
            .from('liferss')
            .insert({
               name, 
               description,
               members: [user.id],
               admins: [user.id]
            });
      } catch (error) {
         alert(error.message);
      }
      finally {
         setIsCreating(false);
         handleClose();
      }
   };

   return (
      <div>
         <button className='text-white bg-[#52796f] rounded-full hover:bg-[#84a98c] px-3 py-2' onClick={handleClickOpen} >
            <FontAwesomeIcon icon={faPlus} />
         </button>
         <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Create a new group of Lifers</DialogTitle>
            <DialogContent>
               <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Group Name"
                  fullWidth
                  required
                  variant="filled"
                  onChange={(e) => setName(e.target.value)}
               />
               <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Group Description"
                  fullWidth
                  multiline
                  variant="filled"
                  onChange={(e) => setDescription(e.target.value)}
               />
            </DialogContent>
            <DialogActions className=''>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
         </Dialog>
    </div>
  );
}
