const NavItem = ({title, classProps }) => {
   return (
      <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
   )
}

export default function Navbar(props) {
   return (
      <nav className='z-99 w-full flex md:justify-center justify-between items-center p-4 shadow-lg fixed top-0 '>
         <div className='md:flex-[0.5] flex-initial justify-center items-center'>
            <img src={'logo'} alt='logo' className='w-32 cursor-pointer' />
         </div>
         <ul className='text-black md:flex hidden list-none flex-row justify-between items-center flex-initial'>
            {['Nav1', 'Nav2', 'Nav3', 'Nav4'].map((item, index) => (
               <NavItem title={item} key={item + index} classProps='hover:text-[#52796f]'/>
            ))}
            <li className='text-white bg-[#52796f] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#84a98c]'>
               Button
            </li>
         </ul>
      </nav>
   );
};