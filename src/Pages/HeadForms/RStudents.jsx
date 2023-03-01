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
  const [values, setValues] = useState({
    session: '',
    program: '',
    department: '',
    section: '',
    semester: '',
    subject: '',
  })
  const [errors, setErrors] = useState({
    session: null,
    program: null,
    department: null,
    section: null,
    semester: null,
    subject: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enablePrograms, setEnablePrograms] = useState(false)
  const [enableSessions, setEnableSessions] = useState(false)
  const [enableSections, setEnableSections] = useState(false)
  const [enableSubjects, setEnableSubjects] = useState(false)

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

  const {
    isError: isSessionsError,
    isLoading: areSessionsLoading,
    data: sessionsData,
  } = useQuery(
    ['sessions', values.department, values.program],
    () => getSessions(values.department, values.program),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms && enableSessions,
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
      enabled: enablePrograms && enableSessions && enableSections,
    },
  )

  const {
    isError: isSemestersError,
    isLoading: areSemestersLoading,
    data: semestersData,
  } = useQuery(
    ['semesters', values.department, values.program, values.session],
    () => getSemester(values.department, values.program, values.session),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enablePrograms && enableSessions && enableSections,
    },
  )

  const {
    isError: isSubjectsError,
    isLoading: areSubjectsLoading,
    data: subjectsData,
  } = useQuery(
    [
      'subjects',
      values.department,
      values.program,
      values.session,
      values.semester,
    ],
    () =>
      getSubject(
        token,
        values.department,
        values.program,
        values.session,
        values.semester,
      ),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled:
        !!token &&
        enablePrograms &&
        enableSessions &&
        enableSections &&
        enableSubjects,
    },
  )

  const handleChange = (key, value) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography variant='h4'>Register students in subject</Typography>
            <Typography gutterBottom>Enter the students details</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
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
                      handleChange('department', e.target.value)
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
                    <FormHelperText error>{errors.department}</FormHelperText>
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
                      areProgramsLoading || isProgramsError || !enablePrograms
                    }
                    onChange={e => {
                      handleChange('program', e.target.value)
                      setEnableSessions(true)
                    }}
                  >
                    {programsData?.map(p => (
                      <MenuItem key={p._id} value={p._id}>
                        {p.program_abbreviation}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errors.program && (
                    <FormHelperText error>{errors.program}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth error={!!errors.session}>
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
                      !enablePrograms ||
                      !enableSessions
                    }
                    onChange={e => {
                      handleChange('session', e.target.value)
                      setEnableSections(true)
                    }}
                  >
                    {sessionsData?.map(s => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.session_title}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errors.session && (
                    <FormHelperText error>{errors.session}</FormHelperText>
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
                      !enablePrograms ||
                      !enableSections ||
                      !enableSessions
                    }
                    onChange={e => handleChange('section', e.target.value)}
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

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth error={!!errors.semester}>
                  <InputLabel htmlFor='section'>Semester</InputLabel>
                  <Select
                    id='semester'
                    value={values.semester}
                    label='Semester'
                    required
                    disabled={
                      areSectionsLoading ||
                      isSectionsError ||
                      !enablePrograms ||
                      !enableSections ||
                      !enableSessions
                    }
                    onChange={e => {
                      handleChange('semester', e.target.value)
                      setEnableSubjects(true)
                    }}
                  >
                    {semestersData?.map(s => (
                      <MenuItem value={s._id} key={s._id}>
                        {s.semester_title}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errors.semester && (
                    <FormHelperText error>{errors.semester}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth error={!!errors.subject}>
                  <InputLabel htmlFor='section'>Subject</InputLabel>
                  <Select
                    id='semester'
                    value={values.subject}
                    label='Subject'
                    required
                    disabled={
                      areSubjectsLoading ||
                      isSubjectsError ||
                      !enablePrograms ||
                      !enableSections ||
                      !enableSessions ||
                      !enableSubjects
                    }
                    onChange={e => {
                      handleChange('subject', e.target.value)
                      setEnableSubjects(true)
                    }}
                  >
                    {subjectsData?.map(s => (
                      <MenuItem value={s._id} key={s._id}>
                        {s?.subject_title}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errors.semester && (
                    <FormHelperText error>{errors.semester}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} padding='.5em .5em .5em 0'>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={Array.from(Array(20).keys()).map(i => ({
                    title: `Student ${i}`,
                  }))}
                  fullWidth
                  getOptionLabel={option => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      <Avatar
                        sx={{
                          marginRight: '1em',
                        }}
                      />
                      {option.title}
                    </li>
                  )}
                  renderInput={params => (
                    <TextField {...params} label='Students' />
                  )}
                />
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
