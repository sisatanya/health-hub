/*
 * profiles/index is an API endpoint for retrieving and creating user profiles.
*/

import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fsPromises } from 'fs';
import { sql } from "@vercel/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Retrieving `profileId` from the request's query parameters.
  const { profileId } = req.query;
  // Retrieving user profile fields from the request's body.
  const { username, firstName, middleName, lastName, email, address, mobileNumber, sex, birthday, religion } = req.body;

  try {
    const client = await sql.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        middleName VARCHAR(255),
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        mobileNumber VARCHAR(255) NOT NULL,
        sex VARCHAR(255) NOT NULL,
        birthday DATE NOT NULL,
        religion VARCHAR(255) NOT NULL
      )
    `);

    // await client.query(`
    //   ALTER TABLE profiles DROP COLUMN IF EXISTS password;
    // `);
    
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM profiles;`;
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
      //console.log("userData", userData)
      res.status(200).json(userData);
    } 
    else if (req.method === 'POST') {
      await sql`INSERT INTO profiles (username, firstName, middleName, lastName, email, address, mobileNumber, sex, birthday, religion) VALUES (${username}, ${firstName}, ${middleName}, ${lastName}, ${email}, ${address}, ${mobileNumber}, ${sex}, ${birthday}, ${religion});`;
      res.status(200).json({ success: true });
    }
  } 
  catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}