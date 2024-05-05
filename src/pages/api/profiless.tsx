import path from 'path';
import { promises as fsPromises } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');
// Function to read the JSON file
async function readJSONFile(filePath: string) {
  return JSON.parse(await fsPromises.readFile(filePath, 'utf-8'));
}

// File path to the JSON file
//const filePath = "D:/SISACHU/projects/login-form-etc//tmp/profiles.json";
const filePath = path.join(process.cwd(), '/tmp/profiles.json');

// Function to send the profiles as a JSON response
function sendProfiles(res: NextApiResponse) {
  try {
    const profiles = readJSONFile(filePath);
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Function to watch for changes in the profiles.json file
function watchProfiles(res: NextApiResponse) {
  fs.watch(filePath, (event: any, filename: any) => {
    // Log the event for debugging purposes

    // Reload the profiles when the file is modified
    sendProfiles(res);
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Send the initial profiles
  sendProfiles(res);

  // Start watching for changes in the profiles.json file
  watchProfiles(res);
}