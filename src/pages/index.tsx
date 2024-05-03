import * as React from 'react'
import Head from 'next/head'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { Grid } from '@mui/material'


export default function App() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 12,
            mb: 4,
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
        </Box>

        <Box
          sx={{
            mt: 4,
            mb: 6,
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
          <Typography 
            variant="subtitle1" 
            component="h1" 
            gutterBottom 
            sx={{ mb: 0.5 }}
          >
            GOOD DAY!
          </Typography>
        </Box>

        <Grid container justifyContent="space-around" alignItems="space-around">
          <Grid item xs={7}>
            <Typography 
              variant="subtitle1" 
              component="h1" 
              gutterBottom 
              sx={{ mb: 1.5 }}
            >
              This website complies with the Data Privacy Act of 2012, also known as the Republic Act No. 101073, a comprehensive legislation in the Philippines that protects the fundamental human right to privacy, particularly in the context of personal data (Ching et al., 2018).
            </Typography>
          </Grid>
        </Grid>
        
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
          <Typography 
            variant="subtitle1" 
            component="h1" 
            gutterBottom 
            sx={{ mb: 0.5 }}
          >
            MAGANDANG ARAW!
          </Typography>
        </Box>

        <Grid container justifyContent="space-around" alignItems="space-around">
          <Grid item xs={7}>
            <Typography 
              variant="subtitle1" 
              component="h1" 
              gutterBottom 
              sx={{ mb: 1.5 }}
            >
              Ang website na ito ay sumusunod sa Data Privacy Act of 2012, na kilala rin bilang Republic Act No. 101073, isang komprehensibong batas sa Pilipinas na nagpoprotekta sa pangunahing karapatang pantayo sa privacy, lalo na sa konteksto ng personal na mga datos (Ching et al., 2018).            </Typography>
          </Grid>
        </Grid>
        
      </Container>
    </>
  );
}