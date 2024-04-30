import React, { useState } from 'react'
import usePageAccess from '../hooks/usePageAccess'
import { PageAccess } from '@/hooks/PageAccess'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Stack, Button, TextField, InputAdornment, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'


const RegistrationForm = () => {
    usePageAccess(PageAccess.Public);
    const router = useRouter()

    const initialValues:InitialValuesType = {
        // id: 0,
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        mobileNumber: ''
    }

    type InitialValuesType = {
        // id: number,
        username: string,
        password: string,
        confirmPassword: string,
        firstName: string,
        middleName: string,
        lastName: string,
        email: string,
        mobileNumber: string
    }

    const onSubmit = async (values: InitialValuesType) => {
        try {
            await axios.post("/api/profiles", values)
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire(
                            'Congratulations',
                            'Registration successful.',
                            'success'
                        )
                        router.push('/login');
                    }
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
        /*  Username should not exceed 10 characters and 
            should not be less than 4 characters.*/
        username: Yup.string()
            .required('Username is required.')
            .min(4,'Username should be at least 4 characters.')
            .max(10, 'Username should not exceed 10 characters.'),

        /*  Password should not exceed 15 characters and 
            should not be less than 6 characters.
            Password should contain at least 1 uppercase, 
            a lowercase, a special character and a number.*/
        password: Yup.string()
            .required('Password is required.')
            .min(6,'Password should be at least 6 characters.')
            .max(15, 'Password should not exceed 15 characters.')
            .matches(/^(?=.*[\d])(?=.*[a-zA-Z])(?=.*[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#])/,
                'Include at least an uppercase, a lowercase, a special character and a number.'),
        
        confirmPassword: Yup.string()
            .required('Please confirm your password.')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),

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
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format.')
            .required('E-mail is required.'),
        
        /* Mobile Number must start from 0 and must have an 11-digit number. */
        mobileNumber: Yup.string()
            .required('Mobile number is required.')
            .matches(/^[0]\d{10}$/, 'Mobile number should start with 0 and have 11 digits.')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <div className='wrapper'>
        <div className='form-wrapper'>
        <form onSubmit={formik.handleSubmit}>
        <Stack justifyContent="center" alignItems="center" spacing={2.5}>
            <div className='form-control'>
                <TextField
                    required
                    type='text'
                    label='Username'
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
                    label='Password'
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

            <div className='form-control'>
                <TextField
                    required
                    type='password'
                    label='Confirm Password'
                    id='confirmPassword'
                    name='confirmPassword'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    error={ Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword) }
                    helperText={ formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className='error'>{formik.errors.confirmPassword}</div>
                        ) : null }
                    sx={{ width: { md: 500 }}}
                />
            </div>

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

            <div className='form-control'>
                <TextField
                    type='text'
                    label='Middle Name (optional)'
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

            <div className='form-control'>
                <TextField
                    required
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

            <div className='form-control'>
                <TextField
                    required
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