'use client';
import { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LifersTable from '../cmp/table'
import Groups from '../cmp/groups'
import Navbar from '../cmp/navbar'
import LandingPage from '../cmp/landingPage'
import people from '../data/people.json'
import groups from '../data/groups.json'
import { getGroups } from '@/server/groups';

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
  const [table, setTable] = useState<number>(-1);
  const toggleTable = (t: number) => setTable(t);
  const [tablePeople, setTablePeople] = useState<any[]>([]);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar key='home' toggleFunc={toggleTable}/>
        <main className="flex min-h-screen flex-col items-center p-24">
          {/* table !== -1
          ? <LifersTable toggleFunc={toggleTable} people={tablePeople} /> 
          : <Groups toggleFunc={toggleTable} groups={groups} />
           */}
           <LandingPage />
        </main>
      </ThemeProvider>
    </div>
  )
}