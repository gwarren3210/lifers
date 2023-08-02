'use client';
import Link from "next/link";
const NavItem = ({title, classProps }) => {
   return (
      <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
   )
}

export default function Navbar() {
   return (
      <nav className='bg-white z-10 w-full flex md:justify-center justify-between items-center p-4 shadow-lg fixed top-0 '>
         <div className='md:flex-[0.5] flex-initial justify-center items-center'>
            <img src={'logo'} alt='logo' className='w-32 cursor-pointer' />
         </div>
         <ul className='text-black md:flex hidden list-none flex-row justify-between items-center flex-initial'>
            {['Home', 'Nav2', 'Nav3', 'Nav4'].map((item, index) => (
               <Link href='/' key={index} >
                  <NavItem onClick={()=>console.log("Navbar Clicked")} title={item} key={item + index} classProps='hover:text-[#52796f]'/>
               </Link>
            ))}
            <li className='w-10 h-10 rounded-full overflow-hidden'>
               <Link href='/profile'>
                  <img 
                     src={'https://via.placeholder.com/24'} 
                     className='cursor-pointer object-cover w-full h-full'
                  />
               </Link>
            </li>
         </ul>
      </nav>
   );
};