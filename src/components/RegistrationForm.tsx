import React, { useState, useEffect } from 'react'
import usePageAccess from '../hooks/usePageAccess'
import { PageAccess } from '@/hooks/PageAccess'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Stack, Button, TextField, InputAdornment, IconButton } from '@mui/material'
import profilesData from '../tmp/profiles.json'

const RegistrationForm = () => {
    usePageAccess(PageAccess.Private);
    const router = useRouter()

    const initialValues:InitialValuesType = {
        // id: 0,
        username: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        address: '',
        mobileNumber: '',
        sex: '',
        birthday: '',
        religion: ''
    }

    type InitialValuesType = {
        // id: number,
        username: string,
        firstName: string,
        middleName: string,
        lastName: string,
        email: string,
        address: string,
        mobileNumber: string,
        sex: string,
        birthday: string,
        religion: string
    }

    const fetchProfiles = async () => {
        const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://health-hub-kappa.vercel.app';
        const response = await fetch(`${baseUrl}/api/profiles`);
        const data = await response.json();
        return data;
      };

    const makeUsername = async (firstName: string, middleName: string, lastName: string) => {
        const initialUsername = `${firstName[0]}${middleName ? middleName[0] : ''}${lastName}1`.toLowerCase();
        let counter = 1;

        const cleanUsername = initialUsername.replace(/\d/g, '');

        const profiles = await fetchProfiles();

        // Find all similar usernames with different numbers
        const similarUsernames = profiles.filter((profile: { username: string }) => profile.username.startsWith(cleanUsername));

        if (similarUsernames !== null) {
            // Find the highest number
            const highestNumber = similarUsernames.reduce((max: number, profile: { username: string }) => {
                const num = parseInt(profile.username.replace(cleanUsername, ''));
                return num > max ? num : max;
            }, 0);
            counter = highestNumber + 1;
        }
    
        return `${cleanUsername}${counter ? counter : ''}`.toLowerCase();
    }

    const onSubmit = async (values: InitialValuesType) => {
        try {
            // Create the username
            const username = makeUsername(values.firstName, values.middleName, values.lastName);

            // Update the values object with the new username
            const updatedValues = {
                ...values,
                username,
            };
            
            await axios.post("/api/profiles", updatedValues)
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire(
                            'Congratulations',
                            'Registration successful.',
                            'success'
                        )
                    }
                    router.push('/search');
                })
                .catch(error => {
                    console.error(error);
                });
            
            await axios.get("/api/profiles")
                .then(response => {
                    router.reload();
                });
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
        }
        formik.resetForm();
    }

    const validationSchema = Yup.object({
        /*  First Name and Last Name fields are required.
            Middle name is optional. */
        firstName: Yup.string()
            // .matches(/\s/, 'First Name is required.')
            .required('First Name is required.'),
        
        lastName: Yup.string()
            // .matches(/\s/, 'Last Name is required.')
            .required('Last Name is required.'),
        
        /* Email Address must be valid. */
        email: Yup.string()
            .email('Invalid email format.')
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format.'),

        address: Yup.string()
            .required('Address is required.'),
        
        /* Mobile Number must start from 0 and must have an 11-digit number. */
        mobileNumber: Yup.string()
            .matches(/^[0]\d{10}$/, 'Mobile number should start with 0 and have 11 digits.'),

        sex: Yup.string()
            .required('Sex is required.'),

        birthday: Yup.string()
            .required('Birthday is required.'),

        religion: Yup.string()
            .required('Religion is required.'),
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <div className='wrapper'>
        <div className='form-wrapper'>
        <form onSubmit={formik.handleSubmit}>
        <Stack justifyContent="center" alignItems="center" spacing={2.5}>
            {/* First Name */}
            <div className='form-control'>
                <TextField
                    required
                    type='text'
                    label='First Name'
                    id='firstName'
                    name='firstName'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    error={ Boolean(formik.touched.firstName && formik.errors.firstName) }
                        helperText={ formik.touched.firstName && formik.errors.firstName ? (
                            <div className='error'>{formik.errors.firstName}</div>
                            ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>
            {/* Middle Name */}
            <div className='form-control'>
                <TextField
                    type='text'
                    label='Middle Name'
                    id='middleName'
                    name='middleName' 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.middleName}
                    error={ Boolean(formik.touched.middleName && formik.errors.middleName) }
                        helperText={ formik.touched.middleName && formik.errors.middleName ? (
                            <div className='error'>{formik.errors.middleName}</div>
                            ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>
            {/* Last Name */}
            <div className='form-control'>
                <TextField
                    required
                    type='text'
                    label='Last Name'
                    id='lastName'
                    name='lastName' 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName} 
                    error={ Boolean(formik.touched.lastName && formik.errors.lastName) }
                        helperText={ formik.touched.lastName && formik.errors.lastName ? (
                            <div className='error'>{formik.errors.lastName}</div>
                            ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>
            {/* Sex */}
            <div className='form-control'>
                <TextField
                    required
                    type='text'
                    label='Sex'
                    id='sex'
                    name='sex' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}  
                    value={formik.values.sex} 
                    error={ Boolean(formik.touched.sex && formik.errors.sex) }
                        helperText={ formik.touched.sex && formik.errors.sex ? (
                            <div className='error'>{formik.errors.sex}</div>
                            ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>
            {/* Birthday */}
            <div className='form-control'>
                <TextField
                    required
                    type='text'
                    label='Birthday'
                    id='birthday'
                    name='birthday' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}  
                    value={formik.values.birthday} 
                    error={ Boolean(formik.touched.birthday && formik.errors.birthday) }
                        helperText={ formik.touched.birthday && formik.errors.birthday ? (
                            <div className='error'>{formik.errors.birthday}</div>
                            ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>
            {/* Address */}
            <div className='form-control'>
                <TextField
                    required
                    type='text'
                    label='Address'
                    id='address'
                    name='address' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}  
                    value={formik.values.address} 
                    error={ Boolean(formik.touched.address && formik.errors.address) }
                        helperText={ formik.touched.address && formik.errors.address ? (
                            <div className='error'>{formik.errors.address}</div>
                            ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>
            {/* Religion */}
            <div className='form-control'>
                <TextField
                    required
                    type='text'
                    label='Religion'
                    id='religion'
                    name='religion' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}  
                    value={formik.values.religion} 
                    error={ Boolean(formik.touched.religion && formik.errors.religion) }
                        helperText={ formik.touched.religion && formik.errors.religion ? (
                            <div className='error'>{formik.errors.religion}</div>
                            ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>
            {/* Email */}
            <div className='form-control'>
                <TextField
                    type='text'
                    label='E-mail'
                    id='email'
                    name='email' 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    value={formik.values.email} 
                    error={ Boolean(formik.touched.email && formik.errors.email) }
                        helperText={ formik.touched.email && formik.errors.email ? (
                            <div className='error'>{formik.errors.email}</div>
                            ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>
            {/* Mobile Number */}
            <div className='form-control'>
                <TextField
                    type='text'
                    label='Mobile Number'
                    id='mobileNumber'
                    name='mobileNumber' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}  
                    value={formik.values.mobileNumber} 
                    error={ Boolean(formik.touched.mobileNumber && formik.errors.mobileNumber) }
                        helperText={ formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                            <div className='error'>{formik.errors.mobileNumber}</div>
                            ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>

            <Button 
                type='submit'
                variant='contained'
                disableRipple
                disabled={!(formik.isValid && formik.dirty)}
                sx={{ mt: 1.5, mb: 2 }}
            >
                Register
            </Button>
        </Stack>
        </form>
        </div>
        </div>
    )

}

export default RegistrationForm