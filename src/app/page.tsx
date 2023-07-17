'use client';
import { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LifersTable from '../cmp/table'
import Groups from '../cmp/groups'
import Navbar from '../cmp/navbar'
import people from '../data/people.json'
import groups from '../data/groups.json'

const theme = createTheme({
  palette: {
    primary: {
      main: '#52796f',
    },
    secondary: {
      main: '#84a98c',
    },
  },
});

export default function Home() {
  const [table, setTable] = useState<string>('');
  const toggleTable = (t: string) => setTable(t);
  let tablePeople = people.filter(p => groups[table as keyof typeof groups].people.includes(p.username));

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar key='home' toggleFunc={toggleTable}/>
        <main className="flex min-h-screen flex-col items-center p-24">
          {table !== '' 
          ? <LifersTable toggleFunc={toggleTable} people={tablePeople} /> 
          : <Groups toggleFunc={toggleTable} groups={groups} />
          }
        </main>
      </ThemeProvider>
    </div>
  )
}