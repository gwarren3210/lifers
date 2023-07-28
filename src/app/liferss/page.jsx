import 'tailwindcss/tailwind.css';
import '@/app/globals.css'
import Groups from "@/app/liferss/groups.jsx"
import { useState, useEffect, useCallback } from 'react'

export default function Liferss (props) {
   const { user, supabase, setIsProfile } = props
   const [groups, setGroups] = useState(null)
   const [members, setMembers] = useState(null)
   const [isLoading, setIsLoading] = useState(true)

   console.log('Liferss user', user)
   const getLiferrsGroups = useCallback(async () => {
      try {
         setIsLoading(true)
 
         let { data, error, status } = await supabase
            .rpc('fetch_liferss_groups', { 
               profile_id: '693d1f11-c05d-40e9-8475-ffeef1be82ad' 
            })
         if (error && status !== 406) {
            throw error
         }
 
         if (data) {
            setGroups(data)
         }
      } catch (error) {
         alert('Error loading user data!')
      } finally {
       setIsLoading(false)
      }
   }, [user, supabase])

   useEffect(() => {
       getLiferrsGroups()
   }, [])

   const getTable = useCallback(async (group_id) => {
      try {
         setIsLoading(true)
         let { data, error, status } = await supabase
            .rpc('get_profiles_from_group', { 
               group_id: group_id
            })
         if (error && status !== 406) {
            throw error
         }
         if (data) {
            setMembers(data)
         }
      } catch (error) {
         alert('Error loading member data!')
      } finally {
         setIsLoading(false)
      }
   }, [])

   return <Groups 
            user={user}
            groups={groups}
            setIsProfile={setIsProfile}
            isLoading={isLoading}
            getTable={getTable}
            members={members}
         />
}