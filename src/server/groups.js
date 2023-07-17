import g from '../data/groups.json';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://esrodeumkeukhwzrmftd.supabase.co'
//const supabaseKey = process.env.SUPABASE_KEY
//const supabase = createClient(supabaseUrl, supabaseKey)

let groups = {...g};

export async function createGroup(name, description) {
   const newGroup = {
      name,
      "id": "s",
      "people": ["davidthompson"],
      description
   }
   let newGroups = {...groups}
   newGroups[name] = newGroup;
   groups = newGroups;
   return newGroups;
}