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
import useRegisterProgram from '../../Hooks/useRegisterProgram'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getAllPrograms } from '../../Services/API/getAllPrograms'
import { getProgramById } from '../../Services/API/getProgramByIdRequest'

const RProgram = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const theme = useTheme()
  const {
    submitForm,
    editMode,
    onClose,
    selectedProgram,
    setEditMode,
    setSelectedProgram,
    setSnackbar,
    snackbar,
    updateForm,
  } = useRegisterProgram()
  const [startingDate, setStartingDate] = useState(moment())
  const [endingDate, setEndingDate] = useState(moment())
  const { token } = useAuth()

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
  } = useQuery('all-programs', () => getAllPrograms(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isProgramError,
    isLoading: isProgramLoading,
    data: programData,
  } = useQuery(
    ['program', selectedProgram],
    () => getProgramById(token, selectedProgram),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token && !!selectedProgram,
    },
  )

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
      program_title: '',
      program_abbreviation: '',
      type: '',
      starting: '',
      ending: '',
      department: '',
    },
    validationSchema: Yup.object().shape({
      program_title: Yup.string().required('Program Title is required'),
      program_abbreviation: Yup.string().required(
        'Program Abbreviation is required',
      ),
      type: Yup.string().required('Program Type is required'),
      department: Yup.string().required('Department is required'),
    }),
    onSubmit: editMode
      ? (values, { setErrors, setStatus, setSubmitting, resetForm }) =>
          updateForm(startingDate, endingDate, values, {
            setErrors,
            setStatus,
            setSubmitting,
            resetForm,
          })
      : (values, { setErrors, setStatus, setSubmitting, resetForm }) =>
          submitForm(startingDate, values, {
            setErrors,
            setStatus,
            setSubmitting,
            resetForm,
          }),
  })

  useEffect(() => {
    if (!programData) return
    setFieldValue('program_title', programData.program_title)
    setFieldValue('program_abbreviation', programData.program_abbreviation)
    setFieldValue('type', programData.type)
    setFieldValue('department', programData.department)
    setStartingDate(moment(programData.starting))
    setEndingDate(moment(programData.ending))
  }, [programData])

  const dateHandeler = newValue => {
    setStartingDate(newValue)
  }

  const selectProgram = programId => {
    setSelectedProgram(programId)
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
          {programsData?.map(p => (
            <ListItem key={p._id} disablePadding>
              <ListItemButton onClick={() => selectProgram(p._id)}>
                <ListItemText
                  primary={p.program_title}
                  secondary={p.program_abbreviation}
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
              <Typography variant='h4'>Register Program</Typography>
              <Typography gutterBottom>Enter the Program details</Typography>
            </Grid>
            <Grid item width='100%'>
              <Grid container width='100%'>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <FormControl
                    fullWidth
                    error={!!errors.department && !!touched.department}
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
                    >
                      {departmentsData?.map(d => (
                        <MenuItem value={d._id} key={d._id}>
                          {d.department_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!errors.department && !!touched.department && (
                      <FormHelperText error>{errors.department}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Program Title'
                    type='text'
                    placeholder='Bachelor of Science in Computer Science'
                    value={values.program_title}
                    onBlur={handleBlur('program_title')}
                    onChange={handleChange('program_title')}
                    error={!!touched.program_title && !!errors.program_title}
                    helperText={
                      touched.program_title && errors.program_title
                        ? errors.program_title
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Program Abbreviation'
                    type='text'
                    placeholder='BSCS'
                    value={values.program_abbreviation}
                    onBlur={handleBlur('program_abbreviation')}
                    onChange={handleChange('program_abbreviation')}
                    error={
                      !!touched.program_abbreviation &&
                      !!errors.program_abbreviation
                    }
                    helperText={
                      touched.program_abbreviation &&
                      errors.program_abbreviation
                        ? errors.program_abbreviation
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
                    <InputLabel>Program Type</InputLabel>
                    <Select
                      labelId='type'
                      id='type'
                      value={values.type}
                      label='Program Type'
                      required
                      onChange={handleChange('type')}
                    >
                      <MenuItem value='1 Year'>1 Year</MenuItem>
                      <MenuItem value='2 Year'>2 Year</MenuItem>
                      <MenuItem value='3 Year'>3 Year</MenuItem>
                      <MenuItem value='4 Year'>4 Year</MenuItem>
                      <MenuItem value='5 Year'>5 Year</MenuItem>
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
                    value={startingDate}
                    onChange={dateHandeler}
                    error={!!touched.starting && !!errors.starting}
                    helperText={
                      touched.starting && errors.starting ? errors.starting : ''
                    }
                    renderInput={params => <TextField {...params} fullWidth />}
                  />
                </Grid>

                {editMode && (
                  <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                    <MobileDatePicker
                      label='Ending Date'
                      inputFormat='MM/DD/YYYY'
                      value={endingDate}
                      onChange={val => setEndingDate(val)}
                      error={!!touched.ending && !!errors.ending}
                      helperText={
                        touched.ending && errors.ending ? errors.ending : ''
                      }
                      renderInput={params => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                )}
              </Grid>

              <Button
                type='submit'
                variant='contained'
                disabled={
                  areDepartmentsLoading || isProgramLoading || isSubmitting
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
              Show Programs
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

export default RProgram
