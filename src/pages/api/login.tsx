/*
 * The login API handles user authentication.
*/

import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import fs from 'fs'
import path from 'path'

const MAX_LOGIN_ATTEMPTS = 2
const BLOCK_DURATION_SECONDS = 1800 // 30 minutes


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Destructuring username, password, and attempt from request body.
    const { username, password, attempt } = req.body
  
    // Accessing the JSON file containing the users.
    //const profiles = require("D:/SISACHU/projects/login-form-etc/src/tmp/admins.json");
    const profilesPath = path.join(process.cwd(), 'src/tmp/admins.json');
    const profilesData = fs.readFileSync(profilesPath, 'utf8');
    const profiles = JSON.parse(profilesData);
    // Finding the matching username and password the user inputted
    const user = profiles.find((user: { username: any; password: any; }) => user.username === username && user.password === password);
    
    try {
        // Accessing the cookie 'blockedUser' which contains usernames of
        // blocked users after 3 failed login attempts.
        const blockedUser = req.cookies.blockedUser || '';
        const blockedUserList = blockedUser.split(', ');

        // If the user is in the blockedUser list, they are not allowed to login.
        if (blockedUserList.includes(username)) {
            res.status(403).json({ message: 'User is blocked due to too many failed login attempts.' });
            return;
        }

        // If the username and password the user inputted doesn't match any existing user
        // in the JSON file..
        if (!user) {
            // For the user's first two failed login attempts, they will be prompted an
            // 'Invalid username or password.' message.
            if (attempt < MAX_LOGIN_ATTEMPTS) {
                return res.status(401).send({ message: 'Invalid username or password.' });
            } else if (attempt == MAX_LOGIN_ATTEMPTS) {
                // At the user's third attempt, their username will be added in the blockedUser cookie,
                blockedUserList.push(username);
                const updatedBlockedUser = blockedUserList.join(', ');
                res.setHeader('Set-Cookie', cookie.serialize('blockedUser', updatedBlockedUser, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: BLOCK_DURATION_SECONDS, // 30 minutes
                    path: '/',
                }));
                // and will be prompted an 'Invalid username or password.' message.
                return res.status(401).send({ message: 'Invalid username or password.' });
            } else if (attempt > MAX_LOGIN_ATTEMPTS) {
                // At the user's further attempts, they will be prompted a message:
                return res.status(403).send({ message: 'User is blocked due to too many failed login attempts.' });
            }
        } 
        
        // If the username and password the user inputted matche an existing user
        // in the JSON file, their username is set in the 'username' cookie.
        res.setHeader('Set-Cookie', [
            cookie.serialize('username', user.firstName, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600, // 1 hour
                path: '/',
            }),
            cookie.serialize('barangay', user.barangay, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600, // 1 hour
                path: '/',
            })
        ]);
        
        return res.status(200).send({ message: 'Login successful.' });   

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}