/*
 * Search is a component for rendering the search page
 * which navigation links based on the user's login status.
*/

import React, { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'
import { Stack, TextField, List, ListItem, ListItemText, Box, Typography, InputAdornment, IconButton, Container } from '@mui/material'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router'
import usePageAccess from '../hooks/usePageAccess'
import { PageAccess } from '@/hooks/PageAccess'
import { yellow } from '@mui/material/colors'
const Logout = dynamic(() => import('../components/LogOut')) 

const Search = () => {
  usePageAccess(PageAccess.Private);
  // user and isLoggedIn values are returned from the useUser hook.
  const { user, isLoggedIn } = useUser();
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  interface Profile {
    id: number;
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    address: string;
    mobileNumber: string;
    sex: string;
    birthday: string;
    religion: string;
  }
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  //const [searchResults, setSearchResults] = useState([]);
  //const [searchResults, setSearchResults] = useState<string []>([]);
  //const [searchResults, setSearchResults] = useState<{ username: string; firstName: any; lastName: any; }[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('/api/profiles');
      const data = await response.json();
      setProfiles(data);
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    if (searchTerm === '' || searchTerm === null) {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const getMiddleInitial = (middleName: string) => {
    const middleInitial = `${middleName ? middleName[0]+'.' : ''}`;
    return middleInitial;
  };

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const results = profiles.filter((profile: Profile) => {
      return (
        profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (profile.firstName.toLowerCase() + ' ' + profile.lastName.toLowerCase()).includes(searchTerm.toLowerCase())
      );
    });
    setSearchResults(results.map((profile: Profile) => ({
      ...profile,
      onClick: () => handleProfileClick(profile.username),
    })));
  };

  const handleProfileClick = (id: string) => {
    router.push(`/profile/${id}`);
  };

  return (
      <div className='wrapper'>
      <div className='form-wrapper'>

        <Stack justifyContent="center" alignItems="left" spacing={1.5}>
          <Typography 
            variant="subtitle1" 
            component="h1" 
            gutterBottom 
            sx={{ mb: 0 }}
          >
            Enter name of the patient / Ilagay ang pangalan ng pasyente
          </Typography>

          <TextField
            label="SEARCH / HANAPIN"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ width: '500px' }} 
            InputProps={{
              endAdornment: <InputAdornment position='end'>
                  <IconButton
                    aria-label="search"
                    style={{
                      position: "absolute",
                      right: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "55px",
                      height: "100%",
                      padding: 20,
                      }}
                    >
                    <SearchIcon />
                  </IconButton>
              </InputAdornment>
            }}
          />
          <List>
          {searchResults.map((profile: Profile, index: number) => (
            <ListItem key={index} onClick={() => handleProfileClick(profile.username)}>
              <ListItemText 
                primary={
                  <Typography
                    style={{ color: calculateAge(profile.birthday) >= 60 ? '#8B8000' : '#000000' }}
                  >
                    {profile.lastName}, {profile.firstName} {getMiddleInitial(profile.middleName)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          </List>
        </Stack>
      
      </div>
      </div>
  );
}

export default Search;