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
import { getCards, appendEducationCard } from '@/server/infoCards'
import { useRouter } from 'next/navigation'
import supabase from '../../../supabase';
import { getUser } from '@/server/auth';
import { setStorage } from '@/server/localStorage';


export default function Profile({ session/*, user */ }) {
   /* console.log('profile-view user', user)
   console.log('profile-view user id ', user?.id)
   console.log('profile-view session', session)

   const router = useRouter()
   if (!user?.id) alert(`You must be logged in to view this page, user: ${user}`) */
   const [loading, setLoading] = useState(true)
   const [cardsLoading, setCardsLoading] = useState(true)
   const [firstName, setFirstName] = useState(null)
   const [lastName, setLastName] = useState(null)
   const [username, setUsername] = useState(null)
   const [isProfile, setIsProfile] = useState(true)
   const [groups, setGroups] = useState(null)
   const [cards, setCards] = useState(null)
   const [educationCards, setEducationCards] = useState(null)
   const [experienceCards, setExperienceCards] = useState(null)
   const [residenceCards, setResidenceCards] = useState(null)
   const [_user, setUser] = useState(null)

   useEffect(() => {
      const getAuthUser = async () => {
         const sessionUser = await getUser();
         if (sessionUser) {
            setStorage('user', sessionUser);
            setUser(sessionUser);
            return;
         }
         const storedUser = localStorage.getItem('user');
         if (!storedUser) {
            alert('You must be logged in to view this page')
            return;
            //router.push('/')
         }
         setUser(JSON.parse(sessionUser));
      }
      getAuthUser();
   }, [])

   useEffect(() => {
      const getProfileData = async () => {      
         setLoading(true)
         const data = await getProfile(_user);
         console.log('profile data', data)
         if (data) {
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setUsername(data.username)
         }
         setLoading(false)
      }
      if (_user) getProfileData()
   }, [_user])

   useEffect(() => {
      const getCardsData = async () => {      
         setCardsLoading(true)
         const data = await getCards(_user);
         if (data) {
            setCards(data)
            setEducationCards(data.education)
            setExperienceCards(data.experience)
            setResidenceCards(data.residence)
         }
         setCardsLoading(false)
      }
      if (_user) getCardsData()
   }, [_user])

   useEffect(() => {
      supabase.auth.onAuthStateChange( async (event, session) => {
         console.log('onAuthStateChange profile session', session)
         if (session?.user){
            const res = await setUser(session.user);
            console.log('onAuthStateChange profile res', res)
            console.log('user logged in profile ', session.user)
            //router.push('/profile')
         }
      })
   }, [])

   const handleUpdate = async (username, firstName, lastName) => {
      setLoading(true)
      const res = await updateProfile(_user, username, firstName, lastName);
      if (res) {
         setFirstName(firstName)
         setLastName(lastName)
         setUsername(username)
      }
      setLoading(false)
   }

   const handleViewGroups = async () => {
      setLoading(true)
      const data = await getGroups(_user)    
      if (data) {
         console.log('data', data)
         setIsProfile(false);
         setGroups(data)
      }
      setLoading(false)
      console.log('handleViewGroups')
   }

   const setSectionCards = (section, data) => {
      switch (section) {
         case "education":
            setEducationCards(data.education);
            break;
         case "experience":
            setExperienceCards(data.experience);
            break;
         case "residence":
            setResidenceCards(data.residence);
            break;
         default:
            break;
      }
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
                        <InfoCard 
                           user={_user}
                           sectionTitle={"Education"}
                           section={"education"}
                           cards={educationCards}
                           setSectionCards={setSectionCards}
                        />
                        <InfoCard
                           user={_user}
                           sectionTitle={"Experience"}
                           section={"experience"}
                           cards={experienceCards}
                           setSectionCards={setSectionCards}
                        />
                        <InfoCard
                           user={_user}
                           sectionTitle={"Residence"}
                           section={"residence"}
                           cards={residenceCards}
                           setSectionCards={setSectionCards}
                        />
                        {/* <InfoCard section={"Custom"} cards={cards.cards} /> */}
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
                     user={_user}
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