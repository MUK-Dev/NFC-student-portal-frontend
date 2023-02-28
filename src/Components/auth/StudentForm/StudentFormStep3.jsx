/* eslint-disable no-unused-vars */
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
  Typography,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import * as Yup from 'yup'

import EndStudentRegisterModal from '../../Modal/EndStudentRegisterModal'

const StudentForm3 = ({
  setShowEmailModal,
  showEmailModal,
  handleBack,
  passwordRef,
  confirmRef,
  email,
  sendRequest,
  finalError,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()
  const [v, setV] = useState({
    showPassword: false,
    showConfirmPassword: false,
  })

  const handleClickShowPassword = () => {
    setV({
      ...v,
      showPassword: !v.showPassword,
    })
  }

  const handleClickShowConfirmPassword = () => {
    setV({
      ...v,
      showConfirmPassword: !v.showConfirmPassword,
    })
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

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
  }

  const submitForm = async (
    values,
    { setErrors, setStatus, setSubmitting },
  ) => {
    setIsLoading(true)
    if (values.password !== values.confirm) {
      setErrors({
        confirm: "Passwords don't match",
        password: "Passwords don't match",
      })
      setIsLoading(false)
      return
    }
    passwordRef.current = values.password
    confirmRef.current = values.confirm
    await sendRequest()
    setIsLoading(false)
  }

  const formikOptions = {
    initialValues: {
      password: passwordRef.current,
      confirm: confirmRef.current,
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(8, 'Must be atleast 8 characters')
        .max(255, 'Password has exceeded max limit')
        .required('Password is required'),
      confirm: Yup.string()
        .min(8, 'Must be atleast 8 characters')
        .max(255, 'Confirm Password has exceeded max limit')
        .required('Confirm Password is required'),
    }),
    onSubmit: submitForm,
  }

  return (
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
            <AnimatePresence mode='wait'>
              {isLoading ? (
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
                    type={v.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                          color={
                            !!touched.password && !!errors.password
                              ? 'error'
                              : 'default'
                          }
                        >
                          {v.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                  {!!touched.password && !!errors.password && (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  variant='outlined'
                  fullWidth
                  error={!!touched.confirm && !!errors.confirm}
                >
                  <InputLabel htmlFor='outlined-adornment-confirm-password'>
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-confirm-password'
                    type={v.showConfirmPassword ? 'text' : 'password'}
                    value={values.confirm}
                    onBlur={handleBlur('confirm')}
                    onChange={handleChange('confirm')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                          color={
                            !!touched.confirm && !!errors.confirm
                              ? 'error'
                              : 'default'
                          }
                        >
                          {v.showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Confirm Password'
                  />
                  {!!touched.confirm && !!errors.confirm && (
                    <FormHelperText error>{errors.confirm}</FormHelperText>
                  )}
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
            {!!finalError && (
              <Typography color='error' gutterBottom>
                {finalError}
              </Typography>
            )}

            <Button variant='contained' type='submit'>
              Register
            </Button>
          </Stack>
          <EndStudentRegisterModal open={showEmailModal} email={email} />
        </form>
      )}
    </Formik>
  )
}

export default StudentForm3
