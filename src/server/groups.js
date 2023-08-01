import supabase from '../../supabase';

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

   // Create feedback message on success or failure
   console.log("createGroup data: ", data)
   console.log("createGroup error: ", error)
   return getGroups();
}

export async function getGroups(user) {
   let returnData = null;
   try {
      let { data, error, status } = await supabase
         .rpc('fetch_liferss_groups', { 
            profile_id: user.id
         })
      if (error && status !== 406) {
         throw error
      }
      returnData = data;
   } catch (error) {
      alert('Error loading group data!')
   } finally {
      return returnData;
   }
}

export async function getMembers (group_id) {
   let returnMembers = null;
   try {
      let { data, error, status } = await supabase
         .rpc('get_profiles_from_group', { 
            group_id: group_id
         })
      if (error && status !== 406) {
         throw error
      }
      if (data) {
         returnMembers = data
      }
   } catch (error) {
      alert('Error loading member data!')
   } finally {
      return returnMembers;
   }
}