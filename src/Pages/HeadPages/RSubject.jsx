import { ArrowForwardIos } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
  Snackbar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useAuth from '../../Hooks/useAuth'
import useRegisterSubject from '../../Hooks/useRegisterSubject'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getAllSubjects } from '../../Services/API/getAllSubjectsRequest'
import { getSemesterById } from '../../Services/API/getSemesterByIdRequest'
import { getSubjectById } from '../../Services/API/getSubjectByIdRequest'
import { getPrograms } from '../../Services/API/programsRequest'
import { getSemester } from '../../Services/API/semesterRequest'
import { getSessions } from '../../Services/API/sessionsRequest'

const RSubject = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const theme = useTheme()
  const { token } = useAuth()
  const {
    submitForm,
    editMode,
    onClose,
    selectedSubject,
    setEditMode,
    setSelectedSubject,
    setSnackbar,
    snackbar,
    updateForm,
  } = useRegisterSubject()

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    values,
    setFieldValue,
  } = useFormik({
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
      department: Yup.string().required('Department is required'),
      program: Yup.string().required('Program is required'),
      session: Yup.string().required('Session is required'),
      semester: Yup.string().required('Semester is required'),
    }),
    onSubmit: editMode
      ? (values, { setErrors, setStatus, setSubmitting, resetForm }) =>
          updateForm(values, {
            setErrors,
            setStatus,
            setSubmitting,
            resetForm,
          })
      : (values, { setErrors, setStatus, setSubmitting, resetForm }) =>
          submitForm(values, {
            setErrors,
            setStatus,
            setSubmitting,
            resetForm,
          }),
  })

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
    ['programs', values.department],
    () => getPrograms(values.department),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: values.department !== '',
    },
  )

  const {
    isError: isSessionsError,
    isLoading: areSessionsLoading,
    data: sessionsData,
  } = useQuery(
    ['sessions', values.department, values.program],
    () => getSessions(values.department, values.program),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: values.department !== '' && values.program !== '',
    },
  )

  const {
    isError: isSemestersError,
    isLoading: areSemestersLoading,
    data: semestersData,
  } = useQuery(
    ['semester', values.department, values.program, values.session],
    () => getSemester(values.department, values.program, values.session),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled:
        values.department !== '' &&
        values.program !== '' &&
        values.session !== '',
    },
  )

  const {
    isError: isSubjectsError,
    isLoading: areSubjectsLoading,
    data: subjectsData,
  } = useQuery('all-subjects', () => getAllSubjects(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isSubjectError,
    isLoading: isSubjectLoading,
    data: subjectData,
  } = useQuery(
    ['subject', selectedSubject],
    () => getSubjectById(token, selectedSubject),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token && !!selectedSubject,
    },
  )

  useEffect(() => {
    if (!subjectData) return
    setFieldValue('subject_title', subjectData.subject_title)
    setFieldValue('type', subjectData.type)
    setFieldValue('department', subjectData.department)
    setFieldValue('program', subjectData.program)
    setFieldValue('session', subjectData.session)
    setFieldValue('semester', subjectData.semester)
    setFieldValue('subject_code', subjectData.subject_code)
    setFieldValue('theory_hours', subjectData.theory_hours)
    setFieldValue('lab_hours', subjectData.lab_hours)
  }, [subjectData])

  const selectSubject = subjectId => {
    setSelectedSubject(subjectId)
    setShowDrawer(false)
    setEditMode(true)
  }

  const drawer = (
    <Drawer
      anchor='right'
      open={showDrawer}
      onClose={() => setShowDrawer(prev => !prev)}
    >
      <Box sx={{ width: 300, overflowX: 'hidden' }}>
        <List>
          {subjectsData?.map(s => (
            <ListItem key={s._id} disablePadding>
              <ListItemButton onClick={() => selectSubject(s._id)}>
                <ListItemText
                  primary={s.subject_title}
                  secondary={s.subject_code}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Grid container flexWrap='nowrap'>
        <Grid item flexGrow={1}>
          <Grid container direction='column' width='100%'>
            <Grid item width='100%'>
              <Typography variant='h4'>Register Subject</Typography>
              <Typography gutterBottom>Enter the Subject details</Typography>
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
                    error={!!touched.subject_title && !!errors.subject_title}
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
                    error={!!touched.department && !!errors.department}
                  >
                    <InputLabel>Department</InputLabel>
                    <Select
                      labelId='department'
                      id='department'
                      value={values.department}
                      label='Departments'
                      disabled={
                        isDepartmentError || areDepartmentsLoading || editMode
                      }
                      required
                      onChange={handleChange('department')}
                      onBlur={handleBlur('department')}
                    >
                      {departmentsData?.map(d => (
                        <MenuItem value={d._id} key={d._id}>
                          {d.department_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!touched.department && (
                      <FormHelperText error>
                        {!!errors.department && 'Department is required'}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <FormControl
                    fullWidth
                    error={!!touched.program && !!errors.program}
                  >
                    <InputLabel>Program</InputLabel>
                    <Select
                      labelId='programs'
                      id='programs'
                      value={values.program}
                      label='Program'
                      required
                      disabled={
                        areProgramsLoading ||
                        isProgramsError ||
                        values.department === '' ||
                        editMode
                      }
                      onChange={handleChange('program')}
                      onBlur={handleBlur('program')}
                    >
                      {programsData?.map(p => (
                        <MenuItem key={p._id} value={p._id}>
                          {p.program_abbreviation}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!touched.program && (
                      <FormHelperText error>
                        {!!errors.program && 'Program is required'}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
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
                      disabled={
                        isSessionsError ||
                        areSessionsLoading ||
                        values.department === '' ||
                        values.program === '' ||
                        editMode
                      }
                      onChange={handleChange('session')}
                      onBlur={handleBlur('session')}
                    >
                      {sessionsData?.map(s => (
                        <MenuItem key={s._id} value={s._id}>
                          {s.session_title}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!touched.session && (
                      <FormHelperText error>
                        {!!errors.session && 'Seesion is required'}
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
                    value={parseInt(values.theory_hours)}
                    onBlur={handleBlur('theory_hours')}
                    onChange={handleChange('theory_hours')}
                  />
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <FormControl
                    fullWidth
                    error={!!touched.semester && !!errors.semester}
                  >
                    <InputLabel>Semester</InputLabel>
                    <Select
                      labelId='semester'
                      id='semester'
                      value={values.semester}
                      label='Semester'
                      required
                      disabled={
                        isSemestersError ||
                        areSemestersLoading ||
                        values.department === '' ||
                        values.program === '' ||
                        values.session === '' ||
                        editMode
                      }
                      onChange={handleChange('semester')}
                      onBlur={handleBlur('semester')}
                    >
                      {semestersData?.map(s => (
                        <MenuItem key={s._id} value={s._id}>
                          {s.semester_title}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!touched.semester && (
                      <FormHelperText error>
                        {!!errors.semester && 'Semester is required'}
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
                    value={parseInt(values.lab_hours)}
                    onBlur={handleBlur('lab_hours')}
                    onChange={handleChange('lab_hours')}
                  />
                </Grid>
              </Grid>

              <Button
                type='submit'
                variant='contained'
                sx={{ margin: '.5em .5em .5em 0' }}
                disabled={
                  areDepartmentsLoading ||
                  areProgramsLoading ||
                  areSessionsLoading ||
                  areSemestersLoading ||
                  isSubjectLoading ||
                  isSubmitting
                }
              >
                {isSubmitting ? (
                  <CircularProgress size={20} />
                ) : editMode ? (
                  'Update'
                ) : (
                  'Register'
                )}
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
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={onClose}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  )
}

export default RSubject
