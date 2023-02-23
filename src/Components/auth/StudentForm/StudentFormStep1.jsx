import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'

const StudentForm1 = ({
  animation,
  handleNext,
  reset,
  sessionRef,
  programRef,
  rollNoRef,
  sectionRef,
}) => {
  const theme = useTheme()
  const [_, setSearchParams] = useSearchParams()
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
    sessionRef.current = values.session
    programRef.current = values.program
    rollNoRef.current = values.rollNo
    sectionRef.current = values.section
    handleNext()
    setSubmitting(false)
  }

  const formikOptions = {
    initialValues: {
      session: sessionRef.current,
      program: programRef.current,
      rollNo: rollNoRef.current,
      section: sectionRef.current,
    },
    validationSchema: Yup.object().shape({
      session: Yup.string().required('Session is required'),
      program: Yup.string().required('Program is required'),
      rollNo: Yup.number('Roll No must be a number')
        .required('Roll No is required')
        .integer('Roll No should a number')
        .positive('Roll No should be positive'),
      section: Yup.string().required('Section is required'),
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
            component={motion.div}
            key='StudentForm'
            variants={animation}
            initial='initial'
            animate='animate'
            exit='exit'
            sx={{ position: 'relative' }}
          >
            <Typography variant='h5' gutterBottom>
              Enter University Information
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
                width='100%'
                gap='1em'
              >
                <TextField
                  variant='outlined'
                  label='Session'
                  placeholder='eg. 2k19'
                  fullWidth
                  onBlur={handleBlur('session')}
                  value={values.session}
                  onChange={handleChange('session')}
                  error={touched.session && errors.session}
                  helperText={
                    touched.session && errors.session ? errors.session : ''
                  }
                />
                <TextField
                  variant='outlined'
                  label='Program'
                  placeholder='eg. BSCS'
                  fullWidth
                  onBlur={handleBlur('program')}
                  value={values.program}
                  onChange={handleChange('program')}
                  error={touched.program && errors.program}
                  helperText={
                    touched.program && errors.program ? errors.program : ''
                  }
                />
              </Stack>

              <Stack
                direction='row'
                alignItems='flex-start'
                width='100%'
                gap='1em'
              >
                <TextField
                  variant='outlined'
                  label='Class Roll No.'
                  placeholder='eg. 301'
                  fullWidth
                  onBlur={handleBlur('rollNo')}
                  value={values.rollNo}
                  onChange={handleChange('rollNo')}
                  error={touched.rollNo && errors.rollNo}
                  helperText={
                    touched.rollNo && errors.rollNo ? errors.rollNo : ''
                  }
                />
                <TextField
                  variant='outlined'
                  label='Section'
                  placeholder='eg. Red'
                  fullWidth
                  onBlur={handleBlur('section')}
                  value={values.section}
                  onChange={handleChange('section')}
                  error={touched.section && errors.section}
                  helperText={
                    touched.section && errors.section ? errors.section : ''
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
                onClick={() => {
                  reset()
                  setSearchParams({ role: null })
                }}
              >
                <ArrowBackIos />
              </IconButton>
            </motion.div>

            <Button type='submit' variant='contained'>
              {isSubmitting ? <CircularProgress /> : 'Next'}
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  )
}

export default StudentForm1
