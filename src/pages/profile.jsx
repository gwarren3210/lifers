'use client';
import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import Navbar from "@/cmp/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const profileCard = () => {
   return (
         <div className="max-w-sm rounded overflow-hidden shadow-lg m-4" >
            <img className="w-full h-64 object-cover" src="https://via.placeholder.com/200" />
            <div className="bg-white px-6 py-4 flex flex-row justify-between">
               <div >
                  <div className="font-bold text-xl ">
                     David Johnson
                  </div>
                  <div className="text-gray-700 text-base">
                     <p>Sofware Engineer - Google</p>
                     <p>San Francisco, CA</p>
                  </div>
               </div>
               <FontAwesomeIcon icon={faEdit} className='cursor-pointer hover:text-[#52796f]'/>
            </div>
         </div>
   );
};

const infoCard = (section, title, subtitle, dates) => {
   return (
      <div className='m-4 bg-white rounded-lg overflow-hidden py-2 shadow-lg'>
         <p className='text-xl font-bold text-left px-4'>{section}</p>
         <div className='flex-no-shrink flex flex-row px-4 rounded overflow-hidden w-600'>
            <div className='mr-7'>
               <img src="https://via.placeholder.com/50" alt="" />
            </div>
            <div>
               <p className='font-bold'>{title}</p>
               <p>{subtitle}</p>
               <p className='text-sm'>{dates}</p>
            </div>
         </div>
      </div>
   );
};

export default function Profile() {
   return (
      <div className=''>
         <Navbar key='profile'/>
         <main className="bg-var(--background-start-rgb) flex min-h-screen flex-col items-center p-24">
            <div className='flex flex-row w-3/4 justify-center grow-0'>
               {profileCard()}
               <div>
                  {infoCard("Education", "University of Massachusetts Amherst", "BS Computer Science", "2015 - 2019")}
                  {infoCard("Experience", "Software Engineer", "Google", "2019 - Present")}
                  {infoCard("Location", "San Francisco", "California", "2019 - Present")}
                  {infoCard("Other", "Birthday", "Jan 5th, 1995", "28 yrs old")}
                  <div className='flex flex-row justify-center m-4 bg-white rounded-lg overflow-hidden py-2 shadow-lg'>
                     {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((header, key) => (
                           <p className='text-xl text-center mx-3'>{header}</p>
                     ))}
                  </div>
                  <img src="https://via.placeholder.com/500" alt="" />
               </div>
            </div>
         </main>
      </div>
   );
};