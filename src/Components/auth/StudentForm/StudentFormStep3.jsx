/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Stack,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
  Button,
  Typography,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const StudentForm3 = ({ animation, handleBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const [values, setValues, _, setdepart] = useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

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

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        Almost Done 👨‍🎓
      </Typography>
      <Typography gutterBottom>This will be your Email. Save it</Typography>
      <Typography gutterBottom fontWeight={600}>
        2k19bscs313@undergrad.nfciet.edu.pk
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
              height: '4px',
              width: '25%',
              background: theme.palette.primary.main,
              borderRadius: '50px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1em',
            }}
          />
        )}
      </AnimatePresence>
      <Stack gap='1em' padding='1em' width='100%'>
        <Stack
          direction='column'
          alignItems='center'
          sx={{ width: '100%', gap: '1em' }}
        >
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
          <FormControl variant='outlined' fullWidth>
            <InputLabel htmlFor='outlined-adornment-confirm-password'>
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-confirm-password'
              type={values.showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label='Confirm Password'
            />
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

      <Button variant='contained' onClick={() => setIsLoading((prev) => !prev)}>
        Register
      </Button>
    </Stack>
  );
};

export default StudentForm3;
