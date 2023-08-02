import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function InfoCardDiaolog(props) {
   const { } = props;
   const [open, setOpen] = useState(false);
   const [isCreating, setIsCeating] = useState(false);
   const [title, setTitle] = useState('');
   const [subtitle, setSubtitle] = useState('');
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const handleClickOpen = () => setOpen(true);

   const clearFields = () => {
      setTitle('');
      setSubtitle('');
      setStartDate(null);
      setEndDate(null);
   };

   const handleClose = () => {
      if (isCreating) return;
      clearFields();
      setOpen(false);
   };
   
   const handleCreate = async () => {
      setIsCeating(true);
      const res = await updateProfile(newUsername, firstName, LastName);
      setIsCeating(false)
      handleClose();
   };

   return (
      <div>
         <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Button 
               onClick={handleClickOpen}
               color='primary'
               rounded='full'
            >
               <FontAwesomeIcon icon={faPlus} className='text-[#52796f] hover:text-[#84a98c]'/>
            </Button>
            <Dialog open={open} onClose={handleClose} >
               <DialogTitle>Update your Lifers Profile</DialogTitle>
               <DialogContent>
               <TextField
                     value={title}
                     autoFocus
                     margin="desnse"
                     id="title"
                     label="Title"
                     fullWidth
                     multiline
                     variant="filled"
                     onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                     value={subtitle}
                     autoFocus
                     margin="normal"
                     id="subtitle"
                     label="Subtitle"
                     fullWidth
                     multiline
                     variant="filled"
                     onChange={(e) => setSubtitle(e.target.value)}
                  />
                  <div className='flex justify-ends gap-4'>
                     <DateField
                        //value={startDate}
                        autoFocus
                        margin="normal"
                        id="start-date"
                        label="Start Date"
                        variant="filled"
                        views={['year', 'month']}
                        inputFormat="MM/yy"
                        //onChange={(e) => setStartDate(e.target.value)}
                     />
                     <DateField
                        //value={endDate}
                        autoFocus
                        margin="normal"
                        id="end-date"
                        label="End Date"
                        variant="filled"
                        //onChange={(e) => setEndDate(e.target.value)}
                     />
                  </div>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose} disabled={isCreating} >Cancel</Button>
                  <Button onClick={handleCreate} disabled={isCreating} >Create</Button>
               </DialogActions>
            </Dialog>
         </LocalizationProvider>
    </div>
  );
}
