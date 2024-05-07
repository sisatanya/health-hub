import React, { useState } from 'react';
import { TextField, Button, Grid, InputLabel } from '@mui/material';
import usePageAccess from '../hooks/usePageAccess'
import { PageAccess } from '@/hooks/PageAccess'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { useFormik } from 'formik'

interface AppointmentFormProps {
  username: any;
}

interface Appointment {
  date: string;
  time: string;
  user: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ username }) => {
  usePageAccess(PageAccess.Private);
  const router = useRouter()
  
  const initialValues:InitialValuesType = {
    date: '',
    time: '',
    user: username
  }
  
  type InitialValuesType = {
    date: string;
    time: string;
    user: string;
  }

  const [appointment, setAppointment] = useState<Appointment>({
    date: '',
    time: '',
    user: username,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    //onSubmit(appointment);
  };

  const onSubmit = async (values: InitialValuesType) => {
    try {
      await axios.post("/api/appointments", values)
          .then(response => {
              if (response.status === 200) {
                  Swal.fire(
                      'Congratulations',
                      'Registration successful.',
                      'success'
                  )
              }
              router.push('/search');
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
    date: Yup.date().required('Date is required').min(new Date(), 'Date cannot be in the past'),
    time: Yup.string().required('Time is required').matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  })

  const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <InputLabel htmlFor="date">Date</InputLabel>
          <TextField
            //label="Date"
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
            fullWidth
            InputProps={{
              inputProps: {
                minDate: new Date().toISOString().split('T')[0]
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="time">Time</InputLabel>
          <TextField
            //label="Time"
            type="time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            error={formik.touched.time && Boolean(formik.errors.time)}
            helperText={formik.touched.time && formik.errors.time}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary" disableRipple disabled={!(formik.isValid && formik.dirty)} >
            Submit Appointment
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AppointmentForm;