// TODO check file unneccesarry

import { supabase } from '../../supabase'

export async function getUser() {
   return 
}

export async function createUser(email, password) {
   try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error('Error creating user:', error);
        return null;
      }
      console.log('createUser user:', user);
      return user;
   } catch (error) {
      console.error('Error creating user:', error);
      return null;
   }
}