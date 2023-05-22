import {
  Button,
  Collapse,
  Divider,
  Fade,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'

import useLogin from '../../Hooks/useLogin'

import AuthGuard from '../../Utils/AuthGuard'

import NFCLogo from '../../Assets/Images/NFC Iet Logo.png'

const Login = () => {
  const theme = useTheme()
  const { submitForm } = useLogin()
  const navigate = useNavigate()

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
  }

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
  }

  const formikOptions = {
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Email must be a valid email')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Must be atleast 8 characters')
        .max(255, 'Password has exceeded max limit')
        .required('Password is required'),
    }),
    onSubmit: submitForm,
  }

  return (
    <AuthGuard>
      <Formik {...formikOptions}>
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Fade in unmountOnExit style={{ transitionDelay: '500ms' }}>
              <Stack
                direction='column'
                justifyContent='center'
                alignItems='center'
                width='100%'
                minHeight='100vh'
              >
                <img
                  src={NFCLogo}
                  style={{ width: 100, height: 90 }}
                  alt='Logo'
                />
                <Typography variant='h5' gutterBottom>
                  Sign In
                </Typography>
                <AnimatePresence mode='wait'>
                  {isSubmitting ? (
                    <motion.div
                      key='Progress'
                      variants={opacityAnimate}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
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
                  <TextField
                    variant='outlined'
                    fullWidth
                    label='Email'
                    type='email'
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    error={!!touched.email && !!errors.email}
                    helperText={
                      !!touched.email && !!errors.email ? errors.email : ''
                    }
                  />
                  <TextField
                    variant='outlined'
                    fullWidth
                    label='Password'
                    type='password'
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    error={!!touched.password && !!errors.password}
                    helperText={
                      !!touched.password && !!errors.password
                        ? errors.password
                        : ''
                    }
                  />
                  <Typography
                    fontWeight={600}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate('/register')}
                  >
                    Register Instead?
                  </Typography>
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Stack>
            </Fade>
          </form>
        )}
      </Formik>
    </AuthGuard>
  )
}

export default Login
