import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const supabase = createClientComponentClient()

export async function updateProfile(user, username, first_name, last_name ) {
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
      return true
   } catch (error) {
      console.log('Error updating the data: ', error.message)
      alert('Error updating the data!')
      return false
   } finally {
   }
}

export async function getProfile(user) {
   try {
      let { data, error } = await supabase
         .from('profiles')
         .select('first_name, last_name, username').
         eq('id', user.id)
         .single()
      if (error) throw error
      return data
   } catch (error) {
      console.log('Error retrieveing user data: ', error.message)
   } finally {
   }
}