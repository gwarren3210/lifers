'use client';
import { useEffect, useState } from 'react'
import LifersTable from '../cmp/table'
import Groups from '../cmp/groups'
import Navbar from '../cmp/navbar'
import people from '../data/people.json'
import groups from '../data/groups.json'

function renderTableComponent(table: string, toggleTable: (t: string) => void, groups: any, tablePeople: any) {
  switch (table) {
    case '':
      return <Groups toggleFunc={toggleTable} groups={groups} />;
    case 'profile':
      return <Profile />;
    default:
      return <LifersTable toggleFunc={toggleTable} people={tablePeople} />;
  }
}


export default function Home() {
  const [table, setTable] = useState<string>('');
  const toggleTable = (t: string) => setTable(t);
  const hs = 'highschool'
  useEffect(() => {
    console.log('isTable', table === hs);
  }, [table]);
  let tablePeople = people.filter(p => groups[table as keyof typeof groups].people.includes(p.username));
  const tableComponent = renderTableComponent(table, toggleTable, groups, tablePeople);

  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center p-24">
        {/* table !== '' 
        ? <LifersTable toggleFunc={toggleTable} people={tablePeople} /> 
        : <Groups toggleFunc={toggleTable} groups={groups} />
         */}
        {tableComponent}
      </main>
    </div>
  )
}