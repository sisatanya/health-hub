/*
 * search defines a React component for the search page.
*/

import * as React from 'react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useUser } from '../hooks/useUser'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
const Search = dynamic(() => import('../components/Search'))
const Logout = dynamic(() => import('../components/LogOut'))
// Dynamically importing the Search component


export default function App() {
  const { user, barangay } = useUser();

  return (
    // Rendering a container..
    <>
      <Head>
        <title>Search</title>
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
          <Link href='/search'>PROFILE</Link>
          <Typography 
            variant="h5" 
            component="h5" 
            gutterBottom 
            sx={{ width: '15px' }}
          >
            
          </Typography>
          {/* <Logout /> */}
          <Link href='/search'>ABOUT</Link>
          <Typography 
            variant="h5" 
            component="h5" 
            gutterBottom 
            sx={{ width: '15px' }}
          >
            
          </Typography>
        </Box>

      </Container>

      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >  
          <Box sx={{ mt: 2, mb: 2 }}>
            {/* <Button onClick={handleVaccineClick}>New Patient / Bagong Pasyente</Button> */}
            <Link href="/registration" passHref>
              New Patient / Bagong Pasyente
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Rendering the Search component..  */}
          <Search />
        </Box>
        
      </Container>
    </>

  );
}