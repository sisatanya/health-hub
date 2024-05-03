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
    const { id, username, firstName, middleName, lastName, email, address, mobileNumber, sex, birthday, religion } = req.body
    const newProfile = {
        id,
        username,
        firstName,
        middleName,
        lastName,
        email,
        address,
        mobileNumber,
        sex,
        birthday,
        religion
    }

    // Importing the 'fs' module to to read from and write 
    // to a JSON file that stores user profiles.
    const fs = require('fs');
    
    return new Promise<void>(async (resolve, reject) => {
        
        if (req.method === 'GET') {
            try {
                const profilesPath = path.join(process.cwd(), 'src/tmp/profiles.json');
                const profilesData = await fs.readFile(profilesPath, 'utf8');
                const userData = JSON.parse(profilesData);
                const profile = userData.find((profile: { username: string | string[] | undefined; }) => profile.username === profileId);
                res.status(200).json(profile);
            } catch (error) {
                throw error;
            }
        } else if (req.method === 'POST') {
            try {
                const profilesPath = path.join(process.cwd(), 'src/tmp/profiles.json');
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