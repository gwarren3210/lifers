'use client';
import 'tailwindcss/tailwind.css';
import '@/app/globals.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBell, faPlus  } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import Link from 'next/link';
import Button from '@mui/material/Button';
import FormDialog from '@/cmp/newGroupDialog';
import groupsData from '@/data/groups.json';
import { getGroups } from '@/server/groups';
import Table from '@/cmp/table';

const CustomSwitch = (props) => {
   return (
      <div className="flex flex-row">
         <Switch />
         <FontAwesomeIcon icon={props.icon} className='mt-3'/>
      </div>
   );
};

const groupCard = ( group, func ) => {
   return (
         <div key={group.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4" >
            <img className="w-full h-64 object-cover" src={"https://via.placeholder.com/150"} alt={group.name} />
            <div className="bg-white px-6 py-4 flex flex-row justify-between">
               <div >
                  <button className="font-bold text-xl mb-2 hover:text-[#52796f]" onClick={() => func(group.id)}>
                     {group.name}
                  </button>
                  <p className="text-gray-700 text-base">
                     {group.description}
                  </p>
               </div>
               <div className='flex flex-col'>
                     <CustomSwitch icon={faBell}/>
                     <CustomSwitch icon={faShare}/>
               </div>
            </div>
         </div>
   );
};

export default function Groups(props) {
   const { members, isLoading, groups, getTable, setIsProfile } = props
   const [isMemebers, setIsMembers] = useState(false)

   useEffect (() => {
      if (!groups && !isLoading) {
         alert('Error loading user data!')
      }
   }, [groups, isLoading])

   const handleGroupClick = (group_id) => {
      getTable(group_id)
      setIsMembers(true)
   }

   return (
      <div className='p-4'>
         <div className='flex flex-row justify-end mx-20'>
            <FormDialog /> 
            <Button
               variant='contained'
               className='bg-[#52796f] text-white'
               onClick={() => setIsProfile(true)}
            >
               Back
            </Button>
         </div>
            {isLoading
               ? <p>Loading...</p>
               : isMemebers
                  ? <Table people={members} toTable={()=> setIsMembers()} className='bg-red-300' />
                  : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                     {groups?.map((group) => groupCard(group, handleGroupClick))}
                  </div>
            }
         
      </div>
   );
};