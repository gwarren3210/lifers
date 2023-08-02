export async function login(email, password){
   try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error
      return user;
   } catch (error) {
      alert('Error logging in user!')
      console.error('Error logging in user:', error.message);
      return null;
   }
}

export async function signup(email, password){
   try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error
      console.log('createUser user: ', user);
      return user;
   } catch (error) {
      alert('Error signing up user!')
      console.error('Error signing up user:', error.message);
      return null;
   }
}

/*
export async function logout(){
   try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error
   } catch (error) {
      alert('Error logging out user!')
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