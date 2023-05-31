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
  Typography,
  useTheme,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { motion } from 'framer-motion'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'

import AttendanceErrorModal from '../../Components/Modal/AttendanceErrorModal'

import useAuth from '../../Hooks/useAuth'

import { getAttendanceSheetByIdRequest } from '../../Services/API/getAttenanceSheetByIdRequest'
import { getStudentAttendanceDataRequest } from '../../Services/API/getStudentAttendanceDataRequest'
import { getSections } from '../../Services/API/sectionsRequest'

const ViewAttendanceRecord = () => {
  const [studentsList, setStudentsList] = useState([])
  const [errorModal, setErrorModal] = useState(false)
  let [searchParams] = useSearchParams()
  const sheetId = searchParams.get('sheetId')
  const navigate = useNavigate()
  if (!!!sheetId) navigate('/head/attendance/records')
  const editMode = !!sheetId
  const { token, user } = useAuth()
  const theme = useTheme()

  const {
    isLoading: isSheetLoading,
    isError: isSheetError,
    data: sheetData,
  } = useQuery(
    ['sheet', sheetId, token],
    () => getAttendanceSheetByIdRequest(token, sheetId),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: editMode,
    },
  )

  const [values, setValues] = useState({
    department: '',
    program: '',
    session: '',
    section: '',
    semester: '',
    subject: '',
    subjectType: '',
    creditHours: '',
    date: moment(),
  })
  const [errors, setErrors] = useState({
    department: null,
    program: null,
    session: null,
    section: null,
    semester: null,
    subject: null,
    subjectType: null,
    creditHours: null,
    date: null,
  })

  const {
    isError: isSectionsError,
    isLoading: areSectionsLoading,
    data: sectionsData,
  } = useQuery(
    ['sections', values.department, values.program, values.session],
    () => getSections(values.department, values.program, values.session),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !editMode,
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
      sheetId,
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
      enabled: !!token && !editMode,
    },
  )

  useEffect(() => {
    if (isStudentsError || areStudentsLoading) return
    setStudentsList(studentsData)
  }, [studentsData])

  useEffect(() => {
    if (isSheetError || isSheetLoading || !editMode) return
    setValues({
      date: moment(sheetData.sheet.date),
      department: sheetData.sheet.department._id,
      program: sheetData.sheet.program._id,
      section: sheetData.sheet.section._id,
      semester: sheetData.sheet.semester._id,
      session: sheetData.sheet.session._id,
      subject: sheetData.sheet.subject._id,
      subjectType: sheetData.sheet.subjectType,
      creditHours: sheetData.sheet.creditHours,
    })
    setStudentsList(sheetData.list)
  }, [sheetData])

  return (
    <Paper sx={{ padding: '2em 1em', position: 'relative' }}>
      {(areSectionsLoading || areStudentsLoading || isSheetLoading) && (
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
              <Typography variant='h4' gutterBottom>
                Marked by: {sheetData?.sheet?.teacher?.name}
              </Typography>
            </Grid>
            <Grid item width='100%'>
              <Grid container width='100%' gap='2em'>
                <Grid item flexGrow={1} padding='.5em .5em .5em 0'>
                  <Stack gap='1em'>
                    <FormControl fullWidth error={!!errors.subject}>
                      <InputLabel htmlFor='subject'>Subject</InputLabel>
                      <Select
                        id='subject'
                        value={values.subject || ''}
                        label='Subject'
                        disabled={editMode}
                        required
                      >
                        {editMode ? (
                          <MenuItem
                            value={sheetData?.sheet.subject._id}
                            key={sheetData?.sheet.subject._id}
                          >
                            {sheetData?.sheet.subject?.subject_title}
                          </MenuItem>
                        ) : (
                          user?.subjects?.map(s => (
                            <MenuItem value={s.subject._id} key={s.subject._id}>
                              {s?.subject.subject_title}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                      {!!errors.subject && (
                        <FormHelperText error>{errors.subject}</FormHelperText>
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
                          areSectionsLoading || isSectionsError || editMode
                        }
                      >
                        {editMode ? (
                          <MenuItem
                            value={sheetData?.sheet.section._id}
                            key={sheetData?.sheet.section._id}
                          >
                            {sheetData?.sheet.section.section_title}
                          </MenuItem>
                        ) : (
                          sectionsData?.map(s => (
                            <MenuItem value={s._id} key={s._id}>
                              {s.section_title}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                      {!!errors.section && (
                        <FormHelperText error>{errors.section}</FormHelperText>
                      )}
                    </FormControl>

                    <FormControl fullWidth error={!!errors.subjectType}>
                      <InputLabel htmlFor='subject-type'>
                        Subject Type
                      </InputLabel>
                      <Select
                        id='subject-type'
                        value={values.subjectType || ''}
                        label='Subject Type'
                        required
                        disabled={editMode}
                      >
                        <MenuItem value='theory'>Theory</MenuItem>
                        <MenuItem value='lab'>Lab</MenuItem>
                      </Select>
                      {!!errors.subjectType && (
                        <FormHelperText error>
                          {errors.subjectType}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl fullWidth error={!!errors.creditHours}>
                      <InputLabel htmlFor='credit-hours'>
                        Credit Hours
                      </InputLabel>
                      <Select
                        id='credit-hours'
                        value={values.creditHours || ''}
                        label='Credit Hours'
                        required
                        disabled={editMode}
                      >
                        <MenuItem value='1'>1</MenuItem>
                        <MenuItem value='2'>2</MenuItem>
                        <MenuItem value='3'>3</MenuItem>
                        <MenuItem value='4'>4</MenuItem>
                        <MenuItem value='5'>5</MenuItem>
                      </Select>
                      {!!errors.creditHours && (
                        <FormHelperText error>
                          {errors.creditHours}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <MobileDatePicker
                      label='Date'
                      inputFormat='DD-MM-YYYY'
                      disabled={editMode}
                      onChange={() => {}}
                      value={values.date}
                      renderInput={params => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                    <Button fullWidth variant='contained' disabled>
                      {editMode ? 'Update Attendance' : 'Mark Attendence'}
                    </Button>
                  </Stack>
                </Grid>
                <Grid item flexGrow={1} padding='.5em .5em .5em 0'>
                  <Typography variant='h6' align='center' gutterBottom>
                    Class Students List
                  </Typography>
                  <ListItem
                    secondaryAction={
                      <Stack direction='row' gap='1em'>
                        <Typography variant='body2' align='right'>
                          Present
                        </Typography>
                        <Typography variant='body2' align='right'>
                          Leave
                        </Typography>
                      </Stack>
                    }
                    disablePadding
                  ></ListItem>
                  {studentsList ? (
                    studentsList?.length > 0 ? (
                      studentsList?.map((student, i) => {
                        if (editMode && student)
                          return (
                            <ListItem
                              key={student?._id}
                              component={motion.div}
                              initial={{
                                opacity: 0,
                                filter: 'blur(20px)',
                              }}
                              animate={{
                                opacity: 1,
                                filter: 'blur(0px)',
                              }}
                              sx={{
                                backgroundImage: `linear-gradient(to right,${
                                  student?.leave
                                    ? 'transparent'
                                    : student?.present
                                    ? theme.palette.success.light
                                    : theme.palette.error.light
                                } 20%, transparent)`,
                              }}
                              transition={{ delay: 0.1 * i }}
                              secondaryAction={
                                <Stack
                                  direction='row'
                                  alignItems='center'
                                  gap='1em'
                                >
                                  <Checkbox
                                    disabled={student?.leave}
                                    checked={student?.present}
                                  />

                                  <Checkbox checked={student?.leave} />
                                </Stack>
                              }
                              disablePadding
                            >
                              <ListItemButton disabled={student?.leave}>
                                <ListItemAvatar>
                                  <Avatar
                                    alt={`Avatar n°${i + 1}`}
                                    src={student?.student?.avatar}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={`${student?.student?.name} ${student?.student?.rollNo}`}
                                />
                              </ListItemButton>
                            </ListItem>
                          )
                        else return <></>
                      })
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

export default ViewAttendanceRecord
