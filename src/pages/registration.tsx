import * as React from 'react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'
const RegistrationForm = dynamic(() => import('../components/RegistrationForm'))


export default function App() {
  return (
    <>
      <Head>
        <title>Register</title>
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
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ mb: 2.5 }}
          >
            New Patient Registration
          </Typography>
          
          <RegistrationForm />

        </Box>
      </Container>
    </> 
  );
}