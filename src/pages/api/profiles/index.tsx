/*
 * profiles/index is an API endpoint for retrieving and creating user profiles.
*/

import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Retrieving user profile fields from the request's body.
    const { username, password, confirmPassword, firstName, middleName, lastName, email, mobileNumber } = req.body
    const newProfile = {
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
    
    return new Promise<void>((resolve, reject) => {
        if (req.method === 'GET') {
            // If the request method is GET, it reads the JSON file, 
            fs.readFile("D:/SISACHU/projects/login-form-etc/src/data/profiles.json", 'utf8', (err: any, data: any) => {
                if (err) {
                    throw err;
                }
                // parses its content..
                const userData = JSON.parse(data);
                res.status(200).json(userData)
            })
        } else if (req.method === 'POST') {
            // If the request method is POST, it reads the JSON file, 
            fs.readFile("D:/SISACHU/projects/login-form-etc/src/data/profiles.json", 'utf8', (err: any, data: any) => {
                if (err) {
                    throw err;
                }
                // parses its content, 
                const userData = JSON.parse(data);
                // adds the new profile (`newProfile`) to the user data,
                userData.push(newProfile);
                // converts the updated data back to JSON format, 
                const newDataFile = JSON.stringify(userData, null, 2);
                // and writes it back to the file.
                fs.writeFile("D:/SISACHU/projects/login-form-etc/src/data/profiles.json", newDataFile, (err: any) => {
                    if (err) {
                        console.error(err);
                        res.status(405).end();
                        resolve();
                    } else {
                        res.status(200).json({ success: true });
                    }
                    });
            })
        }
      });
}