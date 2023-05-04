import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useRegisterTeacher from '../../Hooks/useRegisterTeacher'

import { getSubjects } from '../../Services/API/subjectsRequest'

const RTeachersInSubject = () => {
  const { submitForm } = useRegisterTeacher()

  const {
    isError: isSubjectsError,
    isLoading: areSubjectsLoading,
    data: subjectsData,
  } = useQuery('subjects', () => getSubjects(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const [subjects, setSubjects] = useState([
    {
      subject: '',
      theory_hours: '',
      lab_hours: '',
    },
  ])

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
      return newSubjects
    })

  const formikOptions = {
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
    onSubmit: (values, { setErrors, setStatus, setSubmitting }) =>
      submitForm(values, subjects, { setErrors, setStatus, setSubmitting }),
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
                  <Typography variant='h4'>
                    Register Teacher in Subject
                  </Typography>
                  <Typography gutterBottom>
                    Enter the Teacher details
                  </Typography>
                </Grid>
                <Grid item width='100%'>
                  <Grid container width='100%'>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='Teacher Name'
                        type='text'
                        placeholder='Dr. Naeem Aslam'
                        value={values.name}
                        onBlur={handleBlur('name')}
                        onChange={handleChange('name')}
                        error={!!touched.name && !!errors.name}
                        helperText={
                          touched.name && errors.name ? errors.name : ''
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='Teacher Email'
                        type='text'
                        placeholder='naeemaslam@nfciet.edu.pk'
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
                        label='Teacher Phone No.'
                        type='text'
                        placeholder='03xx-xxxxxxx'
                        value={values.phoneNo}
                        onBlur={handleBlur('phoneNo')}
                        onChange={handleChange('phoneNo')}
                        error={!!touched.phoneNo && !!errors.phoneNo}
                        helperText={
                          touched.phoneNo && errors.phoneNo
                            ? errors.phoneNo
                            : ''
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                      <TextField
                        variant='outlined'
                        label='Teacher Password'
                        type='text'
                        placeholder='........'
                        value={values.password}
                        onBlur={handleBlur('password')}
                        onChange={handleChange('password')}
                        error={!!touched.password && !!errors.password}
                        helperText={
                          touched.password && errors.password
                            ? errors.password
                            : ''
                        }
                        fullWidth
                      />
                    </Grid>

                    {subjects.map((sub, i) => (
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
                            onChange={e => {
                              selectSubject(i, 'theory_hours', e.target.value)
                            }}
                            marks
                            min={0}
                            max={5}
                          />
                        </Grid>
                        <Grid item xs={6} md={3} padding='.5em'>
                          <Typography gutterBottom>Lab Credit Hours</Typography>
                          <Slider
                            aria-label='Theory Credit Hours'
                            valueLabelDisplay='auto'
                            onChange={e => {
                              selectSubject(i, 'lab_hours', e.target.value)
                            }}
                            marks
                            min={0}
                            max={5}
                          />
                        </Grid>
                        <Grid item xs={6} md={1} padding='.5em'>
                          <Button
                            onClick={e => {
                              delSubject(i)
                            }}
                            variant='contained'
                            sx={{ margin: '.5em .5em .5em 0' }}
                          >
                            <DeleteForeverIcon />
                          </Button>
                        </Grid>
                      </React.Fragment>
                    ))}

                    <Stack
                      direction={'row'}
                      justifyContent='end'
                      width={'100%'}
                    >
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
                    sx={{ margin: '.5em .5em .5em 0' }}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default RTeachersInSubject
