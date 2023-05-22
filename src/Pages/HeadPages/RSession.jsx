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
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { Formik, useFormik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useAuth from '../../Hooks/useAuth'
import useRegisterSession from '../../Hooks/useRegisterSession'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getAllSessions } from '../../Services/API/getAllSessionsRequest'
import { getSessionById } from '../../Services/API/getSessionByIdRequest'
import { getPrograms } from '../../Services/API/programsRequest'

const RSession = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [startYear, setStartYear] = useState(moment())
  const [endYear, setEndYear] = useState(moment())
  const theme = useTheme()
  const {
    submitForm,
    editMode,
    onClose,
    selectedSession,
    setEditMode,
    setSelectedSession,
    snackbar,
    updateForm,
  } = useRegisterSession()
  const { token } = useAuth()

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
      session_title: '',
      type: '',
      starting: '',
      ending: '',
      department: '',
      program: '',
    },
    validationSchema: Yup.object().shape({
      session_title: Yup.string().required('Session Title is required'),
      type: Yup.string().required('Session Type is required'),
      department: Yup.string().required('Department is required'),
      program: Yup.string().required('Program is required'),
    }),
    onSubmit: editMode
      ? (values, { setErrors, setStatus, setSubmitting, resetForm }) =>
          updateForm(values, startYear.toDate(), endYear.toDate(), {
            setErrors,
            setStatus,
            setSubmitting,
            resetForm,
          })
      : (values, { setErrors, setStatus, setSubmitting, resetForm }) =>
          submitForm(values, startYear.toDate(), endYear.toDate(), {
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
  } = useQuery('all-sessions', () => getAllSessions(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isSessionError,
    isLoading: isSessionLoading,
    data: sessionData,
  } = useQuery(
    ['session', selectedSession],
    () => getSessionById(token, selectedSession),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token && !!selectedSession,
    },
  )

  useEffect(() => {
    if (!sessionData) return
    setFieldValue('session_title', sessionData.session_title)
    setFieldValue('type', sessionData.type)
    setFieldValue('department', sessionData.department)
    setFieldValue('program', sessionData.program)
    setStartYear(moment(sessionData.starting_year))
    setEndYear(moment(sessionData.ending_year))
  }, [sessionData])

  const dateStartHandeler = newValue => {
    setStartYear(newValue)
  }

  const dateEndHandeler = newValue => {
    setEndYear(newValue)
  }

  const selectSession = sessionId => {
    setSelectedSession(sessionId)
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
          {sessionsData?.map(s => (
            <ListItem key={s._id} disablePadding>
              <ListItemButton onClick={() => selectSession(s._id)}>
                <ListItemText
                  primary={s.session_title}
                  secondary={`${s.department.department_abbreviation} - ${
                    s.program.program_abbreviation
                  } - ${moment(s.starting_year).format('YYYY')} - ${moment(
                    s.ending_year,
                  ).format('YYYY')}`}
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
              <Typography variant='h4'>Register Session</Typography>
              <Typography gutterBottom>Enter the Session details</Typography>
            </Grid>
            <Grid item width='100%'>
              <Grid container width='100%'>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Session Title'
                    type='text'
                    placeholder='2K19'
                    value={values.session_title}
                    onBlur={handleBlur('session_title')}
                    onChange={handleChange('session_title')}
                    error={!!touched.session_title && !!errors.session_title}
                    helperText={
                      touched.session_title && errors.session_title
                        ? errors.session_title
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
                    <InputLabel>Session Type</InputLabel>
                    <Select
                      labelId='type'
                      id='type'
                      value={values.type}
                      label='Session Type'
                      required
                      onChange={handleChange('type')}
                      onBlur={handleBlur('type')}
                    >
                      <MenuItem value={'spring'}>Spring</MenuItem>
                      <MenuItem value={'fall'}>Fall</MenuItem>
                    </Select>
                    {!!errors.type && !!touched.type && (
                      <FormHelperText error>{errors.type}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <MobileDatePicker
                    views={['year']}
                    label='Starting Year'
                    inputFormat='YYYY'
                    value={startYear}
                    onChange={dateStartHandeler}
                    renderInput={params => <TextField {...params} fullWidth />}
                  />
                </Grid>

                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <MobileDatePicker
                    views={['year']}
                    label='Ending Year'
                    inputFormat='YYYY'
                    value={endYear}
                    onChange={dateEndHandeler}
                    renderInput={params => <TextField {...params} fullWidth />}
                  />
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
                      disabled={isDepartmentError || areDepartmentsLoading}
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
                    error={!!touched.program && errors.program}
                  >
                    <InputLabel>Programs</InputLabel>
                    <Select
                      labelId='programs'
                      id='programs'
                      value={values.program}
                      label='Programs'
                      required
                      disabled={
                        areProgramsLoading ||
                        isProgramsError ||
                        values.department === ''
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
              </Grid>

              <Button
                type='submit'
                variant='contained'
                disabled={
                  isSessionLoading ||
                  areProgramsLoading ||
                  areDepartmentsLoading ||
                  isSubmitting
                }
                sx={{ margin: '.5em .5em .5em 0' }}
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
              Show Sessions
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

export default RSession
