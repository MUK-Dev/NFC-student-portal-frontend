import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import { motion } from 'framer-motion'
import * as Yup from 'yup'

import useAuth from '../../../Hooks/useAuth'

const StudentForm2 = ({
  handleNext,
  handleBack,
  genderRef,
  nameRef,
  rollNoRef,
  phoneNoRef,
}) => {
  const theme = useTheme()

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
    setSubmitting(true)
    nameRef.current = values.name
    phoneNoRef.current = values.phoneNo
    rollNoRef.current = values.rollNo
    genderRef.current = values.gender
    handleNext()
    setSubmitting(false)
  }

  const formikOptions = {
    initialValues: {
      name: nameRef.current,
      phoneNo: phoneNoRef.current,
      gender: genderRef.current,
      rollNo: rollNoRef.current,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Session is required'),
      phoneNo: Yup.string().required('Phone No is required'),
      gender: Yup.string().required('Gender is required'),
      rollNo: Yup.number('Roll No must be a number')
        .required('Roll No is required')
        .integer('Roll No should a number')
        .positive('Roll No should be positive'),
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
                alignItems='flex-start'
                sx={{ width: '100%', gap: '1em' }}
              >
                <TextField
                  variant='outlined'
                  label='Full Name'
                  placeholder='Full-Name'
                  fullWidth
                  onBlur={handleBlur('name')}
                  value={values.name}
                  onChange={handleChange('name')}
                  error={!!touched.name && !!errors.name}
                  helperText={
                    !!touched.name && !!errors.name ? errors.name : ''
                  }
                />
                <TextField
                  variant='outlined'
                  label='Phone No.'
                  placeholder='eg. 0300000000'
                  fullWidth
                  onBlur={handleBlur('phoneNo')}
                  value={values.phoneNo}
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
                <FormControl
                  fullWidth
                  error={!!touched.gender && !!errors.gender}
                >
                  <InputLabel>Gender</InputLabel>
                  <Select
                    labelId='gender'
                    id='gender'
                    value={values.gender}
                    label='Gender'
                    required
                    onChange={handleChange('gender')}
                  >
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                    <MenuItem value='other'>Other</MenuItem>
                  </Select>
                  {!!touched.gender && !!errors.gender && (
                    <FormHelperText error>{errors.gender}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  variant='outlined'
                  label='Class Roll No.'
                  placeholder='eg. 301'
                  fullWidth
                  onBlur={handleBlur('rollNo')}
                  value={values.rollNo}
                  onChange={handleChange('rollNo')}
                  error={!!touched.rollNo && !!errors.rollNo}
                  helperText={
                    !!touched.rollNo && !!errors.rollNo ? errors.rollNo : ''
                  }
                />
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
              type='submit'
              variant='contained'
              endIcon={<ArrowForwardIos />}
            >
              Next
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  )
}

export default StudentForm2
