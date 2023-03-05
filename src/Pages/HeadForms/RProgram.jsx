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

import useRegisterProgram from '../../Hooks/useRegisterProgram'

import { getDepartments } from '../../Services/API/departmentsRequest'

const RProgram = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const theme = useTheme()

  const [errors, setErrors] = useState({
    department: null,
  })

  const {
    isError: isDepartmentError,
    isLoading: areDepartmentsLoading,
    data: departmentsData,
  } = useQuery('departments', () => getDepartments(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const { submitForm } = useRegisterProgram()
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
            'Program 1',
            'Program 2',
            'Program 3',
            'Program 4',
            'Program 5',
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
      program_title: '',
      program_abbreviation: '',
      type: '',
      starting: '',
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
                  <Typography variant='h4'>Register Program</Typography>
                  <Typography gutterBottom>
                    Enter the Program details
                  </Typography>
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
                          <FormHelperText error>
                            {errors.department}
                          </FormHelperText>
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
                        error={
                          !!touched.program_title && !!errors.program_title
                        }
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
                          <MenuItem value={10}>1 Year</MenuItem>
                          <MenuItem value={20}>2 Year</MenuItem>
                          <MenuItem value={30}>3 Year</MenuItem>
                          <MenuItem value={40}>4 Year</MenuItem>
                          <MenuItem value={50}>5 Year</MenuItem>
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
                        value={value}
                        onChange={dateHandeler}
                        error={!!touched.starting && !!errors.starting}
                        helperText={
                          touched.starting && errors.starting
                            ? errors.starting
                            : ''
                        }
                        renderInput={params => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </Grid>

                    {/* <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Ending  Date'
                  type='text'
                  fullWidth
                  placeholder='mm/dd/yyyy'
                />
              </Grid> */}
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
                  Show Programs
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

export default RProgram
