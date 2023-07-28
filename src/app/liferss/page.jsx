import 'tailwindcss/tailwind.css';
import '@/app/globals.css'
import Groups from "@/app/liferss/groups.jsx"
import { useState, useEffect, useCallback } from 'react'

export default function Liferss (props) {
   const { user, supabase, setIsProfile } = props
   const [groups, setGroups] = useState(null)
   const [loading, setLoading] = useState(true)

   console.log('Liferss user', user)
   const getTable = useCallback(async () => {
      try {
         setLoading(true)
 
         let { data, error, status } = await supabase
            .rpc('fetch_liferss_groups', { 
               profile_id: '693d1f11-c05d-40e9-8475-ffeef1be82ad' 
            })
         if (error && status !== 406) {
            throw error
         }
 
         if (data) {
            console.log('table data ', data)
            setGroups(data)
         }
      } catch (error) {
         alert('Error loading user data!')
      } finally {
       setLoading(false)
      }
   }, [user, supabase])

   useEffect(() => {
       getTable()
   }, [])
   return <Groups user={user} groups={groups} setIsProfile={setIsProfile} />
}