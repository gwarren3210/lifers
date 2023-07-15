import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function LifersTable(props) {
   return (
      <div className='xl:w-3/4'>
         <button onClick={()=> props.toggleFunc('')} className='text-white bg-[#52796f] py-2 px-7 mx-4 rounded-full mb-5 hover:bg-[#84a98c]'>
            Back
         </button>
         <TableContainer component={Paper} className='shadow-lg '>
         <Table>
            <TableHead>
               <TableRow>
                  {["Name" , "Age", "Location" ,"Occupation", "Firm", "College"].map((header, key) => (
                     <TableCell key={key}>{header}</TableCell>
                     
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {props.people.map((person, key) => (
                  <TableRow key={key}>
                     <TableCell>{person.name}</TableCell>
                     <TableCell>{person.age}</TableCell>
                     <TableCell>{person.location}</TableCell>
                     <TableCell>{person.occupation}</TableCell>
                     <TableCell>{person.firm}</TableCell>
                     <TableCell>{person.college}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         </TableContainer>
      </div>
    );
  };