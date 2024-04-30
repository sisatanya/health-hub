/*
 * Contact is a component for rendering the contact page
 * which navigation links based on the user's login status.
*/

import React from 'react'
import { useUser } from '../hooks/useUser'
import { Stack } from '@mui/material'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Logout = dynamic(() => import('../components/LogOut')) 


const Contact = () => {
  // user and isLoggedIn values are returned from the useUser hook.
  const { user, isLoggedIn } = useUser()

  return (
      <div className='wrapper'>
      <div className='form-wrapper'>

      <Stack justifyContent="center" alignItems="center" spacing={2.5}>
        {/* In the contact page, there is a navigation link to the home page, */}
        <Link href='/home'>Home</Link>
        {/* and depending on the user's login status, */}
        {isLoggedIn ? (
          // a navigation link to the user's profile and the logout component is available
          // if the user is logged in
          <>
            <Link href={`/profile/${user}`}>
              Profile
            </Link>
            <Logout />
          </>
        ) : (
          // and a login link is available if the user is not logged in.
          <Link href='/login'>Login</Link>
        )}
      </Stack>
      
      </div>
      </div>
  );
}

export default Contact;