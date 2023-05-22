import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useAuth from '../../Hooks/useAuth'
import useUpdateStudent from '../../Hooks/useUpdateStudent'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getStudentById } from '../../Services/API/getStudentById'
import { getPrograms } from '../../Services/API/programsRequest'
import { getSections } from '../../Services/API/sectionsRequest'
import { getSessions } from '../../Services/API/sessionsRequest'

const UpdateStudent = () => {
  const { token } = useAuth()
  const { onClose, setSnackbar, snackbar, studentId, updateForm } =
    useUpdateStudent()

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
      name: '',
      email: '',
      phoneNo: '',
      password: '',
      gender: '',
      rollNo: '',
      department: '',
      program: '',
      session: '',
      section: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required'),
      phoneNo: Yup.string().required('Phone no is required'),
      password: Yup.string().required('Password is required'),
      gender: Yup.string().required('Gender is required'),
      rollNo: Yup.string().required('Roll no is required'),
      department: Yup.string().required('Department is required'),
      program: Yup.string().required('Program is required'),
      session: Yup.string().required('Session is required'),
      section: Yup.string().required('Section is required'),
    }),
    onSubmit: updateForm,
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
    isError: isSectionsError,
    isLoading: areSectionsLoading,
    data: sectionsData,
  } = useQuery(
    ['sections', values.department, values.program, values.session],
    () => getSections(values.department, values.program, values.session),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled:
        values.department !== '' &&
        values.program !== '' &&
        values.session !== '',
    },
  )

  const {
    isError: isStudentError,
    isLoading: isStudentLoading,
    data: studentData,
  } = useQuery(['student', studentId], () => getStudentById(token, studentId), {
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!token && !!studentId,
  })

  useEffect(() => {
    if (!studentData) return
    setFieldValue('name', studentData?.name)
    setFieldValue('email', studentData?.email)
    setFieldValue('phoneNo', studentData?.phoneNo)
    setFieldValue('rollNo', studentData?.rollNo)
    setFieldValue('gender', studentData?.gender ?? '')
    setFieldValue('department', studentData?.department)
    setFieldValue('program', studentData?.program)
    setFieldValue('session', studentData?.session)
    setFieldValue('section', studentData?.section)
  }, [studentData])

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Grid container flexWrap='nowrap'>
        <Grid item flexGrow={1}>
          <Grid container direction='column' width='100%'>
            <Grid item width='100%'>
              <Typography variant='h4' gutterBottom>
                Update student details
              </Typography>
            </Grid>
            <Grid item width='100%'>
              <Grid container width='100%'>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Name'
                    type='text'
                    value={values.name}
                    disabled={isStudentLoading}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name ? errors.name : ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Email'
                    type='text'
                    disabled={isStudentLoading}
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    error={!!touched.email && !!errors.email}
                    helperText={
                      touched.email && errors.email ? errors.email : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Phone no'
                    type='text'
                    disabled={isStudentLoading}
                    value={values.phoneNo}
                    onBlur={handleBlur('phoneNo')}
                    onChange={handleChange('phoneNo')}
                    error={!!touched.phoneNo && !!errors.phoneNo}
                    helperText={
                      touched.phoneNo && errors.phoneNo ? errors.phoneNo : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Password'
                    type='text'
                    disabled={isStudentLoading}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    error={!!touched.password && !!errors.password}
                    helperText={
                      touched.password && errors.password
                        ? errors.password
                        : 'Enter old or new password'
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Roll no'
                    type='text'
                    disabled={isStudentLoading}
                    value={values.rollNo}
                    onBlur={handleBlur('rollNo')}
                    onChange={handleChange('rollNo')}
                    error={!!touched.rollNo && !!errors.rollNo}
                    helperText={
                      touched.rollNo && errors.rollNo ? errors.rollNo : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <FormControl
                    fullWidth
                    error={!!errors.gender && !!touched.gender}
                  >
                    <InputLabel>Gender</InputLabel>
                    <Select
                      labelId='gender'
                      id='gender'
                      value={values.gender}
                      label='Gender'
                      disabled={isStudentLoading}
                      required
                      onChange={handleChange('gender')}
                      onBlur={handleBlur('gender')}
                    >
                      <MenuItem value='male'>Male</MenuItem>
                      <MenuItem value='female'>Female</MenuItem>
                      <MenuItem value='other'>Other</MenuItem>
                    </Select>
                    {!!errors.gender && !!touched.gender && (
                      <FormHelperText error>{errors.gender}</FormHelperText>
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
                        isDepartmentError ||
                        areDepartmentsLoading ||
                        isStudentLoading
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
                        isStudentLoading
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
                        isStudentLoading
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
                  <FormControl fullWidth error={!!errors.section}>
                    <InputLabel htmlFor='section'>Section</InputLabel>
                    <Select
                      id='section'
                      value={values.section}
                      label='Section'
                      required
                      disabled={
                        areSectionsLoading ||
                        isSectionsError ||
                        values.department === '' ||
                        values.program === '' ||
                        values.session === '' ||
                        isStudentLoading
                      }
                      onChange={handleChange('section')}
                      onBlur={handleBlur('section')}
                    >
                      {sectionsData?.map(s => (
                        <MenuItem value={s._id} key={s._id}>
                          {s.section_title}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!errors.section && (
                      <FormHelperText error>{errors.section}</FormHelperText>
                    )}
                  </FormControl>
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
                  areSectionsLoading ||
                  isSubmitting ||
                  isStudentLoading
                }
              >
                {areDepartmentsLoading ||
                areProgramsLoading ||
                areSessionsLoading ||
                areSectionsLoading ||
                isSubmitting ||
                isStudentLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  'Update'
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={onClose}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  )
}

export default UpdateStudent
