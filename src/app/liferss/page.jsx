import 'tailwindcss/tailwind.css';
import '@/app/globals.css'
import Groups from "@/app/liferss/groups.jsx"
import { useState, useEffect, useCallback } from 'react'

export default function Liferss (props) {
   const {
      groups,
      user,
      supabase,
      loading,
      setLoading,
      setIsProfile
   } = props
   const [members, setMembers] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   const [testGroups, setTestGroups] = useState(null)

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

/*    const fetchGroups = async () => {
      try {
         let { data, error, status } = await supabase
            .rpc('fetch_liferss_groups', { 
               profile_id: user.id
            })
         console.log("getTestGroups data: ", data)
         console.log("getGroups error: ", error)
         console.log("getGroups status: ", status)
         if (error && status !== 406) {
            throw error
         }
         console.log("getGroups data: ", data)
      } catch (error) {
         console.log('Error loading group data: ', error.message)
         alert('Error loading group data!')
      } finally {
         console.log('fetchGroups finally')
      }
   } */

   useEffect(() => {
      //fetchGroups();
      console.log('groups', groups)
      console.log('loading', loading)
      console.log('members', members)
      console.log('isLoading', isLoading)
      console.log('user', user.id)
   }, [groups, loading, members, isLoading])
   return <Groups 
            user={user}
            supabase={supabase}
            groups={groups}
            setIsProfile={setIsProfile}
            isLoading={isLoading}
            loading={loading}
            getTable={getTable}
            members={members}
         />
}