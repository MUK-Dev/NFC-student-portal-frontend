import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import {
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'

import useAuth from '../../Hooks/useAuth'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getPrograms } from '../../Services/API/programsRequest'
import { getSections } from '../../Services/API/sectionsRequest'
import { getSemester } from '../../Services/API/semesterRequest'
import { getSessions } from '../../Services/API/sessionsRequest'
import { getSubject } from '../../Services/API/subjectRequest'

const icon = <CheckBoxOutlineBlank fontSize='small' />
const checkedIcon = <CheckBox fontSize='small' />

const RStudents = () => {
  const { token } = useAuth()
  const [selectedValue, setSelectedValue] = useState({
    department: '',
    program: '',
    session: '',
    semester: '',
  })

  const [formErrors, setFormErrors] = useState({
    department: null,
    program: null,
    session: null,
    semester: null,
  })
  const [submitErrors, setSubmitErrors] = useState({
    department: true,
    program: true,
    session: true,
    semester: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enablePrograms, setEnablePrograms] = useState(false)
  const [enableSession, setEnableSession] = useState(false)
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
    isError: isSemestersError,
    isLoading: areSemestersLoading,
    data: semestersData,
  } = useQuery(
    [
      'sessions',
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
        semester: true,
      }))
    } else if (key == 'program') {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
        session: true,
        semester: true,
      }))
    } else if (key == 'session') {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
        semester: true,
      }))
    } else {
      setSubmitErrors(prev => ({
        ...prev,
        [key]: false,
      }))
    }
  }

  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography variant='h4'>Register Student</Typography>
            <Typography gutterBottom>Enter the student details</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Subject Code'
                  type='text'
                  placeholder='CS-111'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Subject Code'
                  type='text'
                  placeholder='CS-111'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Subject Code'
                  type='text'
                  placeholder='CS-111'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Subject Code'
                  type='text'
                  placeholder='CS-111'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl
                  fullWidth
                  error={!!formErrors.department && !!submitErrors.department}
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
                      {!!submitErrors.department && 'Department is required'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
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
                      areProgramsLoading || isProgramsError || !enablePrograms
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
                      {!!submitErrors.program && 'Program is required'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
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
                      {!!submitErrors.session && 'Seesion is required'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl
                  fullWidth
                  error={!!formErrors.semester && submitErrors.semester}
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
                      {!!submitErrors.semester && 'Semester is required'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Button variant='contained' sx={{ margin: '.5em .5em .5em 0' }}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RStudents
