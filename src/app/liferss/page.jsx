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
      setIsProfile
   } = props
   
   return <Groups 
            user={user}
            supabase={supabase}
            groups={groups}
            setIsProfile={setIsProfile}
            loading={loading}
         />
}