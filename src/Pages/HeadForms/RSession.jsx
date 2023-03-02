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

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getPrograms } from '../../Services/API/programsRequest'

const RSession = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const theme = useTheme()
  const { token } = useAuth()

  const [values, setValues] = useState({
    department: '',
    program: '',
  })
  const [errors, setErrors] = useState({
    department: null,
    program: null,
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
    ['programs', values.department],
    () => getPrograms(values.department),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms,
    },
  )

  const inputHandleChange = (key, keyName) => {
    setValues(prev => ({
      ...prev,
      [key]: keyName,
    }))
    console.log(key, keyName)
    console.log(values)
  }
  const [value, setValue] = useState(moment())

  const dateHandeler = newValue => {
    setValue(newValue)
  }

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
      session_type: '',
      starting: '',
      ending: '',
      department: '',
      program: '',
    },
    validationSchema: Yup.object().shape({
      session_title: Yup.string().required('Session Title is required'),
      session_type: Yup.string().required('Session Type is required'),
      department: Yup.string().required('Department is required'),
      program: Yup.string().required('Program is required'),
    }),
    onSubmit: (values, { setErrors, setStatus, setSubmitting }) =>
      submitForm(value, values, { setErrors, setStatus, setSubmitting }),
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
                      <FormControl fullWidth error>
                        <InputLabel>Program Type</InputLabel>
                        <Select
                          labelId='session_type'
                          id='session_type'
                          value={values.type}
                          label='PSession Type'
                          required
                          onChange={handleChange('session_type')}
                        >
                          <MenuItem value={10}>Spring</MenuItem>
                          <MenuItem value={20}>Fall</MenuItem>
                        </Select>
                        {!!errors.session_type && (
                          <FormHelperText error>
                            {errors.session_type}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <MobileDatePicker
                        views={['year']}
                        label='Starting Year'
                        inputFormat='YYYY'
                        value={value}
                        onChange={dateHandeler}
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
                        value={value}
                        onChange={dateHandeler}
                        renderInput={params => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl fullWidth error={!!errors.department}>
                        <InputLabel>Department</InputLabel>
                        <Select
                          labelId='department'
                          id='department'
                          value={values.department}
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
                        {!!errors.department && (
                          <FormHelperText error>
                            {errors.department}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <FormControl fullWidth error={!!errors.program}>
                        <InputLabel>Programs</InputLabel>
                        <Select
                          labelId='Programs'
                          id='programs'
                          value={values.program}
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
                        {!!errors.program && (
                          <FormHelperText error>
                            {errors.program}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Button
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
