import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// Function to read the JSON file
function readJSONFile(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// File path to the JSON file
const filePath = "D:/OneDrive - palawanpawnshop.com/login-form-etc/src/data/profiles.json";

// Function to send the profiles as a JSON response
function sendProfiles(res: NextApiResponse) {
  try {
    const profiles = readJSONFile(filePath);
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Function to watch for changes in the profiles.json file
function watchProfiles(res: NextApiResponse) {
  fs.watch(filePath, (event, filename) => {
    // Log the event for debugging purposes
    console.log(`${filename} has been ${event}`);

    // Reload the profiles when the file is modified
    sendProfiles(res);
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Send the initial profiles
  sendProfiles(res);

  // Start watching for changes in the profiles.json file
  watchProfiles(res);
}