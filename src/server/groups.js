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
      console.log("getGroups data: ", data)
      console.log("getGroups error: ", error)
      console.log("getGroups status: ", status)
      if (error && status !== 406) {
         throw error
      }
      returnData = data;
      console.log("getGroups data: ", data)
   } catch (error) {
      console.log('Error loading group data: ', error.message)
      alert('Error loading group data!')
   } finally {
      return returnData;
   }
}