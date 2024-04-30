/*
 * LogInForm is a component for the implementation and rendering of the login form.
*/

import React, { useState, useLayoutEffect, useEffect } from 'react'
import usePageAccess from '../hooks/usePageAccess'
import { PageAccess } from '@/hooks/PageAccess'
import { useRouter } from 'next/router'
import { useUser } from '../hooks/useUser'
import axios from 'axios'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Stack, Button, TextField, InputAdornment, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'


const LogInForm = () => {
    // The login form is a public-only page.
    // The useAccessPage hook is set to public.
    usePageAccess(PageAccess.Public)
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const initialValues:InitialValuesType = {
        username: '',
        password: '',
        attempt: 0
    }

    type InitialValuesType = {
        username: string,
        password: string,
        attempt: number
    }

    const onSubmit = async (values: InitialValuesType) => { 
    // To handle login form submission..
        try {
            // A POST request is sent to the login API endpoint with the username, password, and attempt.
            axios.post('/api/login', { username: values.username, password: values.password, attempt: values.attempt })
                .then(response => {
                    if (response.status === 200) {
                        // If login attempt is successful, user is redirected to their own profile.
                        //router.replace(`/profile/${values.username}`)
                        router.replace(`/search`)
                    }
                    Swal.fire(
                        'Welcome',
                        'Login successful.',
                        'success'
                    )
                })
                .catch(error => {
                    // If login attempt is unsuccessful, 
                    if (error.response.status === 401 && error.response.data.message === 'Invalid username or password.') {
                        // and the error response message returned from login API is 'Invalid username or password.'
                        values.attempt += 1; 
                    // Fix this - three failed attempts from different users blocks the last user that failed attempt to login
                        // we add 1 to the attempt value which is sent to the login API and is used to track login attempts.
                        console.log('Attempt ', values.attempt);
                        console.log('Invalid username or password.');
                        // The user is prompted and 'Invalid username or password.' message.
                        Swal.fire(
                            'Try again',
                            'Invalid username or password.',
                            'error'
                          )
                    } else if (error.response.status === 403 && error.response.data.message === 'User is blocked due to too many failed login attempts.') {
                        // If the error response message returned from login API is 'User is blocked due to too many failed login attempts.',
                        values.attempt = 0;
                        // the attempt value is set back to 0 since the username of the user is already in the blockedUser cookie
                        // and this will allow to track the failed login of another user.
                        console.log('User is blocked due to too many failed login attempts.');
                        // The user is prompted and 'User is blocked due to too many failed login attempts.' message.
                        Swal.fire(
                            'Try again later',
                            'You are blocked due to too many failed login attempts.',
                            'error'
                          )
                    }
                });
        } catch (error) {
            console.error(error);
        }

    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required.'),
        password: Yup.string().required('Password is required')
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
            <div className='form-control'>
                <TextField
                    required
                    type='text'
                    label='USERNAME'
                    id='username'
                    name='username'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    error={ Boolean(formik.touched.username && formik.errors.username) }
                    helperText={ formik.touched.username && formik.errors.username ? (
                        <div className='error'>{formik.errors.username}</div>
                        ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>
            
            <div className='form-control'>
                <TextField
                    required
                    label='GOVERNMENT PIN'
                    id='password'
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={ Boolean(formik.touched.password && formik.errors.password) }
                    helperText={ formik.touched.password && formik.errors.password ? (
                        <div className='error'>{formik.errors.password}</div>
                        ) : null }
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: <InputAdornment position='end'>
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}

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
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    }}
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
                LOG-IN
            </Button>
        </Stack>
        </form>
        </div>
        </div>
    )

}

export default LogInForm