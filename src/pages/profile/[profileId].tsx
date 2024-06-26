/*
 * [profileId] handles the dynamic routing for individual user profiles.
 * It sets up a dynamic route for user profiles, and 
 * fetches the relevant profile data.
*/

import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Container, Grid, Box, Typography, Stack, Button, Avatar } from '@mui/material'
import { useUser } from '../../hooks/useUser'
import { useState, useEffect } from 'react'
const Profiles = dynamic(() => import('../../components/Profiles'))
const AppointmentForm = dynamic(() => import('../../components/AppointmentForm'))
const Logout = dynamic(() => import('../../components/LogOut'))

import profilesData from '../../tmp/profiles.json'
// The Profiles and Logout components are dynamically imported
// which means they will be loaded when they are required instead
// of loading them all at once the page loads.

interface Appointment {
  date: string;
  time: string;
  user: string;
}

export default function App({ userData }:{ userData: any }) {
  const userProfile = userData[0];
  const { user, barangay } = useUser();
  const [showAppointmentContainer, setShowAppointmentContainer] = useState(false);
  const [showCheckupContainer, setShowCheckupContainer] = useState(false);
  const [showLaboratoryContainer, setShowLaboratoryContainer] = useState(false);
  const [showVaccineContainer, setShowVaccineContainer] = useState(false);
  const [showVitaminsContainer, setShowVitaminsContainer] = useState(false);
  const [showMaintenanceContainer, setShowMaintenanceContainer] = useState(false);
  const [showEditProfileContainer, setShowEditProfileContainer] = useState(false);
  // const [isAppointmentClicked, setAppointmentIsClicked] = useState(false);
  // const [isCheckupClicked, setIsCheckupClicked] = useState(false);
  // const [isLaboratoryClicked, setIsLaboratoryClicked] = useState(false);
  // const [isVaccineClicked, setIsVaccineClicked] = useState(false);
  // const [isVitaminsClicked, setIsVitaminsClicked] = useState(false);
  // const [isMaintenanceClicked, setIsMaintenanceClicked] = useState(false);

  const handleProfileClick = () => {
    setShowAppointmentContainer(false);
    setShowCheckupContainer(false);
    setShowLaboratoryContainer(false);
    setShowVaccineContainer(false);
    setShowVitaminsContainer(false);
    setShowMaintenanceContainer(false);
    setShowEditProfileContainer(false);
  };

  const handleAppointmentClick = () => {
    //setAppointmentIsClicked(true);
    setShowAppointmentContainer(true);
    setShowCheckupContainer(false);
    setShowLaboratoryContainer(false);
    setShowVaccineContainer(false);
    setShowVitaminsContainer(false);
    setShowMaintenanceContainer(false);
  };

  // const handleAppointmentSubmit = (appointment: Appointment) => {
  //   // Save the appointment data to a JSON file
  // };

  const handleCheckupClick = () => {
    setShowAppointmentContainer(false);
    setShowCheckupContainer(true);
    setShowLaboratoryContainer(false);
    setShowVaccineContainer(false);
    setShowVitaminsContainer(false);
    setShowMaintenanceContainer(false);
  };

  const handleLaboratoryClick = () => {
    setShowAppointmentContainer(false);
    setShowCheckupContainer(false);
    setShowLaboratoryContainer(true);
    setShowVaccineContainer(false);
    setShowVitaminsContainer(false);
    setShowMaintenanceContainer(false);
  };

  const handleVaccineClick = () => {
    setShowAppointmentContainer(false);
    setShowCheckupContainer(false);
    setShowLaboratoryContainer(false);
    setShowVaccineContainer(true);
    setShowVitaminsContainer(false);
    setShowMaintenanceContainer(false);
  };

  const handleVitaminsClick = () => {
    setShowAppointmentContainer(false);
    setShowCheckupContainer(false);
    setShowLaboratoryContainer(false);
    setShowVaccineContainer(false);
    setShowVitaminsContainer(true);
    setShowMaintenanceContainer(false);
  };

  const handleMaintenanceClick = () => {
    setShowAppointmentContainer(false);
    setShowCheckupContainer(false);
    setShowLaboratoryContainer(false);
    setShowVaccineContainer(false);
    setShowVitaminsContainer(false);
    setShowMaintenanceContainer(true);
  };

  const handleEditProfileClick = () => {
    setShowAppointmentContainer(false);
    setShowCheckupContainer(false);
    setShowLaboratoryContainer(false);
    setShowVaccineContainer(false);
    setShowVitaminsContainer(false);
    setShowMaintenanceContainer(false);
    setShowEditProfileContainer(true);
  };

  const setupContainerView = () => {
    if (showAppointmentContainer) { 
      return <AppointmentForm username={userProfile.username} />
    }
    else if (showCheckupContainer) { 
      return <Typography>Check-up</Typography>
    }
    else if (showLaboratoryContainer) { 
      return <Typography>Schedule Laboratory</Typography>
    }
    else if (showVaccineContainer) { 
      return <Typography>Vaccines</Typography>
    }
    else if (showVitaminsContainer) { 
      return <Typography>Vitamins</Typography>
    }
    else if (showMaintenanceContainer) { 
      return <Typography>Maintenance</Typography>
    }
    else if (showEditProfileContainer) { 
      return <Typography></Typography>
    }

  };

  return (
    <>
      <Head>
        <title>Profile</title>
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
          <Link 
            href={`/profile/${userProfile.username}`} 
            onClick={handleProfileClick}
          >
            PROFILE
          </Link>
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

      {/* {showAppointmentContainer || showCheckupContainer || showLaboratoryContainer || showVaccineContainer || showVitaminsContainer || showMaintenanceContainer || showEditProfileContainer ? (
        // different layout when showContainer is true
        
      ) : (
        // default layout
        
      )} */}

      <Container maxWidth="lg">
        <Grid container justifyContent="left" alignItems="left">
          {showAppointmentContainer || showCheckupContainer || showLaboratoryContainer || showVaccineContainer || showVitaminsContainer || showMaintenanceContainer || showEditProfileContainer ? (
            // different layout when showContainer is true
            <>
              <Grid item xs={1}>
                <Box
                  sx={{
                    mt: 10,
                    ml: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Avatar alt="Profile Picture" src="/path_to_profile_picture.jpg" sx={{ width: 60, height: 60 }}/>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box
                  sx={{
                    mt: 9,
                    ml: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'left',
                    alignItems: 'left',
                  }}
                >
                  <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>{userProfile.lastName}, {userProfile.firstName}</Typography>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>{userProfile.address}</Typography>
                </Box>
              </Grid>
            </>
          ) : (
            // default layout
            <>
              <Grid item xs={2}>
                <Box
                  sx={{
                    mt: 6,
                    ml: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Avatar alt="Profile Picture" src="/path_to_profile_picture.jpg" sx={{ width: 150, height: 150 }}/>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    mt: 10,
                    ml: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'left',
                    alignItems: 'left',
                  }}
                >
                  <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>{userProfile.lastName}, {userProfile.firstName}</Typography>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>{userProfile.address}</Typography>
                </Box>
              </Grid>
            </>
          )}
          
          <Grid item xs={6}>
            <Box
              sx={{
                mt: 4,
                mr: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'right',
                alignItems: 'right',
              }}
            >
              <Box>
                <Button 
                  // variant="contained"
                  // sx={{
                  //   backgroundColor: isAppointmentClicked ? 'blue' : 'white',
                  //   '&:hover': {
                  //     backgroundColor: 'blue',
                  //   },
                  // }}
                  onClick={handleAppointmentClick}
                  >
                    APPOINTMENT
                  </Button>
              </Box>

              <Box>
                <Button onClick={handleCheckupClick}>CHECK-UP</Button>
              </Box>

              <Box>
                <Button onClick={handleLaboratoryClick}>LABORATORY</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
        {showAppointmentContainer || showCheckupContainer || showLaboratoryContainer || showVaccineContainer || showVitaminsContainer || showMaintenanceContainer || showEditProfileContainer ? (
          // different layout when showContainer is true
          <>
            <Grid item xs={3}>
              <Box
                sx={{
                  ml: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'left',
                  alignItems: 'left',
                  pb: 5,
                }}
              >  
                <Profiles userProfile={userProfile} />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box
                sx={{
                  ml: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pb: 5,
                }}
              >
                {setupContainerView()}
              </Box>
            </Grid>
          </>
        ) : (
          // default layout
          <Grid item xs={8}>
            <Box
              sx={{
                ml: 29,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                alignItems: 'left',
                pb: 5,
              }}
            >  
              <Profiles userProfile={userProfile} />
            </Box>
          </Grid>
        )}
          
          <Grid item xs={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                pb: 5,
              }}
            >  
              <Box sx={{ mt: 2, mb: 2 }}>
                <Button onClick={handleVaccineClick}>VACCINE</Button>
              </Box>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Button onClick={handleVitaminsClick}>VITAMINS</Button>
              </Box>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Button onClick={handleMaintenanceClick}>MAINTENANCE</Button>
              </Box>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Button onClick={handleEditProfileClick}>EDIT PROFILE</Button>
              </Box>
            </Box>
            
          </Grid>
        </Grid>
        
      </Container>
    </> 
  );
}

export async function getStaticProps(context: any) {
  // `getStaticProps` to fetch the user profile data based on the dynamic `profileId` parameter.
  const { params } = context;

  try {
    //const response = await import(`/api/profiles/${params.profileId}`);
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://health-hub-kappa.vercel.app';
    const response = await fetch(`${baseUrl}/api/profiles/${params.profileId}`, {method: 'GET'});
    const data = await response.json();
    
    return {
      props: { userData: data },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: { userData: null },
      revalidate: 10,
    };
  }
};

export async function getStaticPaths() {
  // `getStaticPaths` to generate the static paths for the dynamic routes.
  try {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://health-hub-kappa.vercel.app';
    const response = await fetch(`${baseUrl}/api/profiles`);
    const data = await response.json();

    const paths = data.map((profile: any) => ({
      params: { profileId: profile.username },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
}