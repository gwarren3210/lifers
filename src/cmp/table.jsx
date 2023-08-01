import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function PeopleTable(props) {
   console.log('props people', props.people)
   const dateFormater = (date) => {
      const d = new Date(date);
      return d.toLocaleDateString();
   };

   return (
      <div className=''>
         <button onClick={props.toTable} className='text-white bg-[#52796f] py-2 px-7 mx-4 rounded-full mb-5 hover:bg-[#84a98c]'>
            Back
         </button>
         <TableContainer component={Paper} className='shadow-lg'>
         <Table>
            <TableHead>
               <TableRow>
                  {["First Name" , "Last Name", "Username", "Last Updated"].map((header, key) => (
                     <TableCell key={key}>{header}</TableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {props.people.map((person) => (
                  <TableRow key={person.id}>
                     <TableCell>{person.first_name}</TableCell>
                     <TableCell>{person.last_name}</TableCell>
                     <TableCell>{person.username}</TableCell>
                     <TableCell>{dateFormater(person.updated_at)}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         </TableContainer>
      </div>
    );
  };