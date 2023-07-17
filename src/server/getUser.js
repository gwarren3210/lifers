
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

export default async function getUser() {
   const { data, error } = await supabase
  .from('countries')
  .select()
   return 
}