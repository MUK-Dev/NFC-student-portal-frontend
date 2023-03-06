import { ArrowForwardIos } from '@mui/icons-material'
import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useRegisterDepartment from '../../Hooks/useRegisterDepartment'

import { getDepartments } from '../../Services/API/departmentsRequest'

/* 
------ MUST READ ------
Keep the files structure similar.
Each group must have similar folder with their
group leader name's first letter and G followed by a - and Folder Name
e.g: IG-HeadForms for Idrees Group
UG = Usman Group
RDepartment = Register Department
*/

const RDepartment = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const theme = useTheme()
  const {
    isError: isDepartmentError,
    isLoading: areDepartmentsLoading,
    data: departmentsData,
  } = useQuery('departments', () => getDepartments(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const { submitForm } = useRegisterDepartment()

  const drawer = (
    <Drawer
      anchor='right'
      open={showDrawer}
      onClose={() => setShowDrawer(prev => !prev)}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {departmentsData?.map(d => (
            <ListItem key={d._id} disablePadding>
              <ListItemButton>
                <ListItemText primary={d.department_name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )

  const formikOptions = {
    initialValues: {
      name: '',
      abbreviation: '',
      lat: '',
      lng: '',
      noOfPrograms: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Department name is required'),
      abbreviation: Yup.string().required('Abbreviation is required'),
      lat: Yup.number('Latitude must be a number')
        .required('Latitude is required')
        .integer('Latitude should a number')
        .positive('Latitude should be positive'),
      lng: Yup.number('Longitude must be a number')
        .required('Longitude is required')
        .integer('Longitude should a number')
        .positive('Longitude should be positive'),
      noOfPrograms: Yup.string().required('Must specify No of Programs'),
      description: Yup.string().required('Description is required'),
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
          <Grid container flexWrap='nowrap'>
            <Grid item flexGrow={1}>
              <Grid container direction='column' width='100%'>
                <Grid item width='100%'>
                  <Typography variant='h4'>Register Department</Typography>
                  <Typography gutterBottom>
                    Enter the department details
                  </Typography>
                </Grid>
                <Grid item width='100%'>
                  <Grid container width='100%'>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='Department Name'
                        type='text'
                        placeholder='Computer Science'
                        fullWidth
                        value={values.name}
                        onBlur={handleBlur('name')}
                        onChange={handleChange('name')}
                        error={!!touched.name && !!errors.name}
                        helperText={
                          touched.name && errors.name ? errors.name : ''
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='Department Abbreviation'
                        type='text'
                        placeholder='CS'
                        fullWidth
                        value={values.abbreviation}
                        onBlur={handleBlur('abbreviation')}
                        onChange={handleChange('abbreviation')}
                        error={!!touched.abbreviation && !!errors.abbreviation}
                        helperText={
                          touched.abbreviation && errors.abbreviation
                            ? errors.abbreviation
                            : ''
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='Department Latitude'
                        type='number'
                        placeholder='234'
                        fullWidth
                        value={values.lat}
                        onBlur={handleBlur('lat')}
                        onChange={handleChange('lat')}
                        error={!!touched.lat && !!errors.lat}
                        helperText={touched.lat && errors.lat ? errors.lat : ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='Department Longitude'
                        type='number'
                        placeholder='21'
                        fullWidth
                        value={values.lng}
                        onBlur={handleBlur('lng')}
                        onChange={handleChange('lng')}
                        error={!!touched.lng && !!errors.lng}
                        helperText={touched.lng && errors.lng ? errors.lng : ''}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='No. of Programs'
                        type='number'
                        placeholder='3'
                        fullWidth
                        value={values.noOfPrograms}
                        onBlur={handleBlur('noOfPrograms')}
                        onChange={handleChange('noOfPrograms')}
                        error={!!touched.noOfPrograms && !!errors.noOfPrograms}
                        helperText={
                          touched.noOfPrograms && errors.noOfPrograms
                            ? errors.noOfPrograms
                            : ''
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='Department Description'
                        type='text'
                        placeholder='This department delivers courses related to Computers'
                        fullWidth
                        value={values.description}
                        onBlur={handleBlur('description')}
                        onChange={handleChange('description')}
                        error={!!touched.description && !!errors.description}
                        helperText={
                          touched.description && errors.description
                            ? errors.description
                            : ''
                        }
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
                  Show Departments
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

export default RDepartment
