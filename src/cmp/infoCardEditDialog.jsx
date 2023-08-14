import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { appendCard, deleteCards } from '@/server/infoCards';
import MenuItem from '@mui/material/MenuItem';

export default function InfoCardEditDialog(props) {
   const { user, sectionTitle, section, cards, setSectionCards } = props;
   const [open, setOpen] = useState(false);
   const [isCreating, setIsDeleting] = useState(false);
   const [deleteIndeces, setDeleteIndeces] = useState([]);
   const handleClickOpen = () => setOpen(true);
   
   const clearFields = () => {
      setDeleteIndeces([]);
   };

   const handleClose = () => {
      if (isCreating) return;
      clearFields();
      setOpen(false);
   };
   
   const handleDelete = async () => {
      setIsDeleting(true);
      console.log("Deleting card...");
      const res = await deleteCards(user, section, cards, deleteIndeces);
      if (res) {
         console.log("Card Deleted!", res[0]);
         setSectionCards(section, res[0]);
      }
      setIsDeleting(false);
      handleClose();
   };

   const appendIndex = (index) => {
      if (deleteIndeces.includes(index)) {
         setDeleteIndeces(prevData => prevData.filter((i) => i !== index));
      } else {
         setDeleteIndeces(prevData => [...prevData, index]);
         setDeleteIndeces(prevData => prevData.sort());
      }
   };
   return (
      <div>
         <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Button 
               onClick={handleClickOpen}
               color='primary'
               rounded='full'
               sx={ { borderRadius: 70 } }
            >
               <FontAwesomeIcon icon={faEdit} size='xl' className='text-[#52796f] hover:text-[#84a98c]'/>
            </Button>
            <Dialog open={open} onClose={handleClose} >
               <DialogTitle>Delete an {sectionTitle} </DialogTitle>
               <DialogContent>
                  {cards && cards.map((card, key) => {
                     
                     return (
                     <div key={key}>
                        {key !== 0 && <div className="flex justify-center">
                           <div className="bg-gray-300 w-60 my-4 py-0.5" />
                        </div>}
                        <div className='flex-no-shrink flex flex-row px-4 rounded overflow-hidden w-600 mb-2'>
                           <div className='flex flex-row mr-7'>
                              <Checkbox
                                 color="primary"
                                 inputProps={{
                                    'aria-labelledby': key,
                                 }}
                                 onClick={() => appendIndex(key)}
                              />
                              <img src="https://via.placeholder.com/50" alt="" />
                           </div>
                           <div>
                              <p className='font-bold'>{card.title}</p>
                              <p>{card.subtitle}</p>
                              <p className='text-sm'>{card.start_date}</p>
                           </div>
                           {/* <div>
                              <Button 
                                 onClick={() => handleDeleteCard(key)}
                                 color='primary'
                                 rounded='full'
                                 sx={ { borderRadius: 70 } }
                              >
                                 <FontAwesomeIcon icon={faTrash} size='lg' className='text-[#52796f] hover:text-[#84a98c]'/>
                              </Button>
                           </div> */}
                        </div>
                     </div>
                  )})}
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose} disabled={isCreating} >Cancel</Button>
                  <Button onClick={handleDelete} disabled={isCreating} >Delete</Button>
               </DialogActions>
            </Dialog>
         </LocalizationProvider>
      </div>
   );
}
