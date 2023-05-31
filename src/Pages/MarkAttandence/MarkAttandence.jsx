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
  useTheme,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { motion } from 'framer-motion'
import moment from 'moment'
import QRCode from 'qrcode'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

import AttendanceErrorModal from '../../Components/Modal/AttendanceErrorModal'

import useAuth from '../../Hooks/useAuth'

import { getAttendanceSheetByIdRequest } from '../../Services/API/getAttenanceSheetByIdRequest'
import { getStudentAttendanceDataRequest } from '../../Services/API/getStudentAttendanceDataRequest'
import { postAttendenceRequest } from '../../Services/API/postAttendenceRequest'
import { getSections } from '../../Services/API/sectionsRequest'
import { updateAttendanceListRequest } from '../../Services/API/updateAttendanceList'

const MarkAttandence = () => {
  const [studentsList, setStudentsList] = useState([])
  const [errorModal, setErrorModal] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const sheetId = searchParams.get('sheetId')
  const editMode = !!sheetId
  const [qrCode, setQrCode] = useState('')
  const { token, user } = useAuth()
  const [allChecked, setAllChecked] = useState(false)
  const [indetermined, setIndetermined] = useState(false)
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enableSections, setEnableSections] = useState(editMode ? true : false)
  const [enableCreditHours, setEnableCreditHours] = useState(
    editMode ? true : false,
  )
  const [enableSubjectType, setEnableSubjectType] = useState(
    editMode ? true : false,
  )
  const [enableStudentData, setEnableStudentData] = useState(
    editMode ? true : false,
  )
  const [changeDone, setChangeDone] = useState(editMode ? false : true)

  const {
    isError: isSectionsError,
    isLoading: areSectionsLoading,
    data: sectionsData,
  } = useQuery(
    ['sections', values.department, values.program, values.session],
    () => getSections(values.department, values.program, values.session),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enableSections && !editMode,
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
      enabled: !!token && enableSections && enableStudentData && !editMode,
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
    generateQRCode(
      `${import.meta.env.VITE_API_URL}/mark-by-qr/${sheetData.sheet._id}`,
    )
  }, [sheetData])

  const handleChange = (key, value) => {
    if (key === 'subject') {
      const selectedValue = user?.subjects.filter(
        s => s.subject._id === value,
      )[0]
      setValues(prev => ({
        ...prev,
        [key]: value,
        department: selectedValue.subject.department._id,
        program: selectedValue.subject.program._id,
        session: selectedValue.subject.session._id,
        semester: selectedValue.subject.semester._id,
      }))
    } else {
      setValues(prev => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  const setPresent = index => {
    if (allChecked) {
      setAllChecked(false)
      setIndetermined(true)
    }
    if (!changeDone) setChangeDone(prev => true)
    setStudentsList(previousList => {
      const newList = [...previousList]
      newList[index].present = !newList[index].present
      return newList
    })
  }

  const setAllPresent = () => {
    setAllChecked(prev => !prev)
    setIndetermined(false)
    if (!changeDone) setChangeDone(prev => true)
    setStudentsList(previousList => {
      const newList = [...previousList]
      if (allChecked) {
        newList.forEach(s => {
          s.present = false
          s.leave = false
        })
      } else if (!allChecked) {
        newList.forEach(s => {
          s.present = true
          s.leave = false
        })
      }
      return newList
    })
  }

  const setLeave = index => {
    if (allChecked) {
      setAllChecked(false)
      setIndetermined(true)
    }
    if (!changeDone) setChangeDone(prev => true)
    setStudentsList(previousList => {
      const newList = [...previousList]
      newList[index].present = false
      newList[index].leave = !newList[index].leave
      return newList
    })
  }

  const updateAttendance = async () => {
    setIsSubmitting(prev => true)
    const dto = {
      list: studentsList.map(s => ({
        student: s._id,
        present: s.present,
        leave: s.leave,
      })),
    }
    try {
      const res = await updateAttendanceListRequest(token, sheetId, dto)
      location.reload()
    } catch (err) {
      console.log(err)
      setErrorModal("Couldn't update")
    }

    setIsSubmitting(prev => false)
  }

  const submitAttendence = async () => {
    setErrors({
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
    setIsSubmitting(prev => true)
    const dto = {
      ...values,
      date: values.date.toDate(),
      teacher: user?._id,
      list: studentsList.map(s => ({
        student: s._id,
        present: s.present,
        leave: s.leave,
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
      {(areSectionsLoading ||
        areStudentsLoading ||
        isSubmitting ||
        isSheetLoading) && (
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
                          margin: '1em auto',
                        }}
                      >
                        <motion.img src={qrCode} width='300px' height='300px' />
                      </Box>
                    )}

                    <FormControl fullWidth error={!!errors.subject}>
                      <InputLabel htmlFor='subject'>Subject</InputLabel>
                      <Select
                        id='subject'
                        value={values.subject || ''}
                        label='Subject'
                        disabled={editMode}
                        required
                        onChange={e => {
                          handleChange('subject', e.target.value)
                          setEnableSections(true)
                        }}
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
                          areSectionsLoading ||
                          isSectionsError ||
                          !enableSections ||
                          editMode
                        }
                        onChange={e => {
                          handleChange('section', e.target.value)
                          setEnableSubjectType(true)
                        }}
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
                        disabled={
                          !enableSections || !enableSubjectType || editMode
                        }
                        onChange={e => {
                          handleChange('subjectType', e.target.value)
                          setEnableCreditHours(true)
                        }}
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
                        disabled={
                          !enableSections || !enableSubjectType || editMode
                        }
                        onChange={e => {
                          handleChange('creditHours', e.target.value)
                          setEnableStudentData(true)
                        }}
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
                      value={values.date}
                      onChange={newVal => handleChange('date', newVal)}
                      renderInput={params => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                    <Button
                      fullWidth
                      variant='contained'
                      onClick={editMode ? updateAttendance : submitAttendence}
                      disabled={
                        !!!token ||
                        !enableSections ||
                        !enableStudentData ||
                        isSheetLoading ||
                        isSubmitting ||
                        !changeDone
                      }
                    >
                      {editMode ? 'Update Attendance' : 'Mark Attendence'}
                    </Button>
                  </Stack>
                </Grid>
                <Grid item flexGrow={1} padding='.5em .5em .5em 0'>
                  <Typography variant='h6' align='center' gutterBottom>
                    Class Students List
                  </Typography>

                  <ListItem
                    sx={{ height: '7ch' }}
                    secondaryAction={
                      <Stack direction='row' alignItems='end' gap='1em'>
                        <Stack>
                          <Tooltip title='Mark all present' placement='left'>
                            <Checkbox
                              disabled={
                                !!!token ||
                                !enableSections ||
                                !enableStudentData ||
                                isSheetLoading ||
                                isSubmitting ||
                                !changeDone
                              }
                              checked={allChecked}
                              indeterminate={indetermined}
                              onChange={() => setAllPresent()}
                            />
                          </Tooltip>
                          <Typography variant='body2' align='right'>
                            Present
                          </Typography>
                        </Stack>
                        <Typography variant='body2' align='right'>
                          Leave
                        </Typography>
                      </Stack>
                    }
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
                                <Stack direction='row' gap='1em'>
                                  <Tooltip
                                    title={`Mark ${student?.student?.name} Attendence`}
                                    placement='right'
                                  >
                                    <Checkbox
                                      disabled={student?.leave}
                                      checked={student?.present}
                                      onChange={() => setPresent(i)}
                                    />
                                  </Tooltip>
                                  <Tooltip
                                    title={
                                      student?.leave
                                        ? ''
                                        : `Mark ${student?.student?.name} Leave`
                                    }
                                    placement='right'
                                  >
                                    <Checkbox
                                      checked={student?.leave}
                                      onChange={() => setLeave(i)}
                                    />
                                  </Tooltip>
                                </Stack>
                              }
                              disablePadding
                            >
                              <ListItemButton
                                disabled={student?.leave}
                                onClick={() => setPresent(i)}
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    alt={`Avatar n°${i + 1}`}
                                    src={student?.student?.avatar}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  //id={labelId}
                                  primary={`${student?.student?.name} ${student?.student?.rollNo}`}
                                />
                              </ListItemButton>
                            </ListItem>
                          )
                        else if (!editMode)
                          return (
                            <ListItem
                              key={student._id}
                              component={motion.div}
                              initial={{
                                opacity: 0,
                                y: 30,
                                filter: 'blur(20px)',
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                              }}
                              transition={{ delay: 0.1 * i }}
                              sx={{
                                backgroundImage: `linear-gradient(to right,${
                                  student?.leave
                                    ? 'transparent'
                                    : student?.present
                                    ? theme.palette.success.light
                                    : theme.palette.error.light
                                } 20%, transparent)`,
                              }}
                              secondaryAction={
                                <Stack direction='row' gap='1em'>
                                  <Tooltip
                                    title={
                                      student.leave
                                        ? ''
                                        : `Mark ${student.name} Attendence`
                                    }
                                    placement='right'
                                  >
                                    <Checkbox
                                      disabled={student?.leave}
                                      checked={student?.present}
                                      onChange={() => setPresent(i)}
                                    />
                                  </Tooltip>
                                  <Tooltip
                                    title={`Mark ${student.name} Leave`}
                                    placement='right'
                                  >
                                    <Checkbox
                                      checked={student.leave}
                                      onChange={() => setLeave(i)}
                                    />
                                  </Tooltip>
                                </Stack>
                              }
                              disablePadding
                            >
                              <ListItemButton
                                disabled={student.leave}
                                onClick={() => setPresent(i)}
                              >
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

export default MarkAttandence
