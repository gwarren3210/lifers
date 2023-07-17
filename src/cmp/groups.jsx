'use client';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBell, faPlus  } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';
import Link from 'next/link';
import FormDialog from '@/cmp/newGroupDialog';
import groupsData from '@/data/groups.json';
import { getGroups } from '@/server/groups';

const CustomSwitch = (props) => {
   return (
      <div className="flex flex-row">
         <Switch />
         <FontAwesomeIcon icon={props.icon} className='mt-3'/>
      </div>
   );
};

const groupCard = ( group, index, func ) => {
   return (
         <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4" >
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
   const [groups, setGroups] = useState(groupsData);
   return (
      <div className='p-4'>
         <div className='flex flex-row justify-end mx-20'>
            <FormDialog setGroups={setGroups}/> 
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.keys(groups).map((group, index) => {
               if (group === '') return
               return groupCard(groups[group], index, props.toggleFunc)
            })}
         </div>
      </div>
   );
};