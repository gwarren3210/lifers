'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBell } from '@fortawesome/free-solid-svg-icons';
import groups from '../data/groups.json'
import Switch from '@mui/material/Switch';

const CustomSwitch = (props) => {
   return (
      <div className="flex flex-row">
         <Switch />
         <FontAwesomeIcon icon={props.icon} className='mt-3'/>
      </div>
   );
};

const handleClick = () => console.log("Clicked");
   

const groupCard = ( group, index ) => {
   return (
         <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" >
            <img className="w-full h-64 object-cover" src={"https://via.placeholder.com/150"} alt={group.name} />
            <div className="bg-white px-6 py-4 flex flex-row justify-between">
               <div >
                  <button className="font-bold text-xl mb-2 hover:text-[#52796f]" onClick={handleClick}>
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
   return (
      <div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {groups.map((item, index) => (
               groupCard(item, index)
            ))}
         </div>
      </div>
   );
};