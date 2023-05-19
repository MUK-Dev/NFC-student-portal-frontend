import { ArrowForwardIos } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Formik, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useAuth from '../../Hooks/useAuth'
import useRegisterDepartment from '../../Hooks/useRegisterDepartment'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getDepartmentById } from '../../Services/API/getDepartmentRequest'

const RDepartment = () => {
  const [showDrawer, setShowDrawer] = useState(false)

  const {
    submitForm,
    updateForm,
    snackbar,
    editMode,
    selectedDepartment,
    setEditMode,
    setSelectedDepartment,
    onClose,
  } = useRegisterDepartment()
  const { token } = useAuth()
  const theme = useTheme()

  const {
    isError: isDepartmentsError,
    isLoading: areDepartmentsLoading,
    data: departmentsData,
  } = useQuery('departments', () => getDepartments(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isDepartmentError,
    isLoading: isDepartmentLoading,
    data: departmentData,
  } = useQuery(
    ['departments', selectedDepartment],
    () => getDepartmentById(token, selectedDepartment),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token && !!selectedDepartment,
    },
  )

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: '',
      abbreviation: '',
      lat: '',
      lng: '',
      noOfPrograms: '',
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
    }),
    onSubmit: editMode
      ? (values, formikHelpers) =>
          updateForm(selectedDepartment, values, formikHelpers)
      : submitForm,
  })

  useEffect(() => {
    if (!departmentData) return
    setFieldValue('name', departmentData.department_name)
    setFieldValue('abbreviation', departmentData.department_abbreviation)
    setFieldValue('lat', departmentData.location.lat)
    setFieldValue('lng', departmentData.location.lng)
    setFieldValue('noOfPrograms', departmentData.no_of_programs)
  }, [departmentData])

  const selectDepartment = departmentId => {
    setSelectedDepartment(departmentId)
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
          {departmentsData?.map(d => (
            <ListItem key={d._id} disablePadding>
              <ListItemButton onClick={() => selectDepartment(d._id)}>
                <ListItemText primary={d.department_name} />
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
              <Typography variant='h4'>Register Department</Typography>
              <Typography gutterBottom>Enter the department details</Typography>
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
                    helperText={touched.name && errors.name ? errors.name : ''}
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
              </Grid>
              <Button
                type='submit'
                variant='contained'
                disabled={isSubmitting}
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
              Show registered departments
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

export default RDepartment
