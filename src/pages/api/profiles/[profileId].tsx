/*
 * The [profileId] is an API endpoint for retrieving and creating user profiles.
*/

import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fs } from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Retrieving `profileId` from the request's query parameters.
    const { profileId } = req.query
    // Retrieving user profile fields from the request's body.
    const { id, username, password, confirmPassword, firstName, middleName, lastName, email, mobileNumber } = req.body
    const newProfile = {
        id,
        username,
        password,
        confirmPassword,
        firstName,
        middleName,
        lastName,
        email,
        mobileNumber
    }

    // Importing the 'fs' module to to read from and write 
    // to a JSON file that stores user profiles.
    const fs = require('fs');
    
    return new Promise<void>(async (resolve, reject) => {
        
        // if (req.method === 'GET') {
        //     // If the request method is GET, it reads the JSON file, 
        //     fs.readFile("D:/SISACHU/projects/login-form-etc/src/data/profiles.json", 'utf8', (err: any, data: any) => {
        //         if (err) {
        //             throw err;
        //         }
        //         // parses its content, and finds the profile that matches the `profileId`.
        //         const userData = JSON.parse(data);
        //         const profile = userData.find((profile: { username: string | string[] | undefined; }) => profile.username === profileId)
        //         res.status(200).json(profile)
        //     })
        // } else if (req.method === 'POST') {
        //     // If the request method is POST, it reads the JSON file, 
        //     fs.readFile("D:/SISACHU/projects/login-form-etc/src/data/profiles.json", 'utf8', (err: any, data: any) => {
        //         if (err) {
        //             throw err;
        //         }
        //         // parses its content, 
        //         const userData = JSON.parse(data);
        //         // adds the new profile (`newProfile`) to the user data,
        //         userData.push(newProfile);
        //         // converts the updated data back to JSON format, 
        //         const newDataFile = JSON.stringify(userData, null, 2);
        //         // and writes it back to the file.
        //         fs.writeFile("D:/SISACHU/projects/login-form-etc/src/data/profiles.json", newDataFile, (err: any) => {
        //             if (err) {
        //                 res.status(405).end();
        //                 resolve();
        //             } else {
        //                 res.status(200).json({ success: true });
        //             }
        //             });
        //     })
        // }
        if (req.method === 'GET') {
            try {
                const profilesPath = path.join(process.cwd(), 'src/data/profiles.json');
                const profilesData = await fs.readFile(profilesPath, 'utf8');
                const userData = JSON.parse(profilesData);
                const profile = userData.find((profile: { username: string | string[] | undefined; }) => profile.username === profileId);
                res.status(200).json(profile);
            } catch (error) {
                throw error;
            }
        } else if (req.method === 'POST') {
            try {
                const profilesPath = path.join(process.cwd(), 'src/data/profiles.json');
                const profilesData = await fs.readFile(profilesPath, 'utf8');
                const userData = JSON.parse(profilesData);
                userData.push(newProfile);
                const newDataFile = JSON.stringify(userData, null, 2);
                await fs.writeFile(profilesPath, newDataFile);
                res.status(200).json({ success: true });
            } catch (error) {
                res.status(405).end();
            }
        }
      });
}