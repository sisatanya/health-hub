/*
 * LogOut is a component for the logout functionality.
*/


import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../hooks/useUser'
import axios from 'axios'
import Swal from 'sweetalert2'
import Link from 'next/link'


function Logout() {
    const router = useRouter()
    const { mutate } = useUser();

    // When the user clicks logout,
    const handleLogout = useCallback(async () => {
        // a POST request is sent to the logout API endpoint
        axios.post('/api/logout')
            .then(response => {
                if (response.status === 200) {
                    console.log('You are logged out.')
                    // and prompts the user a 'Logout successful' message.
                    Swal.fire(
                        'Goodbye',
                        'Logout successful.',
                        'success'
                    )
                    // The useris then redirected to the login page.
                    router.push('/login')
                } else {
                    console.error('Failed to log out')
                }
            })

        mutate(null);
        // mutate triggers a re-fetch of the user information in the useUser hook
        // making sure that user data is updated after logging out.
        
    }, [router, mutate])

    return (
        <Link 
            href='/login'
            onClick={handleLogout}
            type='submit'
        >
            ABOUT
        </Link>
    )
}

export default Logout