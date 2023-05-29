import {
  ArrowForwardIos,
  CheckBox,
  CheckBoxOutlineBlank,
} from '@mui/icons-material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
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
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useAuth from '../../Hooks/useAuth'
import useRegisterTeacher from '../../Hooks/useRegisterTeacher'

import { getAllTeachers } from '../../Services/API/getAllTeachers'
import { getTeacherById } from '../../Services/API/getTeacherById'
import { getSubjects } from '../../Services/API/subjectsRequest'

const RTeachersInSubject = () => {
  const [showDrawer, setShowDrawer] = useState(false)

  const { token } = useAuth()
  const theme = useTheme()
  const {
    submitForm,
    editMode,
    onClose,
    selectedTeacher,
    setEditMode,
    setSelectedTeacher,
    setSnackbar,
    snackbar,
    updateForm,
    setSubjects,
    subjects,
  } = useRegisterTeacher()

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
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Teacher Name is required'),
      email: Yup.string().required('Teacher Email is required'),
      phoneNo: Yup.string().required('Teacher Phone Number is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: editMode
      ? (values, { setErrors, setStatus, setSubmitting, resetForm }) =>
          updateForm(values, subjects, {
            setErrors,
            setStatus,
            setSubmitting,
            resetForm,
          })
      : (values, { setErrors, setStatus, setSubmitting, resetForm }) =>
          submitForm(values, subjects, {
            setErrors,
            setStatus,
            setSubmitting,
            resetForm,
          }),
  })

  const {
    isError: isSubjectsError,
    isLoading: areSubjectsLoading,
    data: subjectsData,
  } = useQuery('subjects', () => getSubjects(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isTeachersError,
    isLoading: areTeachersLoading,
    data: teachersData,
  } = useQuery('all-teachers', () => getAllTeachers(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isTeacherError,
    isLoading: isTeacherLoading,
    data: teacherData,
  } = useQuery(
    ['teacher', selectedTeacher],
    () => getTeacherById(token, selectedTeacher),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token && !!selectedTeacher,
    },
  )

  useEffect(() => {
    if (!teacherData) return
    setFieldValue('name', teacherData.name)
    setFieldValue('email', teacherData.email)
    setFieldValue('phoneNo', teacherData.phoneNo)
    setSubjects(teacherData.subjects)
  }, [teacherData])

  const selectTeacher = teacherId => {
    setSelectedTeacher(teacherId)
    setShowDrawer(false)
    setEditMode(true)
  }

  const drawer = (
    <Drawer
      anchor='right'
      open={showDrawer}
      onClose={() => setShowDrawer(prev => !prev)}
    >
      <Box sx={{ width: 400, overflowX: 'hidden' }}>
        <List>
          {teachersData?.map(t => (
            <ListItem key={t._id} disablePadding>
              <ListItemButton onClick={() => selectTeacher(t._id)}>
                <ListItemAvatar>
                  <Avatar alt={t?.name} src={t?.avatar} />
                </ListItemAvatar>
                <ListItemText primary={t.name} secondary={t.email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )

  const addSubject = () => {
    setSubjects(prev => {
      const newSubjects = [...prev]
      newSubjects.push({
        subject: '',
        theory_hours: '',
        lab_hours: '',
      })
      return newSubjects
    })
  }

  const delSubject = i => {
    setSubjects(prev => {
      const newSubjects = [...prev]
      newSubjects.splice(i, 1)
      return newSubjects
    })
  }

  const selectSubject = (i, key, keyValue) =>
    setSubjects(prev => {
      const newSubjects = [...prev]
      newSubjects[i][key] = keyValue
      newSubjects[i].lab_hours = '0'
      newSubjects[i].theory_hours = '0'
      return newSubjects
    })

  const selectHours = (i, key, keyValue) =>
    setSubjects(prev => {
      const newSubjects = [...prev]
      newSubjects[i][key] = keyValue
      return newSubjects
    })

  return (
    <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Grid container flexWrap='nowrap'>
        <Grid item flexGrow={1}>
          <Grid container direction='column' width='100%'>
            <Grid item width='100%'>
              <Typography variant='h4'>Register Teacher in Subject</Typography>
              <Typography gutterBottom>Enter the Teacher details</Typography>
            </Grid>
            <Grid item width='100%'>
              <Grid container width='100%'>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Teacher Name'
                    type='text'
                    placeholder='M. Usman Khilji'
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    error={!!touched.name && !!errors.name}
                    helperText={
                      !!touched.name && !!errors.name ? errors.name : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Teacher Email'
                    type='text'
                    placeholder='name@nfciet.edu.pk'
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                    error={!!touched.email && !!errors.email}
                    helperText={
                      !!touched.email && !!errors.email ? errors.email : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Teacher Phone No.'
                    type='text'
                    placeholder='03xx-xxxxxxx'
                    value={values.phoneNo}
                    onBlur={handleBlur('phoneNo')}
                    onChange={handleChange('phoneNo')}
                    error={!!touched.phoneNo && !!errors.phoneNo}
                    helperText={
                      !!touched.phoneNo && !!errors.phoneNo
                        ? errors.phoneNo
                        : ''
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Password'
                    type='text'
                    placeholder='........'
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    error={!!touched.password && !!errors.password}
                    helperText={
                      editMode
                        ? 'Enter the old or new password'
                        : !!touched.password && !!errors.password
                        ? errors.password
                        : ''
                    }
                    fullWidth
                  />
                </Grid>

                {subjects.map((sub, i) => {
                  let selectedSubject = null
                  if (!!subjects[i]['subject']) {
                    selectedSubject = subjectsData.find(
                      s => s._id === subjects[i]['subject'],
                    )
                  }
                  return (
                    <React.Fragment key={i}>
                      <Grid item xs={12} md={5} padding='.5em .5em .5em 0'>
                        <FormControl fullWidth>
                          <InputLabel>Subject</InputLabel>
                          <Select
                            labelId='subject'
                            id='subject'
                            value={subjects[i]['subject'] || ''}
                            label='Subject'
                            required
                            onChange={e => {
                              selectSubject(i, 'subject', e.target.value)
                            }}
                          >
                            {subjectsData?.map(s => (
                              <MenuItem key={s._id} value={s._id}>
                                {s.subject_title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} md={3} padding='.5em'>
                        <Typography gutterBottom>
                          Theory Credit Hours
                        </Typography>
                        <Slider
                          aria-label='Theory Credit Hours'
                          valueLabelDisplay='auto'
                          disabled={
                            !!!subjects[i]['subject'] ||
                            parseInt(selectedSubject?.theory_hours) <= 0
                          }
                          onChange={e => {
                            selectHours(i, 'theory_hours', e.target.value)
                          }}
                          value={parseInt(subjects[i].theory_hours) || 0}
                          marks
                          min={0}
                          max={parseInt(selectedSubject?.theory_hours) || 5}
                        />
                      </Grid>
                      <Grid item xs={6} md={3} padding='.5em'>
                        <Typography gutterBottom>Lab Credit Hours</Typography>
                        <Slider
                          aria-label='Theory Credit Hours'
                          valueLabelDisplay='auto'
                          disabled={
                            !!!subjects[i]['subject'] ||
                            parseInt(selectedSubject?.lab_hours) <= 0
                          }
                          onChange={e => {
                            selectHours(i, 'lab_hours', e.target.value)
                          }}
                          value={parseInt(subjects[i].lab_hours) || 0}
                          marks
                          min={0}
                          max={parseInt(selectedSubject?.lab_hours) || 5}
                        />
                      </Grid>
                      <Grid item xs={6} md={1} padding='.5em'>
                        <IconButton
                          onClick={e => {
                            delSubject(i)
                          }}
                          color='primary'
                          sx={{ margin: '.5em .5em .5em 0' }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Grid>
                    </React.Fragment>
                  )
                })}

                <Stack direction={'row'} justifyContent='end' width={'100%'}>
                  <Button
                    onClick={addSubject}
                    variant='contained'
                    sx={{ margin: '.5em .5em .5em 0' }}
                  >
                    Add Subject
                  </Button>
                </Stack>
              </Grid>

              <Button
                type='submit'
                variant='contained'
                disabled={
                  areSubjectsLoading || isSubmitting || isTeacherLoading
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
              Show all teachers
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

export default RTeachersInSubject
