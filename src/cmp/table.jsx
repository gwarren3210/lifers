import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import people from '../data/people.json'
export default function LifersTable(props) {
   return (
      <div className='shadow-lg xl:w-3/4'>
         <TableContainer component={Paper}>
         <Table>
            <TableHead>
               <TableRow>
                  {["Name" , "Age", "Location" ,"Occupation", "Firm", "College"].map((header, key) => (
                     <TableCell key={key}>{header}</TableCell>
                     
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {people.map((person, key) => (
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