'use client';
import 'tailwindcss/tailwind.css';
import '@/app/globals.css'
import { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBell, faPlus  } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import FormDialog from '@/cmp/newGroupDialog';
import PeopleTable from '@/cmp/table';
import { getMembers } from '@/server/groups';

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
   const {   
      groups, 
      handleGetGroups,
      setIsProfile,
      user,
      supabase
   } = props
   const [isMembers, setIsMembers] = useState(false)

   const [members, setMembers] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   
   const getTable = useCallback(async (group_id) => {
         setIsLoading(true)
         const data = await getMembers(group_id)
         if (data) setMembers(data)
         setIsLoading(false)
   }, [])

   useEffect (() => {
      if (!groups && !isLoading) {
         alert('Error loading user data!')
      }
   }, [groups, isLoading])

   const handleGroupClick = (group_id) => {
      getTable(group_id)
      setIsMembers(true)
   }

   const page = () => {
      if (isLoading) return <p>Loading...</p>
      else if (isMembers) return <PeopleTable people={members} toTable={()=> setIsMembers()} className='' />
      else if (!groups) return <p>You are not a member of any groups</p>
      else if (groups.length === 0) return <p>You are not a member of any groups</p>
      else return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
               {groups?.map((group) => groupCard(group, handleGroupClick))}
            </div>
   }

   return (
      <div className='p-4'>
         <div className='flex flex-row justify-end mx-20'>
            <FormDialog user={user} supabase={supabase} /> 
            <Button
               variant='contained'
               className='bg-[#52796f] text-white'
               onClick={() => setIsProfile(true)}
            >
               Back
            </Button>
         </div>
            {page()}
      </div>
   );
};