import supabase from '../../supabase';

let user = null;

export async function getUser(){
   console.log("Getting auth user from auth: ", user);
   if (user) return user;
   console.log("No user found, checking session...");
   /* const session = supabase.auth.session();
   console.log("Session: ", session);
   if (session?.user?.id) {
      console.log("Session user found: ", session.user);
      user = session.user;
      console.log("User set to: ", user);
      return session.user;
   } */
   return null;
}

export async function setUser(_user){
   console.log("Setting auth user: ", _user);
   user = _user;
   console.log("User set to: ", user);
   return user;
}

export async function login(email, password){
   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
   if (error){ 
      alert('Error logging in user!')
      console.error('Error logging in user:', error.message);
      return null;
   }
   console.log("Login data:", data);
   if (data.user) user = data.user;
   return data.user;
}

export async function signup(email, password){
   const { data, error } = await supabase.auth.signUp({ email, password });
   if (error){
      alert('Error signing up user!', error.message)
      console.error('Error signing up user:', error.message);
      return null;
   }
   console.log("Signup data:",data);
   if (data.user) user = data.user;
   return data.user;
}

/*
export async function logout(){
   const { error } = await supabase.auth.signOut();
   if (error) {
      alert('Error logging out user!', error.message)
      console.error('Error logging out user:', error.message);
   }
}
*/