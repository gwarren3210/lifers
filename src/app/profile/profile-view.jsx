'use client';
import 'tailwindcss/tailwind.css';
import '@/app/globals.css'
import Navbar from "@/cmp/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ProfileCard from '../../cmp/profileCard';
import infoCard from '../../cmp/infoCard';
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import InfoCard from '../../cmp/infoCard';
import ProfileDialog from '../../cmp/editProfileDialog';
import Button from '@mui/material/Button';
import Liferss from '../liferss/page';

export default function Profile({ session }) {
   const supabase = createClientComponentClient()
   const [loading, setLoading] = useState(true)
   const [firstName, setFirstName] = useState(null)
   const [lastName, setLastName] = useState(null)
   const [username, setUsername] = useState(null)
   const [isProfile, setIsProfile] = useState(true)

   const user = session?.user
   /* const navigate = useNavigate();
   useEffect(() => {
      if (!user){
         // redirect to '/auth/signout'
         navigate('/auth/signout');
      }
   }, [user, navigate]) */

   const getProfile = useCallback(async () => {
      try {
         setLoading(true)
 
         let { data, error, status } = await supabase
            .from('profiles')
            .select(`first_name, last_name, username`)
            .eq('id', user?.id)
            .single()
         if (error && status !== 406) {
            throw error
         }
 
         if (data) {
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setUsername(data.username)
         }
      } catch (error) {
       //alert('Error loading user data!')
      } finally {
       setLoading(false)
      }
   }, [user, supabase])
 
   useEffect(() => {
     getProfile()
   }, [user, getProfile])
 
   async function updateProfile(username, first_name, last_name ) {
      console.log("Username", username)
      console.log("Name", first_name, last_name)
      try {
       let { error } = await supabase.from('profiles').upsert({
         id: user.id,
         username,
         first_name,
         last_name,
         updated_at: new Date().toISOString(),
       }).select()
       if (error) throw error
       alert('Profile updated!')
     } catch (error) {
       alert('Error updating the data!')
     } finally {
       setLoading(false)
     }
   }

   const handleUpdate = (username, firstName, lastName) => {
      updateProfile(username, firstName, lastName);
   }

   const handleViewGroups = () => {
      setIsProfile(false);
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
                     <ProfileDialog username={username} updateProfile={handleUpdate} setFirstName={setFirstName} setLastName={setLastName} />
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
               </div>
               <div>
                  <InfoCard section={"Education"} title={"University of Massachusetts Amherst"} subtitle={"BS Computer Science"} dates={"2015 - 2019"}/>
                  <InfoCard section={"Experience"} title={"Software Engineer"} subtitle={"Google"} dates={"2019 - Present"}/>
                  <InfoCard section={"Location"} title={"San Francisco"} subtitle={"California"} dates={"2019 - Present"}/>
                  <InfoCard section={"Other"} title={"Birthday"} subtitle={"Jan 5th, 1995"} dates={"28 yrs old"}/>
                  <div className='flex flex-row justify-center m-4 bg-white rounded-lg overflow-hidden py-2 shadow-lg'>
                     {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((header, key) => (
                           <p className='text-xl text-center mx-3'>{header}</p>
                     ))}
                  </div>
                  <img src="https://via.placeholder.com/500" alt="" />
               </div>
                  </div>
               : <Liferss user={user} supabase={supabase} setIsProfile={setIsProfile} />
            }
         </main>
      </div>
   );
};