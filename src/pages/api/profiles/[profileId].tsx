/*
 * The [profileId] is an API endpoint for retrieving and creating user profiles.
*/

import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fsPromises } from 'fs';
import Error from 'next/error';
import { sql } from "@vercel/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const client = await sql.connect();
    return new Promise<void>(async (resolve, reject) => {
        
        if (req.method === 'GET') {
            try {
                const username2 = Array.isArray(profileId) ? profileId[0] : profileId || '';
                const { rows } = await sql`SELECT * FROM profiles WHERE username = ${username2};`;
                const userData = rows.map((row: any) => ({
                  id: row.id,
                  username: row.username,
                  firstName: row.firstname,
                  middleName: row.middlename,
                  lastName: row.lastname,
                  email: row.email,
                  address: row.address,
                  mobileNumber: row.mobilenumber,
                  sex: row.sex,
                  birthday: row.birthday,
                  religion: row.religion,
                }));
                res.status(200).json(userData);
            } 
            catch (error) {
                throw error;
            }
        } 
        else if (req.method === 'POST') {
            try {
                await sql`INSERT INTO profiles (username, firstName, middleName, lastName, email, address, mobileNumber, sex, birthday, religion) VALUES (${username}, ${firstName}, ${middleName}, ${lastName}, ${email}, ${address}, ${mobileNumber}, ${sex}, ${birthday}, ${religion});`;
                res.status(200).json({ success: true });
            } 
            catch (error) {
                res.status(405).end();
            }
        }
      });
}