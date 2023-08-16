import 'tailwindcss/tailwind.css';
import '@/app/globals.css'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Profile from './profile-view' ;
import { getUser } from '@/server/auth';

export default async function ProfilePage() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user =  await getUser();

  console.log('profile page user', user)
  return <Profile session={session} user={user} />
};