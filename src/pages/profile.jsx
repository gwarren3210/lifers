'use client';
import 'tailwindcss/tailwind.css';
import Navbar from "@/cmp/navbar";
export default function Profile() {
   return (
      <div>
         <Navbar key='profile' className='flex flex-row list-none'/>
         <p>Hi, I'm the profile page</p>
      </div>
   );
};