/*
 * usePageAccess is a custom hook to manage access for public- or private-only pages.
 * It takes a requiredAccess parameter: public or private.
*/

import { PageAccess } from '@/hooks/PageAccess'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import cookie from 'cookie'
import Swal from 'sweetalert2'


const usePageAccess = (requiredAccess: PageAccess): boolean => {
  const router = useRouter()
  const { profileId } = router.query

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Retrieving the cookie 'username'.
    const cookies = cookie.parse(document.cookie);
    const username = cookies.username || '';

    // Using the cookie 'username' to create conditions for page access.
    if (requiredAccess === PageAccess.Public && username) {
      // When a logged in user tries to access a public-only page,
      // the user is redirected to their own profile.
      //router.replace(`/profile/${username}`)
    } 
    else if (requiredAccess === PageAccess.Private && !username) {
      // When the user is NOT logged in and they try to access a private-only page,
      // the user is redirected to the login page.
      Swal.fire(
        'You are not logged in.',
        'Log in to access this page.',
        'warning'
      )
      router.replace('/login');
    } 
    // else if (requiredAccess === PageAccess.Private && (username !== profileId)) {
    //   // When a logged in user is trying to access another user's profile,
    //   // they are redirected to their own profile.
      // Swal.fire(
      //   'This is not your profile',
      //   'You can only access your own profile page.',
      //   'warning'
      // )
    //   router.replace(`/profile/${username}`)
    // }
  }, [router, requiredAccess, profileId]);

  return typeof window !== 'undefined' && Boolean(cookie.parse(document.cookie).username);
};
  
export default usePageAccess;