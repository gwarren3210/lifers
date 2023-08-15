import supabase from '../../supabase';

export async function login(email, password){
   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
   if (error){ 
      alert('Error logging in user!')
      console.error('Error logging in user:', error.message);
      return null;
   }
   console.log("Login data:", data);
   return data.user;
}

export async function signup(email, password){
   const { data, error } = await supabase.auth.signUp({ email, password });
   if (error){
      alert('Error signing up user!')
      console.error('Error signing up user:', error.message);
      return null;
   }
   console.log("Signup data:",data);
   return data;
}

/*
export async function logout(){
   const { error } = await supabase.auth.signOut();
   if (error) {
      alert('Error logging out user!', error.message)
      console.error('Error logging out user:', error.message);
   }
}

export async function resetPassword(email){
   try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) throw error
   } catch (error) {
      alert('Error resetting password!')
      console.error('Error resetting password:', error.message);
   }
}

export async function updatePassword(email, password){
   try {
      const { error } = await supabase.auth.update({ email, password });
      if (error) throw error
   } catch (error) {
      alert('Error updating password!')
      console.error('Error updating password:', error.message);
   }
}

export async function updateEmail(email){
   try {
      const { error } = await supabase.auth.update({ email });
      if (error) throw error
   } catch (error) {
      alert('Error updating email!')
      console.error('Error updating email:', error.message);
   }
}

export async function deleteAccount(){
   try {
      const { error } = await supabase.auth.delete();
      if (error) throw error
   } catch (error) {
      alert('Error deleting account!')
      console.error('Error deleting account:', error.message);
   }
} */