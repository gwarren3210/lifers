'use client';
import 'tailwindcss/tailwind.css';
import '@/app/globals.css'
import Navbar from "@/cmp/navbar";
import ProfileCard from '../../cmp/profileCard';
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import InfoCard from '../../cmp/infoCard';
import ProfileDialog from '../../cmp/editProfileDialog';
import Button from '@mui/material/Button';
import Liferss from '../liferss/page';
import { updateProfile, getProfile } from '@/server/profile.js';
import { getGroups } from '@/server/groups.js'
import { getCards } from '@/server/infoCards'
import { useRouter } from 'next/navigation'

export default function Profile({ session }) {
   const supabase = createClientComponentClient()
   const user = session?.user
   const router = useRouter()
   if (!user) router.push('/')
   const [loading, setLoading] = useState(true)
   const [cardsLoading, setCardsLoading] = useState(true)
   const [firstName, setFirstName] = useState(null)
   const [lastName, setLastName] = useState(null)
   const [username, setUsername] = useState(null)
   const [isProfile, setIsProfile] = useState(true)
   const [groups, setGroups] = useState(null)
   const [cards, setCards] = useState(null)

   useEffect(() => {
      const getData = async () => {      
         setLoading(true)
         const data = await getProfile(user);
         if (data) {
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setUsername(data.username)
         }
         setLoading(false)
      }
      getData()
   }, [user])

   useEffect(() => {
      const getCardsData = async () => {      
         setCardsLoading(true)
         const data = await getCards(user);
         if (data) {
            setCards(data)
         }
         setCardsLoading(false)
      }
      getCardsData()
      console.log("info cards: ", cards);
   }, [user])

   const handleUpdate = async (username, firstName, lastName) => {
      setLoading(true)
      const res = await updateProfile(user, username, firstName, lastName);
      if (res) {
         setFirstName(firstName)
         setLastName(lastName)
         setUsername(username)
      }
      setLoading(false)
   }

   const handleViewGroups = async () => {
      setLoading(true)
      const data = await getGroups(user)    
      if (data) {
         console.log('data', data)
         setIsProfile(false);
         setGroups(data)
      }
      setLoading(false)
      console.log('handleViewGroups')
   }
   return (
      <div className=''>
         <Navbar key='profile'/>
         <main className="bg-var(--background-start-rgb) flex min-h-screen flex-col items-center p-24">
            
            {isProfile
               ?  <div className='flex flex-row w-3/4 justify-center grow-0'>
               <div className=''>
                  {loading
                     ? <ProfileCard
                        firstName={"Loading"}
                        lastName={"Loading"}
                        username={"Loading"}
                     />
                     : <ProfileCard 
                        firstName={firstName}
                        lastName={lastName}
                        username={username}
                     />
                  }
                  <div className='flex justify-center'>
                     <ProfileDialog 
                        username={username}
                        updateProfile={handleUpdate}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                     />
                  </div>
                  <div className='flex justify-center my-3'>
                     <Button
                        className='bg-[#52796f]' 
                        variant='contained'
                        onClick={handleViewGroups}
                     >
                        View Groups
                     </Button>
                  </div>
                  <div className='flex justify-center'>
                     <ProfileDialog
                        username={username}
                        updateProfile={handleUpdate}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        isLoad={true}
                     />
                  </div>
               </div>
               <div>
                  {cardsLoading
                     ? <InfoCard section={"Loading"} title={"Loading"} subtitle={"Loading"} dates={"Loading"}/>
                     : <div> 
                        <InfoCard section={"Education"} cards={cards.education} />
                        <InfoCard section={"Experience"} cards={cards.experience} />
                        <InfoCard section={"Residence"} cards={cards.residence} />
                        <InfoCard section={"Custom"} cards={cards.cards} />
                     </div>
                  }
                  <div className='flex flex-row justify-center m-4 bg-white rounded-lg overflow-hidden py-2 shadow-lg'>
                     {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((header, key) => (
                           <p key={key} className='text-xl text-center mx-3'>{header}</p>
                     ))}
                  </div>
                  {/* <img src="https://via.placeholder.com/500" alt="" /> */}
               </div>
                  </div>
               :  <Liferss 
                     groups={groups}
                     user={user}
                     supabase={supabase}
                     loading={loading}
                     setLoading={setLoading}
                     setIsProfile={setIsProfile}
                  />
            }
         </main>
      </div>
   );
};