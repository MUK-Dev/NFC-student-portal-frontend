import { useState } from 'react';
import {
  IconButton,
  Stack,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const StudentForm2 = ({ animation, handleNext, handleBack }) => {
  const theme = useTheme();
  const [values, setValues, depart, setdepart] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setdepart(event.target.value);
  };

  const arrowAnimation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      width='100%'
      sx={{ position: 'relative' }}
    >
      <Typography variant='h5' gutterBottom>
        Enter Personal Information
      </Typography>
      <Divider
        sx={{
          background: theme.palette.primary.main,
          height: '4px',
          width: '25%',
          borderRadius: '50px',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1em',
        }}
      />
      <Stack gap='1em' padding='1em' width='100%'>
        <Stack
          direction='row'
          alignItems='center'
          sx={{ width: '100%', gap: '1em' }}
        >
          <TextField
            variant='outlined'
            label='Full Name'
            type='text'
            placeholder='Full-Name'
            fullWidth
          />
          <TextField
            variant='outlined'
            label='Phone No.'
            type='number'
            placeholder='eg. 0300000000'
            fullWidth
          />
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          sx={{ width: '100%', gap: '1em' }}
        >
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={depart}
              label='Department'
              onChange={handleChange}
            >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
              <MenuItem value={3}>Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={depart}
              label='Department'
              onChange={handleChange}
            >
              <MenuItem value={1}>Computer Science</MenuItem>
              <MenuItem value={2}>Mechanical Engineering</MenuItem>
              <MenuItem value={3}>Electrical Engineering</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <motion.div
        key='ArrowBack1'
        variants={arrowAnimation}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <IconButton
          color='primary'
          sx={{ position: 'absolute', top: -140, left: 10 }}
          onClick={handleBack}
        >
          <ArrowBackIos />
        </IconButton>
      </motion.div>

      <Button
        variant='contained'
        endIcon={<ArrowForwardIos />}
        onClick={handleNext}
      >
        Next
      </Button>
    </Stack>
  );
};

export default StudentForm2;
