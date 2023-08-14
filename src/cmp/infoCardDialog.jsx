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
import { appendCard } from '@/server/infoCards';
import MenuItem from '@mui/material/MenuItem';

export default function InfoCardDialog(props) {
   const { user, sectionTitle, section } = props;
   const [open, setOpen] = useState(false);
   const [isCreating, setIsCreating] = useState(false);
   const [title, setTitle] = useState('');
   const [subtitle, setSubtitle] = useState('');
   const [startMonth, setStartMonth] = useState(1); // Default to January (1)
   const [startYear, setStartYear] = useState(new Date().getFullYear());
   const [endMonth, setEndMonth] = useState(1); // Default to January (1)
   const [endYear, setEndYear] = useState(new Date().getFullYear());
   const handleClickOpen = () => setOpen(true);

   const clearFields = () => {
      setTitle('');
      setSubtitle('');
      setStartMonth(1);
      setStartYear(new Date().getFullYear());
      setEndMonth(1);
      setEndYear(new Date().getFullYear());
   };

   const handleClose = () => {
      if (isCreating) return;
      clearFields();
      setOpen(false);
   };
   
   const handleCreate = async () => {
      setIsCreating(true);
      console.log("Creating card...");
      const cardData = {
         title,
         subtitle,
         startDate: new Date(startYear, startMonth - 1, 1), // Set the date to the first day of the selected month
         endDate: new Date(endYear, endMonth - 1, 1), // Set the date to the first day of the selected month
      };
      console.log("Card data: ", cardData);
      const res = await appendCard(user, cardData, section);
      setIsCreating(false);
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
               <DialogTitle>Update your {sectionTitle} </DialogTitle>
               <DialogContent>
                  <TextField
                     value={title}
                     autoFocus
                     margin="dense"
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
                  <div className='flex justify-ends gap-2 mb-2'>
                     <TextField
                        select
                        fullWidth
                        label="Start Month"
                        value={startMonth}
                        onChange={(e) => setStartMonth(e.target.value)}
                        variant="filled"
                     >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                           <MenuItem key={month} value={month}>
                              {new Date(0, month - 1, 1).toLocaleString('en', { month: 'long' })}
                           </MenuItem>
                        ))}
                     </TextField>
                     <TextField
                        select
                        fullWidth
                        label="Start Year"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        variant="filled"
                     >
                        {Array.from({ length: 41 }, (_, i) => new Date().getFullYear() - 30 + i).map((year) => (
                           <MenuItem key={year} value={year}>
                              {year}
                           </MenuItem>
                        ))}
                     </TextField>
                  </div>
                  <div className='flex justify-ends gap-4'>
                     <TextField
                        select
                        fullWidth
                        label="End Month"
                        value={endMonth}
                        onChange={(e) => setEndMonth(e.target.value)}
                        variant="filled"
                     >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                           <MenuItem key={month} value={month}>
                              {new Date(0, month - 1, 1).toLocaleString('en', { month: 'long' })}
                           </MenuItem>
                        ))}
                     </TextField>
                     <TextField
                        select
                        fullWidth
                        label="End Year"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        variant="filled"
                     >
                        {Array.from({ length: 41 }, (_, i) => new Date().getFullYear() - 30 + i).map((year) => (
                           <MenuItem key={year} value={year}>
                              {year}
                           </MenuItem>
                        ))}
                     </TextField>
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
