/*
 * The logout API handles the logout functionality.
*/

import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // To log out the user, the 'username' cookie is removed..
    res.setHeader('Set-Cookie', [
        cookie.serialize('username', "", {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600, // 1 hour
            path: '/',
        }),
        cookie.serialize('barangay', "", {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600, // 1 hour
            path: '/',
        })
    ]);

    // ..and the user is redirected back to the login page.
    res.writeHead(302, { Location: '/login' })
    res.end()
}