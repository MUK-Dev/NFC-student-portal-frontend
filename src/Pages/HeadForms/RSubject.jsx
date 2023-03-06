import { ArrowForwardIos } from '@mui/icons-material'
import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useRegisterSubject from '../../Hooks/useRegisterSubjest'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getPrograms } from '../../Services/API/programsRequest'
import { getSemester } from '../../Services/API/semesterRequest'
import { getSessions } from '../../Services/API/sessionsRequest'

const RSubject = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const theme = useTheme()

  const [selectedValue, setSelectedValue] = useState({
    department: '',
    program: '',
    session: '',
    semester: '',
  })

  const [formErrors, setFormErrors] = useState({
    department: null,
    program: null,
    session: null,
    semester: null,
  })
  const [submitErrors, setSubmitErrors] = useState({
    department: true,
    program: true,
    session: true,
    semester: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enablePrograms, setEnablePrograms] = useState(false)
  const [enableSession, setEnableSession] = useState(false)
  const [enableSemester, setEnableSemester] = useState(false)

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
  } = useQuery(
    ['programs', selectedValue.department],
    () => getPrograms(selectedValue.department),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms,
    },
  )

  const {
    isError: isSessionsError,
    isLoading: areSessionsLoading,
    data: sessionsData,
  } = useQuery(
    ['sessions', selectedValue.department, selectedValue.program],
    () => getSessions(selectedValue.department, selectedValue.program),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms && enableSession,
    },
  )

  const {
    isError: isSemestersError,
    isLoading: areSemestersLoading,
    data: semestersData,
  } = useQuery(
    [
      'semester',
      selectedValue.department,
      selectedValue.program,
      selectedValue.session,
    ],
    () =>
      getSemester(
        selectedValue.department,
        selectedValue.program,
        selectedValue.session,
      ),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms && enableSession && enableSemester,
    },
  )

  const inputHandleChange = (key, keyName) => {
    setSelectedValue(prev => ({
      ...prev,
      [key]: keyName,
    }))
    if (key == 'department') {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
        program: true,
        session: true,
        semester: true,
      }))
    } else if (key == 'program') {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
        session: true,
        semester: true,
      }))
    } else if (key == 'session') {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
        semester: true,
      }))
    } else {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
      }))
    }
  }

  const { submitForm } = useRegisterSubject()

  const drawer = (
    <Drawer
      anchor='right'
      open={showDrawer}
      onClose={() => setShowDrawer(prev => !prev)}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {[
            'Subject 1',
            'Subject 2',
            'Subject 3',
            'Subject 4',
            'Subject 5',
          ].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )

  const formikOptions = {
    initialValues: {
      subject_title: '',
      type: '',
      subject_code: '',
      theory_hours: '0',
      lab_hours: '0',
      department: '',
      program: '',
      session: '',
      semester: '',
    },
    validationSchema: Yup.object().shape({
      subject_title: Yup.string().required('Subject Title is required'),
      type: Yup.string().required('Semester Type is required'),
      subject_code: Yup.string().required('Subject Code is required'),
      theory_hours: Yup.string().required(),
      lab_hours: Yup.string().required(),
    }),
    onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
      setFormErrors(() => ({
        department: submitErrors.department,
        program: submitErrors.program,
        session: submitErrors.session,
        semester: submitErrors.semester,
      }))
      // console.log(values, selectedValue)
      submitForm(values, selectedValue, {
        setErrors,
        setStatus,
        setSubmitting,
      })
    },
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
          <Grid container flexWrap='nowrap'>
            <Grid item flexGrow={1}>
              <Grid container direction='column' width='100%'>
                <Grid item width='100%'>
                  <Typography variant='h4'>Register Subject</Typography>
                  <Typography gutterBottom>
                    Enter the Subject details
                  </Typography>
                </Grid>
                <Grid item width='100%'>
                  <Grid container width='100%'>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='Subject Code'
                        type='text'
                        placeholder='CS-111'
                        value={values.subject_code}
                        onBlur={handleBlur('subject_code')}
                        onChange={handleChange('subject_code')}
                        error={!!touched.subject_code && !!errors.subject_code}
                        helperText={
                          touched.subject_code && errors.subject_code
                            ? errors.subject_code
                            : ''
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='Subject Title'
                        type='text'
                        placeholder='Programming Fundamental'
                        value={values.subject_title}
                        onBlur={handleBlur('subject_title')}
                        onChange={handleChange('subject_title')}
                        error={
                          !!touched.subject_title && !!errors.subject_title
                        }
                        helperText={
                          touched.subject_title && errors.subject_title
                            ? errors.subject_title
                            : ''
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl
                        fullWidth
                        error={!!errors.type && !!touched.type}
                      >
                        <InputLabel>Subject Type</InputLabel>
                        <Select
                          labelId='type'
                          id='type'
                          value={values.type}
                          label='Subject Type'
                          required
                          onChange={handleChange('type')}
                        >
                          <MenuItem value={'core'}>Core</MenuItem>
                          <MenuItem value={'elective'}>Elective</MenuItem>
                          <MenuItem value={'supply'}>Supply</MenuItem>
                        </Select>
                        {!!errors.type && !!touched.type && (
                          <FormHelperText error>{errors.type}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl
                        fullWidth
                        error={
                          !!formErrors.department && !!submitErrors.department
                        }
                      >
                        <InputLabel>Department</InputLabel>
                        <Select
                          labelId='department'
                          id='department'
                          value={selectedValue.department}
                          label='Departments'
                          disabled={isDepartmentError || areDepartmentsLoading}
                          required
                          onChange={e => {
                            inputHandleChange('department', e.target.value)
                            setEnablePrograms(true)
                          }}
                        >
                          {departmentsData?.map(d => (
                            <MenuItem value={d._id} key={d._id}>
                              {d.department_name}
                            </MenuItem>
                          ))}
                        </Select>
                        {!!formErrors.department && (
                          <FormHelperText error>
                            {!!submitErrors.department &&
                              'Department is required'}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl
                        fullWidth
                        error={!!formErrors.program && submitErrors.program}
                      >
                        <InputLabel>Program</InputLabel>
                        <Select
                          labelId='programs'
                          id='programs'
                          value={selectedValue.program}
                          label='Program'
                          required
                          disabled={
                            areProgramsLoading ||
                            isProgramsError ||
                            !enablePrograms
                          }
                          onChange={e => {
                            inputHandleChange('program', e.target.value)
                            setEnableSession(true)
                          }}
                        >
                          {programsData?.map(p => (
                            <MenuItem key={p._id} value={p._id}>
                              {p.program_abbreviation}
                            </MenuItem>
                          ))}
                        </Select>
                        {!!formErrors.program && (
                          <FormHelperText error>
                            {!!submitErrors.program && 'Program is required'}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl
                        fullWidth
                        error={!!formErrors.session && submitErrors.session}
                      >
                        <InputLabel>Session</InputLabel>
                        <Select
                          labelId='session'
                          id='session'
                          value={selectedValue.session}
                          label='Session'
                          required
                          disabled={
                            isSessionsError ||
                            areSessionsLoading ||
                            !enablePrograms ||
                            !enableSession
                          }
                          onChange={e => {
                            inputHandleChange('session', e.target.value)
                            setEnableSemester(true)
                          }}
                        >
                          {sessionsData?.map(s => (
                            <MenuItem key={s._id} value={s._id}>
                              {s.session_title}
                            </MenuItem>
                          ))}
                        </Select>
                        {!!formErrors.session && (
                          <FormHelperText error>
                            {!!submitErrors.session && 'Seesion is required'}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <Typography gutterBottom>Theory Credit Hours</Typography>
                      <Slider
                        aria-label='Theory Credit Hours'
                        valueLabelDisplay='auto'
                        marks
                        min={0}
                        max={5}
                        value={values.theory_hours}
                        onBlur={handleBlur('theory_hours')}
                        onChange={handleChange('theory_hours')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl
                        fullWidth
                        error={!!formErrors.semester && submitErrors.semester}
                      >
                        <InputLabel>Semester</InputLabel>
                        <Select
                          labelId='semester'
                          id='semester'
                          value={selectedValue.semester}
                          label='Semester'
                          required
                          disabled={
                            isSemestersError ||
                            areSemestersLoading ||
                            !enablePrograms ||
                            !enableSession ||
                            !enableSemester
                          }
                          onChange={e => {
                            inputHandleChange('semester', e.target.value)
                          }}
                        >
                          {semestersData?.map(s => (
                            <MenuItem key={s._id} value={s._id}>
                              {s.semester_title}
                            </MenuItem>
                          ))}
                        </Select>
                        {!!formErrors.semester && (
                          <FormHelperText error>
                            {!!submitErrors.semester && 'Semester is required'}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <Typography gutterBottom>Lab Credit Hours</Typography>
                      <Slider
                        aria-label='Theory Credit Hours'
                        valueLabelDisplay='auto'
                        marks
                        min={0}
                        max={5}
                        value={values.lab_hours}
                        onBlur={handleBlur('lab_hours')}
                        onChange={handleChange('lab_hours')}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ margin: '.5em .5em .5em 0' }}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                height='100%'
                onClick={() => setShowDrawer(prev => !prev)}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Typography
                  variant='caption'
                  sx={{
                    writingMode: 'vertical-rl',
                  }}
                >
                  Show Subjects
                </Typography>
                <ArrowForwardIos htmlColor={theme.palette.warning.main} />
              </Stack>
            </Grid>
            {drawer}
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default RSubject
