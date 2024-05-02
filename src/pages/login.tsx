/*
 * login defines a React component for the login page.
*/

import * as React from 'react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const LogInForm = dynamic(() => import('../components/LogInForm'))
// Dynamically importing the LogInForm component


export default function App() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Container maxWidth="lg">
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
          variant="h5" 
          component="h1" 
          gutterBottom 
          sx={{ mb: 2.5 }}
        >
          Automation List of Health Records for residents of Valenzuela City
        </Typography>

        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link href='/'>HOME</Link>
          <Typography 
            variant="h5" 
            component="h5" 
            gutterBottom 
            sx={{ width: '15px' }}
          >
            
          </Typography>
          <Link href='/login'>LOG-IN</Link>
        </Box>

        {/* Rendering the LogInForm component..  */}
        <LogInForm />
        
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

        {/* <Typography 
          variant="subtitle1"
          gutterBottom 
          sx={{ mb: 2.5 }}
        >
          
          <Link href='/registration'>Create account</Link> 
        </Typography> */}
        
      </Box>
    </Container>
    </>
  );
}