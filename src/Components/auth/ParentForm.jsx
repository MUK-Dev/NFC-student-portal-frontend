import { useState } from 'react';
import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
  FormControl,
  Stack,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ParentForm = ({ animation }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [values, setValues, _, setdepart] = useState({
    password: '',
    showPassword: false,
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setdepart(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const opacityAnimate = {
    initial: {
      // opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      // opacity: 0,
    },
  };

  const opacityAnimateDivider = {
    initial: {
      // opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      background: 'rgb(200,171,169)',
    },
  };

  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      width='100%'
      component={motion.div}
      key='ParentForm'
      variants={animation}
      initial='initial'
      animate='animate'
      exit='exit'
      sx={{ position: 'relative' }}
    >
      <Typography variant='h5' gutterBottom>
        Register as a Parent
      </Typography>
      <AnimatePresence mode='wait'>
        {isLoading ? (
          <motion.div
            key='Progress'
            variants={opacityAnimate}
            initial='initial'
            animate='animate'
            exit='exit'
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <LinearProgress
              sx={{
                width: '25%',
                marginBottom: '1em',
              }}
            />
          </motion.div>
        ) : (
          <Divider
            key='Divider'
            variants={opacityAnimateDivider}
            initial='initial'
            animate='animate'
            exit='exit'
            component={motion.div}
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
        )}
      </AnimatePresence>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        width='100%'
        sx={{ position: 'relative' }}
      >
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
            <TextField
              variant='outlined'
              label='Email'
              type='email'
              fullWidth
            />
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
            </FormControl>
          </Stack>
        </Stack>
        <Button variant='contained' onClick={() => navigate('/student/home')}>
          Register
        </Button>
        <IconButton
          color='primary'
          sx={{ position: 'absolute', top: -70, left: 10 }}
          onClick={() => setSearchParams({ role: null })}
        >
          <ArrowBackIos />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ParentForm;
