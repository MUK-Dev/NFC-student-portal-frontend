import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import {
  Button,
  CircularProgress,
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
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'

import { getDepartments } from '../../../Services/API/departmentsRequest'
import { getPrograms } from '../../../Services/API/programsRequest'
import { getSections } from '../../../Services/API/sectionsRequest'
import { getSessions } from '../../../Services/API/sessionsRequest'

const StudentForm1 = ({
  animation,
  handleNext,
  reset,
  sessionRef,
  programRef,
  departmentRef,
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

  const {
    isError: isDepartmentError,
    isLoading: areDepartmentsLoading,
    data: departmentsData,
  } = useQuery('departments', () => getDepartments(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isProgramsError,
    isLoading: areProgramsLoading,
    data: programsData,
  } = useQuery('programs', () => getPrograms(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isSessionsError,
    isLoading: areSessionsLoading,
    data: sessionsData,
  } = useQuery('sessions', () => getSessions(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isSectionsError,
    isLoading: areSectionsLoading,
    data: sectionsData,
  } = useQuery('sections', () => getSections(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const submitForm = async (
    values,
    { setErrors, setStatus, setSubmitting },
  ) => {
    setSubmitting(true)
    sessionRef.current = values.session
    programRef.current = values.program
    departmentRef.current = values.department
    sectionRef.current = values.section
    handleNext()
    setSubmitting(false)
  }

  const formikOptions = {
    initialValues: {
      session: sessionRef.current,
      program: programRef.current,
      department: departmentRef.current,
      section: sectionRef.current,
    },
    validationSchema: Yup.object().shape({
      session: Yup.string().required('Session is required'),
      program: Yup.string().required('Program is required'),
      department: Yup.string().required('Department is required'),
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
                <FormControl
                  fullWidth
                  error={!!touched.department && !!errors.department}
                >
                  <InputLabel>Department</InputLabel>
                  <Select
                    labelId='department'
                    id='department'
                    value={values.department}
                    label='Departments'
                    required
                    onBlur={handleBlur('department')}
                    onChange={handleChange('department')}
                  >
                    {departmentsData?.map(d => (
                      <MenuItem value={d._id} key={d._id}>
                        {d.department_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!touched.department && !!errors.department && (
                    <FormHelperText error>{errors.department}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  error={!!touched.program && !!errors.program}
                >
                  <InputLabel>Programs</InputLabel>
                  <Select
                    labelId='Programs'
                    id='programs'
                    value={values.program}
                    label='Programs'
                    required
                    disabled={areProgramsLoading || isProgramsError}
                    onBlur={handleBlur('program')}
                    onChange={handleChange('program')}
                  >
                    {programsData?.map(p => (
                      <MenuItem key={p._id} value={p._id}>
                        {p.program_abbreviation}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!touched.program && !!errors.program && (
                    <FormHelperText error>{errors.program}</FormHelperText>
                  )}
                </FormControl>
              </Stack>

              <Stack
                direction='row'
                alignItems='flex-start'
                width='100%'
                gap='1em'
              >
                <FormControl
                  fullWidth
                  error={!!touched.session && !!errors.session}
                >
                  <InputLabel>Session</InputLabel>
                  <Select
                    labelId='session'
                    id='session'
                    value={values.session}
                    label='Session'
                    required
                    onBlur={handleBlur('session')}
                    onChange={handleChange('session')}
                  >
                    {sessionsData?.map(s => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.session_title}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!touched.session && !!errors.session && (
                    <FormHelperText error>{errors.session}</FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  error={!!touched.section && !!errors.section}
                >
                  <InputLabel htmlFor='section'>Section</InputLabel>
                  <Select
                    id='section'
                    value={values.section}
                    label='Section'
                    required
                    disabled={areSectionsLoading || isSectionsError}
                    onChange={handleChange('section')}
                    onBlur={handleBlur('section')}
                  >
                    {sectionsData?.map(s => (
                      <MenuItem value={s._id} key={s._id}>
                        {s.section_title}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!touched.section && !!errors.section && (
                    <FormHelperText error>{errors.section}</FormHelperText>
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
