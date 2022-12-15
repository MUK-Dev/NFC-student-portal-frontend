import { useState } from 'react';
import {
  Button,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import NFCLogo from '../../Assets/Images/NFC Iet Logo.png';

const Login = () => {
  const [isLoading, setIsLoading] = useState();
  const theme = useTheme();
  const navigate = useNavigate();

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
      minHeight='100vh'
    >
      <img src={NFCLogo} style={{ width: 100, height: 90 }} alt='Logo' />
      <Typography variant='h5' gutterBottom>
        Sign In
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
              background: theme.palette.primary.main,
              borderRadius: '50px',
              width: '25%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1em',
            }}
          />
        )}
      </AnimatePresence>
      <Stack
        direction='column'
        alignItems='center'
        sx={{ paddingInline: '1em', width: '100%', gap: '1em' }}
      >
        <TextField variant='outlined' fullWidth label='Email' type='email' />
        <TextField
          variant='outlined'
          fullWidth
          label='Password'
          type='password'
        />
        <Typography
          fontWeight={600}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/register')}
        >
          Register Instead?
        </Typography>
        <Button variant='contained' onClick={() => navigate('/student/home')}>
          Sign In
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
