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
import useRegisterSemester from '../../Hooks/useRegisterSemester'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getAllSemesters } from '../../Services/API/getAllSmestersRequest'
import { getSemesterById } from '../../Services/API/getSemesterByIdRequest'
import { getPrograms } from '../../Services/API/programsRequest'
import { getSessions } from '../../Services/API/sessionsRequest'

const RSemester = () => {
  const theme = useTheme()
  const { token } = useAuth()
  const {
    submitForm,
    editMode,
    onClose,
    selectedSemester,
    setEditMode,
    setSelectedSemester,
    setSnackbar,
    snackbar,
    updateForm,
  } = useRegisterSemester()
  const [showDrawer, setShowDrawer] = useState(false)
  const [startDate, setStartDate] = useState(moment())
  const [endDate, setEndDate] = useState(moment())

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
      semester_title: '',
      type: '',
      starting: '',
      ending: '',
      department: '',
      program: '',
      session: '',
    },
    validationSchema: Yup.object().shape({
      semester_title: Yup.string().required('Semester Title is required'),
      type: Yup.string().required('Semester Type is required'),
      department: Yup.string().required('Department is required'),
      program: Yup.string().required('Program is required'),
      session: Yup.string().required('Session is required'),
    }),
    onSubmit: editMode
      ? (values, { setErrors, setStatus, setSubmitting, resetForm }) =>
          updateForm(values, startDate.toDate(), endDate.toDate(), {
            setErrors,
            setStatus,
            setSubmitting,
            resetForm,
          })
      : (values, { setErrors, setStatus, setSubmitting, resetForm }) =>
          submitForm(values, startDate.toDate(), endDate.toDate(), {
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

  const dateStartHandeler = newValue => {
    setStartDate(newValue)
  }

  const dateEndHandeler = newValue => {
    setEndDate(newValue)
  }

  const {
    isError: isSemestersError,
    isLoading: areSemestersLoading,
    data: semestersData,
  } = useQuery('all-semesters', () => getAllSemesters(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isSemesterError,
    isLoading: isSemesterLoading,
    data: semesterData,
  } = useQuery(
    ['semester', selectedSemester],
    () => getSemesterById(token, selectedSemester),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token && !!selectedSemester,
    },
  )

  useEffect(() => {
    if (!semesterData) return
    setFieldValue('semester_title', semesterData.semester_title)
    setFieldValue('type', semesterData.type)
    setStartDate(moment(semesterData.starting))
    setEndDate(moment(semesterData.ending))
    setFieldValue('department', semesterData.department)
    setFieldValue('program', semesterData.program)
    setFieldValue('session', semesterData.session)
  }, [semesterData])

  const selectSemester = semesterId => {
    setSelectedSemester(semesterId)
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
          {semestersData?.map(s => (
            <ListItem key={s._id} disablePadding>
              <ListItemButton onClick={() => selectSemester(s._id)}>
                <ListItemText
                  primary={s.semester_title}
                  secondary={`${s.department.department_abbreviation} - ${s.program.program_abbreviation} - ${s.type}`}
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
              <Typography variant='h4'>Register Semester</Typography>
              <Typography gutterBottom>Enter the Semester details</Typography>
            </Grid>
            <Grid item width='100%'>
              <Grid container width='100%'>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <FormControl
                    fullWidth
                    error={!!errors.semester_title && !!touched.semester_title}
                  >
                    <InputLabel>Semester Title</InputLabel>
                    <Select
                      labelId='semester_title'
                      id='semester_title'
                      value={values.semester_title}
                      label='Semester Title'
                      required
                      onChange={handleChange('semester_title')}
                    >
                      <MenuItem value={'1'}>1</MenuItem>
                      <MenuItem value={'2'}>2</MenuItem>
                      <MenuItem value={'3'}>3</MenuItem>
                      <MenuItem value={'4'}>4</MenuItem>
                      <MenuItem value={'5'}>5</MenuItem>
                      <MenuItem value={'6'}>6</MenuItem>
                      <MenuItem value={'7'}>7</MenuItem>
                      <MenuItem value={'8'}>8</MenuItem>
                      <MenuItem value={'9'}>9</MenuItem>
                      <MenuItem value={'10'}>10</MenuItem>
                    </Select>
                    {!!errors.semester_title && !!touched.semester_title && (
                      <FormHelperText error>
                        {errors.semester_title}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <FormControl
                    fullWidth
                    error={!!errors.type && !!touched.type}
                  >
                    <InputLabel>Semester Type</InputLabel>
                    <Select
                      labelId='type'
                      id='type'
                      value={values.type}
                      label='Semester Type'
                      required
                      onChange={handleChange('type')}
                    >
                      <MenuItem value={'normal'}>Normal</MenuItem>
                      <MenuItem value={'summer'}>Summer</MenuItem>
                    </Select>
                    {!!errors.type && !!touched.type && (
                      <FormHelperText error>{errors.type}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <MobileDatePicker
                    label='Starting Date'
                    inputFormat='MM/DD/YYYY'
                    value={startDate}
                    onChange={dateStartHandeler}
                    renderInput={params => <TextField {...params} fullWidth />}
                  />
                </Grid>

                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <MobileDatePicker
                    label='Ending Date'
                    inputFormat='MM/DD/YYYY'
                    value={endDate}
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
                        values.program === ''
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
              </Grid>

              <Button
                type='submit'
                variant='contained'
                disabled={
                  areDepartmentsLoading ||
                  areProgramsLoading ||
                  areSessionsLoading ||
                  isSemesterLoading ||
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
              Show Semesters
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

export default RSemester
