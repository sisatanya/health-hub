/*
 * contact defines a React component for the contact page.
*/


import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import dynamic from 'next/dynamic'
const Contact = dynamic(() => import('../components/Contact'))
// Dynamically importing the Contact component


export default function App() {
  return (
    // Rendering a container..
    <Container maxWidth="lg">
      {/* Rendering a navigate section box.. */}
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ mb: 2.5 }}
        >
          Contact
        </Typography>

      </Box>

      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Rendering the Contact component..  */}
        <Contact />
      </Box>

    </Container>
  );
}