import 'tailwindcss/tailwind.css';
import '@/app/globals.css'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Profile from './profile-view' ;

export default async function ProfilePage() {
   const supabase = createServerComponentClient({ cookies })

   const {
     data: { session },
   } = await supabase.auth.getSession()

   return <Profile session={session} />
};