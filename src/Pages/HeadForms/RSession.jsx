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
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { Formik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useAuth from '../../Hooks/useAuth'
import useRegisterSession from '../../Hooks/useRegisterSession'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getPrograms } from '../../Services/API/programsRequest'

const RSession = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const theme = useTheme()
  const { token } = useAuth()

  const [selectedValue, setSelectedValue] = useState({
    department: '',
    program: '',
  })

  const [formErrors, setFormErrors] = useState({
    department: null,
    program: null,
  })
  const [submitErrors, setSubmitErrors] = useState({
    department: true,
    program: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enablePrograms, setEnablePrograms] = useState(false)

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
      }))
    } else {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
      }))
    }
  }

  const [startYear, setStartYear] = useState(moment())

  const dateStartHandeler = newValue => {
    setStartYear(newValue)
  }

  const [endYear, setEndYear] = useState(moment())

  const dateEndHandeler = newValue => {
    setEndYear(newValue)
  }

  const { submitForm } = useRegisterSession()

  const drawer = (
    <Drawer
      anchor='right'
      open={showDrawer}
      onClose={() => setShowDrawer(prev => !prev)}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {[
            'Session 1',
            'Session 2',
            'Session 3',
            'Session 4',
            'Session 5',
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
    }),
    onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
      setFormErrors(() => ({
        department: submitErrors.department,
        program: submitErrors.program,
      }))
      submitForm(values, selectedValue, startYear.toDate(), endYear.toDate(), {
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
                  <Typography variant='h4'>Register Session</Typography>
                  <Typography gutterBottom>
                    Enter the Session details
                  </Typography>
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
                        error={
                          !!touched.session_title && !!errors.session_title
                        }
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
                        renderInput={params => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <MobileDatePicker
                        views={['year']}
                        label='Ending Year'
                        inputFormat='YYYY'
                        value={endYear}
                        onChange={dateEndHandeler}
                        renderInput={params => (
                          <TextField {...params} fullWidth />
                        )}
                      />
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
                        <InputLabel>Programs</InputLabel>
                        <Select
                          labelId='programs'
                          id='programs'
                          value={selectedValue.program}
                          label='Programs'
                          required
                          disabled={
                            areProgramsLoading ||
                            isProgramsError ||
                            !enablePrograms
                          }
                          onChange={e => {
                            inputHandleChange('program', e.target.value)
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
                  Show Sessions
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

export default RSession
