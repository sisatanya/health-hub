/*
 * The user API handles the login status of the user.
*/

import { NextApiRequest, NextApiResponse } from 'next'


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Accessing the 'username' cookie.
  const user = req.cookies.username;
  const barangay = req.cookies.barangay;
  
  try {
    // If the 'username' cookie does not exist, the user is not logged in yet.
    if (!user) {
      return res.status(200).send({ message: 'User not yet logged in.' });
    }

    // If the 'username' cookie exists, the user is logged in
    // and sends a response 200 and the username as the response body.
    res.status(200).json({ user, barangay });

  } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
  }
}