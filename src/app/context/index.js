"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import supabase from "../../../supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({children, switchTheme }) => {
   const [user, setUser] = useState(false);

   const onAuthStateChange = async () => {
      try {
         const { data: { user } } = await supabase.auth.getUser();
         if (user) {
            setUser(user);
            console.log(user);
         }
      } catch (error) {
         console.log(error);
      } finally {
      }
   };
 
   useEffect(() => {
     onAuthStateChange();
   }, []);

   const value = useMemo(() => {
      return {
         user,
         signOut: () => supabase.auth.signOut(),
      };
   }, [user]);

   return (
      <AuthContext.Provider value={value}>
         <Header switchTheme={switchTheme} />
         {user ? children : <LandingPage />}
      </AuthContext.Provider>
   );
};

export const useAuthContext = () => {
   const { user, signOut } = useContext(AuthContext);
   return { user, signOut };
};