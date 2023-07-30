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
   /* return { data: [ { name: "Test Group", description: "Test Description", members: ["davidthompson"] } ]
   } */
   let returnData = null;
   try {
      let { data, error, status } = await supabase
         .rpc('fetch_liferss_groups', { 
            profile_id: user.id
         })
      if (data) {
         console.log("getGroups data: ", data)
      }
      if (error && status !== 406) {
         throw error
      }
      returnData = data;
   } catch (error) {
      console.log('Error loading group data: ', error.message)
      alert('Error loading group data!')
   } finally {
      return returnData;
   }
}