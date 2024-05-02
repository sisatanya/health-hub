/*
 * Profiles is a component to render a user's profile page.
*/

import React, { useState, useLayoutEffect, useEffect } from 'react'
import usePageAccess from '../hooks/usePageAccess'
import { PageAccess } from '@/hooks/PageAccess'
import { useRouter } from 'next/router'
import { useUser } from '../hooks/useUser'
import { Stack, Typography } from '@mui/material'


const Profile = ({ userData }:{ userData: any }) => {
    // The profile page is a private-only page.
    // The useAccessPage hook is set to private.
    usePageAccess(PageAccess.Private);
    const [profileData, setProfileData] = useState(userData);
    const router = useRouter();
    const { user } = useUser();

    // This useEffect hook is to update the profileData state 
    // when the userData prop changes.
    useEffect(() => {
      setProfileData(userData);
    }, [userData]);

    const calculateAge = (birthday: string) => {
      const birthDate = new Date(birthday);
      const currentDate = new Date();
    
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const month = currentDate.getMonth() - birthDate.getMonth();
      const day = currentDate.getDate() - birthDate.getDate();
    
      if (month < 0 || (month === 0 && day < 0)) {
        age--;
      }
    
      return age;
    };
    
    return (
        <div className='wrapper'>
        <div className='form-wrapper'>

        <Stack justifyContent="left" alignItems="left">
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}> PERSONAL INFORMATION </Typography>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.2 }}> SEX:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{userData.sex} </Typography>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.2 }}> AGE: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{calculateAge(userData.birthday)} years old</Typography>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.2 }}> BIRTHDAY:&nbsp;&nbsp;&nbsp;{userData.birthday} </Typography>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 1.5 }}> RELIGION: &nbsp;&nbsp;&nbsp;{userData.religion} </Typography>
        </Stack>

        <Stack justifyContent="left" alignItems="left">
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 1.5, mb: 1 }}> FAMILIAL RELATIONSHIP RECORD </Typography>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.2 }}> MOTHER:&nbsp;&nbsp;&nbsp; </Typography>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.2 }}> FATHER:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Typography>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.2 }}> SIBLING:&nbsp;&nbsp;&nbsp;&nbsp; </Typography>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 0.2 }}> SIBLING:&nbsp;&nbsp;&nbsp;&nbsp; </Typography>
        </Stack>
        
        </div>
        </div>
    );
}

export default Profile;