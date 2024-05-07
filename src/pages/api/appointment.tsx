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
  const { date, time, user } = req.body;

  try {
    const client = await sql.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time VARCHAR(255) NOT NULL
      )
    `);

    // await client.query(`
    //   ALTER TABLE profiles DROP COLUMN IF EXISTS password;
    // `);
    
    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM appointments;`;
      const userData = rows.map((row: any) => ({
        id: row.id,
        user: row.username,
        date: row.date,
        time: row.time,
      }));
      //console.log("userData", userData)
      res.status(200).json(userData);
    } 
    else if (req.method === 'POST') {
      await sql`INSERT INTO appointments (username, date, time) VALUES (${user}, ${date}, ${time});`;
      res.status(200).json({ success: true });
    }
  } 
  catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}