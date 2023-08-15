import { useState } from 'react';
import {TextField, Button } from '@mui/material';
//import { createUser } from '@/server/users';
import supabase from '../../supabase';
import AuthForm from '@/cmp/auth-form';
import { login, signup } from '@/server/auth';
import { Paper } from '@mui/material';

export default function LandingPage() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false); // TODO: add loading spinner
   const [emailError, setEmailError] = useState(false);
   const [passwordError, setPasswordError] = useState(false);
   const [signedIn, setSignedIn] = useState(false);
   const [loggingIn, setLoggingIn] = useState(false);

   const handleEmailChange = (event) => {
      const enteredEmail = event.target.value;
      setEmail(enteredEmail);
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailRegex.test(enteredEmail));
    };

   const handlePasswordChange = (event) => {
      const enteredPassword = event.target.value;
      setPassword(enteredPassword);

      // Validate password format
      setPasswordError(enteredPassword.length < 6);
   };
   
   const createUser = async () => {
      if (emailError) {
         alert('Please enter a valid email address');
         return;
      }
      if (passwordError) {
         alert('Please enter a valid password');
         return;
      }
      const user = await signup(email, password)
      if (user) setSignedIn(true)
      else alert('Error creating user');
      return user;
   };

   const loginUser = async () => {
      if (emailError) {
         alert('Please enter a valid email address');
         return;
      }
      if (passwordError) {
         alert('Please enter a valid password');
         return;
      }
      const user = await login(email, password)
      if (user){
         router.push('/profile')
      }
      else alert('Error logging in user');
      return user;
   };

   const handlePasswordReset = async () => {
      try {
         const { error } = await supabase.auth.api.resetPasswordForEmail(email);
         if (error) {
            console.error('Error sending password reset email:', error);
            return null;
         }
         alert('Password reset email sent!');
      } catch (error) {
         console.error('Error sending password reset email:', error);
         return null;
      }
   };

   return (
      <div>
         <h1 className='text-4xl text-center font-bold'>Welcome to Lifers</h1>
         <h2 className='text-2xl text-center font-bold'>A place to connect with your fellow alumni</h2>
         <AuthForm />
         {/* !signedIn && */
            <Paper className='px-8 py-1 rounded-2xl' elevation={3}>
               <div className='flex flex-col justify-center gap-7 my-8'>
                  <TextField 
                     autoFocus
                     margin="dense"
                     id="name"
                     label="Email"
                     type="email"
                     variant="standard"
                     fullWidth
                     required
                     onChange={handleEmailChange}
                     error={emailError}
                  />
                  <TextField 
                     autoFocus
                     margin="dense"
                     id="name"
                     label="Password"
                     variant="standard"
                     type="password"
                     fullWidth
                     required
                     onChange={handlePasswordChange}
                     error={passwordError}
                  />
                     <Button 
                        className='rounded-full px-3 py-2 mt-5'
                        onClick={loggingIn ? loginUser: createUser}
                        disabled={loading}
                        variant='outlined'
                     >
                        {loggingIn ? "Log in" : "Get started"}
                     </Button>
                     <div className=''>
                        {loggingIn &&
                           <p className='text-center'>
                              <button className='text-[#52796f] hover:text-[#84a98c] text-center' onClick={handlePasswordReset} >
                                 Forgot password?
                              </button>
                           </p>
                        }  
                        <p className='text-center'>
                           {!loggingIn? "Already" : "Don't"} have an account?&nbsp;
                           <button className='text-[#52796f] hover:text-[#84a98c]' onClick={() => setLoggingIn(!loggingIn)} >
                              {!loggingIn ? "Log in" : "Sign up"}
                           </button>
                        </p>
                     </div>
               </div>
            </Paper>
         }
      </div>
   );
};