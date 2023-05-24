import { ArrowBackIos } from '@mui/icons-material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'

import useRegisterParent from '../../Hooks/useRegisterParent'

const ParentForm = ({ animation }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [, setSearchParams] = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const { submitForm } = useRegisterParent()

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: '',
      phoneNo: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Mame is required'),
      phoneNo: Yup.string().required('Phone no is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: submitForm,
  })

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

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
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
              alignItems='flex-start'
              sx={{ width: '100%', gap: '1em' }}
            >
              <TextField
                variant='outlined'
                label='Full Name'
                type='text'
                fullWidth
                value={values.name}
                onBlur={handleBlur('name')}
                onChange={handleChange('name')}
                error={!!touched.name && !!errors.name}
                helperText={!!touched.name && !!errors.name ? errors.name : ''}
              />
              <TextField
                variant='outlined'
                label='Phone No'
                type='text'
                fullWidth
                value={values.phoneNo}
                onBlur={handleBlur('phoneNo')}
                onChange={handleChange('phoneNo')}
                error={!!touched.phoneNo && !!errors.phoneNo}
                helperText={
                  !!touched.phoneNo && !!errors.phoneNo ? errors.phoneNo : ''
                }
              />
            </Stack>
            <Stack
              direction='row'
              alignItems='flex-start'
              sx={{ width: '100%', gap: '1em' }}
            >
              <TextField
                variant='outlined'
                label='Email'
                type='text'
                fullWidth
                value={values.email}
                onBlur={handleBlur('email')}
                onChange={handleChange('email')}
                error={!!touched.email && !!errors.email}
                helperText={
                  !!touched.email && !!errors.email ? errors.email : ''
                }
              />
              <FormControl
                variant='outlined'
                fullWidth
                error={!!touched.password && !!errors.password}
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                />
                {!!touched.password && (
                  <FormHelperText error>
                    {!!errors.password ? errors.password : ''}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </Stack>
          <Button variant='contained' type='submit'>
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
    </form>
  )
}

export default ParentForm
