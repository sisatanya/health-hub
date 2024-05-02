import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

interface AppointmentFormProps {
  onSubmit: (appointment: Appointment) => void;
}

interface Appointment {
  date: string;
  time: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const [appointment, setAppointment] = useState<Appointment>({
    date: '',
    time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(appointment);
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Date"
            type="date"
            name="date"
            value={appointment.date}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Time"
            type="time"
            name="time"
            value={appointment.time}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Submit Appointment
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AppointmentForm;