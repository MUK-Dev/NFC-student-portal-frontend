import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { motion } from 'framer-motion'
import moment from 'moment'
import QRCode from 'qrcode'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import AttendanceErrorModal from '../../Components/Modal/AttendanceErrorModal'
import AttendanceSuccessModal from '../../Components/Modal/AttendanceSuccessModal'

import useAuth from '../../Hooks/useAuth'

import { getDepartments } from '../../Services/API/departmentsRequest'
import { getStudentAttendanceDataRequest } from '../../Services/API/getStudentAttendanceDataRequest'
import { postAttendenceRequest } from '../../Services/API/postAttendenceRequest'
import { getPrograms } from '../../Services/API/programsRequest'
import { getSections } from '../../Services/API/sectionsRequest'
import { getSemester } from '../../Services/API/semesterRequest'
import { getSessions } from '../../Services/API/sessionsRequest'
import { getSubject } from '../../Services/API/subjectRequest'

const MarkAttandence = () => {
  const [studentsList, setStudentsList] = useState([])
  const [errorModal, setErrorModal] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const { token, user } = useAuth()

  const generateQRCode = url => {
    QRCode.toDataURL(
      url,
      {
        color: {
          dark: '#551a16',
        },
        errorCorrectionLevel: 'H',
      },
      (err, url) => {
        if (err) return console.error(err)
        setQrCode(url)
      },
    )
  }

  const [values, setValues] = useState({
    department: '',
    program: '',
    session: '',
    section: '',
    semester: '',
    subject: '',
    date: moment(),
  })
  const [errors, setErrors] = useState({
    department: null,
    program: null,
    session: null,
    section: null,
    semester: null,
    subject: null,
    date: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enablePrograms, setEnablePrograms] = useState(false)
  const [enableSessions, setEnableSessions] = useState(false)
  const [enableSections, setEnableSections] = useState(false)
  const [enableSubjects, setEnableSubjects] = useState(false)
  const [enableStudentData, setEnableStudentData] = useState(false)
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

  const {
    isError: isStudentsError,
    isLoading: areStudentsLoading,
    data: studentsData,
  } = useQuery(
    [
      'students',
      values.department,
      values.program,
      values.session,
      values.section,
    ],
    () =>
      getStudentAttendanceDataRequest(
        token,
        values.department,
        values.program,
        values.session,
        values.section,
      ),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled:
        !!token &&
        enablePrograms &&
        enableSessions &&
        enableSections &&
        enableSubjects &&
        enableStudentData,
    },
  )

  useEffect(() => {
    if (isStudentsError || areStudentsLoading) return
    setStudentsList(studentsData)
  }, [studentsData])

  const handleChange = (key, value) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const setPresent = index =>
    setStudentsList(previousList => {
      const newList = [...previousList]
      newList[index].present = !newList[index].present
      return newList
    })

  const submitAttendence = async () => {
    setErrors({
      department: null,
      program: null,
      session: null,
      section: null,
      semester: null,
      subject: null,
      date: null,
    })
    setIsSubmitting(prev => true)
    const dto = {
      ...values,
      date: values.date.toDate(),
      teacher: user._id,
      list: studentsList.map(s => ({
        student: s._id,
        present: s.present,
      })),
    }

    try {
      const res = await postAttendenceRequest(token, dto)
      generateQRCode(`${import.meta.env.VITE_API_URL}/mark-by-qr/${res.sheet}`)
      setIsSubmitting(prev => false)
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        [err.response.data.type]: err.response.data.message,
      }))
      setErrorModal(err.response.data.message)
      setIsSubmitting(prev => false)
    }
  }

  return (
    <Paper sx={{ padding: '2em 1em', position: 'relative' }}>
      {(areDepartmentsLoading ||
        areProgramsLoading ||
        areSectionsLoading ||
        areSemestersLoading ||
        areSessionsLoading ||
        areStudentsLoading ||
        areSubjectsLoading ||
        isSubmitting) && (
        <LinearProgress
          sx={{
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
      <Grid container flexWrap='nowrap'>
        <Grid item flexGrow={1}>
          <Grid container direction='column' width='100%'>
            <Grid item width='100%'>
              <Typography variant='h4'>Mark Student Attendance</Typography>
              <Typography gutterBottom>Enter the Class details</Typography>
            </Grid>
            <Grid item width='100%'>
              <Grid container width='100%' gap='2em'>
                <Grid item flexGrow={1} padding='.5em .5em .5em 0'>
                  <Stack gap='1em'>
                    {qrCode !== '' && (
                      <Box
                        component={motion.div}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        sx={{
                          border: '9px solid #70231d',
                          borderRadius: 9,
                          width: '330px',
                          height: '340px',
                          padding: '11px 6px',
                          margin: '1em 0',
                        }}
                      >
                        <motion.img src={qrCode} width='300px' height='300px' />
                      </Box>
                    )}
                    <FormControl fullWidth error={!!errors.department}>
                      <InputLabel>Department</InputLabel>
                      <Select
                        labelId='department'
                        id='department'
                        value={values.department || ''}
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
                        <FormHelperText error>
                          {errors.department}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth error={!!errors.program}>
                      <InputLabel>Programs</InputLabel>
                      <Select
                        labelId='Programs'
                        id='programs'
                        value={values.program || ''}
                        label='Programs'
                        required
                        disabled={
                          areProgramsLoading ||
                          isProgramsError ||
                          !enablePrograms
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
                    <FormControl fullWidth error={!!errors.session}>
                      <InputLabel>Session</InputLabel>
                      <Select
                        labelId='session'
                        id='session'
                        value={values.session || ''}
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
                    <FormControl fullWidth error={!!errors.section}>
                      <InputLabel htmlFor='section'>Section</InputLabel>
                      <Select
                        id='section'
                        value={values.section || ''}
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
                    <FormControl fullWidth error={!!errors.semester}>
                      <InputLabel htmlFor='section'>Semester</InputLabel>
                      <Select
                        id='semester'
                        value={values.semester || ''}
                        label='Semester'
                        required
                        disabled={
                          areSemestersLoading ||
                          isSemestersError ||
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

                    <FormControl fullWidth error={!!errors.subject}>
                      <InputLabel htmlFor='section'>Subject</InputLabel>
                      <Select
                        id='semester'
                        value={values.subject || ''}
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
                          setEnableStudentData(true)
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
                    <MobileDatePicker
                      label='Date'
                      inputFormat='DD-MM-YYYY'
                      value={values.date}
                      onChange={newVal => handleChange('date', newVal)}
                      renderInput={params => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                    <Button
                      fullWidth
                      variant='contained'
                      onClick={submitAttendence}
                      disabled={
                        !!!token ||
                        !enablePrograms ||
                        !enableSessions ||
                        !enableSections ||
                        !enableSubjects ||
                        !enableStudentData
                      }
                    >
                      Mark Attendence
                    </Button>
                  </Stack>
                </Grid>
                <Grid item flexGrow={1} padding='.5em .5em .5em 0'>
                  <Typography variant='h6' align='center' gutterBottom>
                    Class Students List
                  </Typography>
                  {studentsList ? (
                    studentsData?.length > 0 ? (
                      studentsData?.map((student, i) => (
                        <ListItem
                          key={student._id}
                          secondaryAction={
                            <Tooltip
                              title={`Mark ${student.name} Attendence`}
                              placement='right'
                            >
                              <Checkbox
                                edge='end'
                                checked={student.present}
                                onChange={() => setPresent(i)}
                              />
                            </Tooltip>
                          }
                          disablePadding
                        >
                          <ListItemButton onClick={() => setPresent(i)}>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar n°${i + 1}`}
                                src={student.avatar}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              //id={labelId}
                              primary={`${student.name} ${student.rollNo}`}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))
                    ) : (
                      <Typography align='center' color='error'>
                        No students found in this section or semester try
                        contacting admin
                      </Typography>
                    )
                  ) : (
                    <Typography align='center' color='error'>
                      Please fill out the details first
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AttendanceErrorModal
        open={!!errorModal}
        text={errorModal}
        onClose={() => setErrorModal(prev => !prev)}
      />
    </Paper>
  )
}

export default MarkAttandence
