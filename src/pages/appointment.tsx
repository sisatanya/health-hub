/*
 * appointment defines a React component for the appointment page.
*/

import * as React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useUser } from '../hooks/useUser'
import { Grid, Container, Box, Typography } from '@mui/material'
const Profiles = dynamic(() => import('../components/Profiles'))
const Appointment = dynamic(() => import('../components/Appointment'))
const Logout = dynamic(() => import('../components/LogOut'))
// Dynamically importing the Appointment component

export default function App({ userData }:{ userData: any }) {
  const { user, barangay } = useUser();
  return (
    <>
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
            sx={{ mb: 1 }}
          >
            HealthHub {barangay}
          </Typography>

          <Typography 
            variant="h6" 
            component="h1" 
            gutterBottom 
            sx={{ mb: 2.5 }}
          >
            Hello, {user}!
          </Typography>

        </Box>

        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link href='/search'>SEARCH</Link>
          <Typography 
            variant="h5" 
            component="h5" 
            gutterBottom 
            sx={{ width: '15px' }}
          >
            
          </Typography>
          <Link href='/appointment'>PROFILE</Link>
          <Typography 
            variant="h5" 
            component="h5" 
            gutterBottom 
            sx={{ width: '15px' }}
          >
            
          </Typography>
          <Logout />
        </Box>

      </Container>

      <Container maxWidth="lg">
        <Grid container justifyContent="right" alignItems="right">
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link href='/appointment'>APPOINTMENT</Link>
            <Typography 
              variant="h5" 
              component="h5" 
              gutterBottom 
              sx={{ width: '15px' }}
            >
              
            </Typography>
            <Link href='/search'>CHECK-UP</Link>
            <Typography 
              variant="h5" 
              component="h5" 
              gutterBottom 
              sx={{ width: '15px' }}
            >
              
            </Typography>
            <Link href='/search'>LABORATORY</Link>
            <Typography 
              variant="h5" 
              component="h5" 
              gutterBottom 
              sx={{ width: '15px' }}
            >
              
            </Typography>
          </Box>
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={8}>
            <Box
              sx={{
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >  
              {/* <Profiles userData={userData} /> */}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link href='/search'>VACCINE</Link>
              <Link href='/search'>VITAMINS</Link>
              <Link href='/search'>MAINTENANCE</Link>
              <Link href='/search'>EDIT PROFILE</Link>
            </Box>
          </Grid>
        </Grid>
        
      </Container>
    </>
  );
}