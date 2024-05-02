/*
 * home defines a React component for the home page.
*/

import * as React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'
const Home = dynamic(() => import('../components/Home'))
// Dynamically importing the Home component


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
          Home
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
        {/* Rendering the Home component..  */}
        <Home />
      </Box>

    </Container>
  );
}