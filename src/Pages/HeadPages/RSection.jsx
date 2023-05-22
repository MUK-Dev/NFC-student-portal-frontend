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
import { Formik, useFormik } from 'formik'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import * as Yup from 'yup'

import useAuth from '../../Hooks/useAuth'
import useRegisterSection from '../../Hooks/useRegisterSection'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getAllSections } from '../../Services/API/getAllSectionsRequest'
import { getSectionById } from '../../Services/API/getSectionByIdRequest'
import { getPrograms } from '../../Services/API/programsRequest'
import { getSessions } from '../../Services/API/sessionsRequest'

const RSection = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const { token } = useAuth()
  const theme = useTheme()
  const {
    submitForm,
    editMode,
    onClose,
    selectedSection,
    setEditMode,
    setSelectedSection,
    snackbar,
    updateForm,
  } = useRegisterSection()

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
      section_title: '',
      department: '',
      program: '',
      session: '',
    },
    validationSchema: Yup.object().shape({
      section_title: Yup.string().required('Section Title is required'),
      department: Yup.string().required('Department is required'),
      program: Yup.string().required('Program is required'),
      session: Yup.string().required('Session is required'),
    }),
    onSubmit: editMode
      ? (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          updateForm(values, {
            setErrors,
            setStatus,
            setSubmitting,
            resetForm,
          })
        }
      : (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          submitForm(values, {
            setErrors,
            setStatus,
            setSubmitting,
            resetForm,
          })
        },
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
  } = useQuery('all-sections', () => getAllSections(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const {
    isError: isSectionError,
    isLoading: isSectionLoading,
    data: sectionData,
  } = useQuery(
    ['section', selectedSection],
    () => getSectionById(token, selectedSection),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!selectedSection,
    },
  )

  useEffect(() => {
    if (!sectionData) return
    setFieldValue('section_title', sectionData.section_title)
    setFieldValue('department', sectionData.department)
    setFieldValue('program', sectionData.program)
    setFieldValue('session', sectionData.session)
  }, [sectionData])

  const selectSection = sectionId => {
    setSelectedSection(sectionId)
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
          {sectionsData?.map(s => (
            <ListItem key={s?._id} disablePadding>
              <ListItemButton onClick={() => selectSection(s?._id)}>
                <ListItemText
                  primary={s?.section_title}
                  secondary={`${s?.department?.department_abbreviation} - ${
                    s?.program?.program_abbreviation
                  } - ${moment(s?.session?.starting_year).format(
                    'YYYY',
                  )} - ${moment(s?.session?.ending_year).format('YYYY')}`}
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
              <Typography variant='h4'>Register Section</Typography>
              <Typography gutterBottom>Enter the Section details</Typography>
            </Grid>
            <Grid item width='100%'>
              <Grid container width='100%'>
                <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                  <TextField
                    variant='outlined'
                    label='Section Title'
                    type='text'
                    placeholder='Blue'
                    value={values.section_title}
                    onBlur={handleBlur('section_title')}
                    onChange={handleChange('section_title')}
                    error={!!touched.section_title && !!errors.section_title}
                    helperText={
                      touched.section_title && errors.section_title
                        ? errors.section_title
                        : ''
                    }
                    fullWidth
                  />
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
                      disabled={isDepartmentError || areDepartmentsLoading}
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
                        values.department === ''
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
                        values.program === ''
                      }
                      onChange={handleChange('session')}
                      onBlur={handleBlur('session')}
                    >
                      {sessionsData?.map(s => (
                        <MenuItem key={s._id} value={s._id}>
                          {s.session_title} - {s.type}
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
              </Grid>

              <Button
                type='submit'
                variant='contained'
                disabled={
                  isSectionLoading ||
                  areProgramsLoading ||
                  areDepartmentsLoading ||
                  areSessionsLoading ||
                  isSubmitting
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
              Show Sessions
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

export default RSection
