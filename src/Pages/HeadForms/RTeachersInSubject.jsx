import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import {
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
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

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getPrograms } from '../../Services/API/programsRequest'
import { getSections } from '../../Services/API/sectionsRequest'
import { getSemester } from '../../Services/API/semesterRequest'
import { getSessions } from '../../Services/API/sessionsRequest'
import { getSubjects } from '../../Services/API/subjectsRequest'

const icon = <CheckBoxOutlineBlank fontSize='small' />
const checkedIcon = <CheckBox fontSize='small' />

const RTeachersInSubject = () => {
  const [theory, setTheory] = useState()
  const [lab, setLab] = useState()
  const { submitForm } = useRegisterTeacher()

  const [selectedValue, setSelectedValue] = useState({
    department: '',
    program: '',
    session: '',
    section: '',
    semester: '',
  })

  const [formErrors, setFormErrors] = useState({
    department: null,
    program: null,
    session: null,
    section: null,
    semester: null,
  })
  const [submitErrors, setSubmitErrors] = useState({
    department: true,
    program: true,
    session: true,
    section: true,
    semester: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enablePrograms, setEnablePrograms] = useState(false)
  const [enableSession, setEnableSession] = useState(false)
  const [enableSection, setEnableSection] = useState(false)
  const [enableSemester, setEnableSemester] = useState(false)

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

  const {
    isError: isSessionsError,
    isLoading: areSessionsLoading,
    data: sessionsData,
  } = useQuery(
    ['sessions', selectedValue.department, selectedValue.program],
    () => getSessions(selectedValue.department, selectedValue.program),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms && enableSession,
    },
  )
  const {
    isError: isSctionsError,
    isLoading: areSectionsLoading,
    data: sectionsData,
  } = useQuery(
    [
      'sessions',
      selectedValue.department,
      selectedValue.program,
      selectedValue.session,
    ],
    () =>
      getSections(
        selectedValue.department,
        selectedValue.program,
        selectedValue.session,
      ),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms && enableSession && enableSection,
    },
  )

  const {
    isError: isSemestersError,
    isLoading: areSemestersLoading,
    data: semestersData,
  } = useQuery(
    [
      'semester',
      selectedValue.department,
      selectedValue.program,
      selectedValue.session,
    ],
    () =>
      getSemester(
        selectedValue.department,
        selectedValue.program,
        selectedValue.session,
      ),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms && enableSession && enableSemester,
    },
  )
  console.log(semestersData)

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
        session: true,
        section: true,
        semester: true,
      }))
    } else if (key == 'prgram') {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
        session: true,
        section: true,
        semester: true,
      }))
    } else if (key == session) {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
        section: true,
        semester: true,
      }))
    } else {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
      }))
    }
  }

  const [subjects, setSubjects] = useState([
    {
      subject: '',
      theory_hours: '',
      lab_hours: '',
    },
  ])

  const addSubject = () =>
    setSubjects(prev => {
      const newSubjects = [...prev]
      newSubjects.push({
        subject: '',
        theory_hours: '',
        lab_hours: '',
      })
      return newSubjects
    })

  const selectSubject = (i, key, keyValue) =>
    setSubjects(prev => {
      const newSubjects = [...prev]
      newSubjects[i][key] = keyValue
      return newSubjects
    })

  const {
    isError: isSubjectError,
    isLoading: areSubjectsLoading,
    data: subjectsData,
  } = useQuery('subjects', () => getSubjects(), {
    staleTime: 1000 * 60 * 60 * 24,
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
                        <Grid item xs={6} md={3} padding='.5em .5em .5em 0'>
                          <FormControl
                            fullWidth
                            error={
                              !!formErrors.department &&
                              !!submitErrors.department
                            }
                          >
                            <InputLabel>Department</InputLabel>
                            <Select
                              labelId='department'
                              id='department'
                              value={selectedValue.department}
                              label='Departments'
                              disabled={
                                isDepartmentError || areDepartmentsLoading
                              }
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
                        <Grid item xs={6} md={3} padding='.5em .5em .5em 0'>
                          <FormControl
                            fullWidth
                            error={!!formErrors.program && submitErrors.program}
                          >
                            <InputLabel>Program</InputLabel>
                            <Select
                              labelId='programs'
                              id='programs'
                              value={selectedValue.program}
                              label='Program'
                              required
                              disabled={
                                areProgramsLoading ||
                                isProgramsError ||
                                !enablePrograms
                              }
                              onChange={e => {
                                inputHandleChange('program', e.target.value)
                                setEnableSession(true)
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
                                {!!submitErrors.program &&
                                  'Program is required'}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={2} padding='.5em .5em .5em 0'>
                          <FormControl
                            fullWidth
                            error={!!formErrors.session && submitErrors.session}
                          >
                            <InputLabel>Session</InputLabel>
                            <Select
                              labelId='session'
                              id='session'
                              value={selectedValue.session}
                              label='Session'
                              required
                              disabled={
                                isSessionsError ||
                                areSessionsLoading ||
                                !enablePrograms ||
                                !enableSession
                              }
                              onChange={e => {
                                inputHandleChange('session', e.target.value)
                                setEnableSection(true)
                                setEnableSemester(true)
                              }}
                            >
                              {sessionsData?.map(s => (
                                <MenuItem key={s._id} value={s._id}>
                                  {s.session_title}
                                </MenuItem>
                              ))}
                            </Select>
                            {!!formErrors.session && (
                              <FormHelperText error>
                                {!!submitErrors.session &&
                                  'Session is required'}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={2} padding='.5em .5em .5em 0'>
                          <FormControl
                            fullWidth
                            error={!!formErrors.section && submitErrors.section}
                          >
                            <InputLabel>Section</InputLabel>
                            <Select
                              labelId='section'
                              id='section'
                              value={selectedValue.section}
                              label='Section'
                              required
                              disabled={
                                isSessionsError ||
                                areSessionsLoading ||
                                !enablePrograms ||
                                !enableSession ||
                                !enableSection
                              }
                              onChange={e => {
                                inputHandleChange('section', e.target.value)
                              }}
                            >
                              {sectionsData?.map(s => (
                                <MenuItem value={s._id} key={s._id}>
                                  {s.section_title}
                                </MenuItem>
                              ))}
                            </Select>
                            {!!formErrors.section && (
                              <FormHelperText error>
                                {!!submitErrors.section &&
                                  'Section is required'}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={2} padding='.5em .5em .5em 0'>
                          <FormControl
                            fullWidth
                            error={
                              !!formErrors.semester && submitErrors.semester
                            }
                          >
                            <InputLabel>Semester</InputLabel>
                            <Select
                              labelId='semester'
                              id='semester'
                              value={selectedValue.semester}
                              label='Semester'
                              required
                              disabled={
                                isSemestersError ||
                                areSemestersLoading ||
                                !enablePrograms ||
                                !enableSession ||
                                !enableSemester
                              }
                              onChange={e => {
                                inputHandleChange('semester', e.target.value)
                              }}
                            >
                              {semestersData?.map(s => (
                                <MenuItem key={s._id} value={s._id}>
                                  {s.semester_title}
                                </MenuItem>
                              ))}
                            </Select>
                            {!!formErrors.semester && (
                              <FormHelperText error>
                                {!!submitErrors.semester &&
                                  'Semester is required'}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                          <FormControl
                            fullWidth
                            error={
                              !!formErrors.semester && submitErrors.semester
                            }
                          >
                            <InputLabel>Semester</InputLabel>
                            <Select
                              labelId='semester'
                              id='semester'
                              value={selectedValue.semester}
                              label='Semester'
                              required
                              disabled={
                                isSemestersError ||
                                areSemestersLoading ||
                                !enablePrograms ||
                                !enableSession ||
                                !enableSemester
                              }
                              onChange={e => {
                                inputHandleChange('semester', e.target.value)
                              }}
                            >
                              {semestersData?.map(s => (
                                <MenuItem key={s._id} value={s._id}>
                                  {s.semester_title}
                                </MenuItem>
                              ))}
                            </Select>
                            {!!formErrors.semester && (
                              <FormHelperText error>
                                {!!submitErrors.semester &&
                                  'Semester is required'}
                              </FormHelperText>
                            )}
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
