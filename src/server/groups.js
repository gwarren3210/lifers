import g from '../data/groups.json';
import supabase from '../../supabase';

let groups = {...g};
let idNum = 0;

export async function createGroup(name, description) {
   const { data, error } = await supabase
      .from('Groups').insert([
         { 
            name,
            description,
            members: ["davidthompson"]
         },
      ])
      .select()
   console.log("createGroup data: ", data)
   console.log("createGroup error: ", error)
   return getGroups();
}

export async function getGroups() {
   let dGroups = null;
   try {
      const { data, error } = await supabase
      .from('Groups')
      .select('*')
      dGroups = data;
      idNum = dGroups.length;
   } catch (error) {
      console.log("getGroups error: ", error)
   } finally {
      return dGroups;
   }
}