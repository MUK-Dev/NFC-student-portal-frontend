import { ArrowBackIos } from '@mui/icons-material'
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

import { getDepartments } from '../../../Services/API/departmentsRequest'
import { getPrograms } from '../../../Services/API/programsRequest'
import { getSections } from '../../../Services/API/sectionsRequest'
import { getSessions } from '../../../Services/API/sessionsRequest'

const StudentForm1 = ({
  animation,
  handleNext,
  reset,
  sessionRef,
  programRef,
  departmentRef,
  sectionRef,
}) => {
  const theme = useTheme()
  const [_, setSearchParams] = useSearchParams()
  const [values, setValues] = useState({
    session: sessionRef.current,
    program: programRef.current,
    department: departmentRef.current,
    section: sectionRef.current,
  })
  const [errors, setErrors] = useState({
    session: null,
    program: null,
    department: null,
    section: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enablePrograms, setEnablePrograms] = useState(
    programRef.current === '' ? false : true,
  )
  const [enableSessions, setEnableSessions] = useState(
    sessionRef.current === '' ? false : true,
  )
  const [enableSections, setEnableSections] = useState(
    sectionRef.current === '' ? false : true,
  )

  const arrowAnimation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  }

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

  const checkEmpty = (key, value) => {
    if (value === '') {
      setErrors(prev => ({
        ...prev,
        [key]: 'This is required',
      }))
      return true
    } else return false
  }

  const submitForm = async e => {
    e.preventDefault()
    setErrors(prev => ({
      session: null,
      program: null,
      department: null,
      section: null,
    }))
    if (checkEmpty('department', values.department)) return
    if (checkEmpty('program', values.program)) return
    if (checkEmpty('session', values.session)) return
    if (checkEmpty('section', values.section)) return
    setIsSubmitting(true)
    sessionRef.current = values.session
    programRef.current = values.program
    departmentRef.current = values.department
    sectionRef.current = values.section
    setIsSubmitting(false)
    handleNext()
  }

  const handleChange = (key, value) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <form noValidate onSubmit={submitForm} style={{ width: '100%' }}>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        width='100%'
        component={motion.div}
        key='StudentForm'
        variants={animation}
        initial='initial'
        animate='animate'
        exit='exit'
        sx={{ position: 'relative' }}
      >
        <Typography variant='h5' gutterBottom>
          Enter University Information
        </Typography>
        <Divider
          sx={{
            background: theme.palette.primary.main,
            height: '4px',
            width: '25%',
            borderRadius: '50px',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1em',
          }}
        />
        <Stack gap='1em' padding='1em' width='100%'>
          <Stack direction='row' alignItems='flex-start' width='100%' gap='1em'>
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
          </Stack>

          <Stack direction='row' alignItems='flex-start' width='100%' gap='1em'>
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
          </Stack>
        </Stack>
        <motion.div
          key='ArrowBack1'
          variants={arrowAnimation}
          initial='initial'
          animate='animate'
          exit='exit'
        >
          <IconButton
            color='primary'
            sx={{ position: 'absolute', top: -140, left: 10 }}
            onClick={() => {
              reset()
              setSearchParams({ role: null })
            }}
          >
            <ArrowBackIos />
          </IconButton>
        </motion.div>

        <Button type='submit' variant='contained'>
          {isSubmitting ? <CircularProgress /> : 'Next'}
        </Button>
      </Stack>
    </form>
  )
}

export default StudentForm1
