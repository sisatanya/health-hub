/*
 * profiles/index is an API endpoint for retrieving and creating user profiles.
*/

import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Retrieving `profileId` from the request's query parameters.
  const { profileId } = req.query;
  // Retrieving user profile fields from the request's body.
  const { id, username, password, confirmPassword, firstName, middleName, lastName, email, address, mobileNumber, sex, birthday, religion } = req.body;
  const newProfile = {
    id,
    username,
    password,
    confirmPassword,
    firstName,
    middleName,
    lastName,
    email,
    address,
    mobileNumber,
    sex,
    birthday,
    religion
  };

  try {
    if (req.method === 'GET') {
      // Import the JSON file
      const filePath = path.join(process.cwd(), '/tmp/profiles.json');
      const data = await fs.readFile(filePath, 'utf8');
      const userData = JSON.parse(data);
      res.status(200).json(userData);
    } else if (req.method === 'POST') {
      // Import the JSON file
      const filePath = path.join(process.cwd(), '/tmp/profiles.json');
      const data = await fs.readFile(filePath, 'utf8');
      const userData = JSON.parse(data);
      userData.push(newProfile);
      const newDataFile = JSON.stringify(userData, null, 2);
      await fs.writeFile(filePath, newDataFile);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}