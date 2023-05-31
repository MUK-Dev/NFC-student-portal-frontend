import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'

import useAdminGeneratePDFReport from '../../Hooks/useAdminGeneratePDFReport'

import { getAllSubjects } from '../../Services/API/getAllSubjectsRequest'
import { getAllTeachers } from '../../Services/API/getAllTeachers'
import { getSections } from '../../Services/API/sectionsRequest'

const AdminAttendanceReportModal = ({ ...rest }) => {
  const { generatePDF, isGenerating, error } = useAdminGeneratePDFReport()
  const theme = useTheme()
  const [enableSections, setEnableSections] = useState(false)

  const [values, setValues] = useState({
    department: '',
    program: '',
    session: '',
    subject: '',
    section: '',
    teacher: '',
  })

  const [errors, setErrors] = useState({
    department: null,
    program: null,
    session: null,
    subject: null,
    section: null,
    teacher: null,
  })

  const handleChange = (key, value) => {
    if (key === 'subject') {
      const selectedValue = subjectsData.filter(s => s._id === value)[0]
      setValues(prev => ({
        ...prev,
        [key]: value,
        department: selectedValue.department._id,
        program: selectedValue.program._id,
        session: selectedValue.session._id,
      }))
    } else {
      setValues(prev => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  const {
    isError: isSubjectsError,
    isLoading: areSubjectsLoading,
    data: subjectsData,
  } = useQuery('all-subjects', () => getAllSubjects(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  const handleDownload = () =>
    generatePDF(values.teacher, values.subject, values.section)

  const {
    isError: isSectionsError,
    isLoading: areSectionsLoading,
    data: sectionsData,
  } = useQuery(
    ['sections', values.department, values.program, values.session],
    () => getSections(values.department, values.program, values.session),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: enableSections,
    },
  )

  const {
    isError: isTeachersError,
    isLoading: areTeachersLoading,
    data: teachersData,
  } = useQuery('all-teachers', () => getAllTeachers(), {
    staleTime: 1000 * 60 * 60 * 24,
  })

  return (
    <Dialog fullWidth maxWidth='xs' {...rest}>
      <DialogContent>
        <Stack gap='1em'>
          <FormControl fullWidth error={!!errors.teacher}>
            <InputLabel htmlFor='subject'>Teacher</InputLabel>
            <Select
              id='subject'
              value={values.teacher || ''}
              label='Teacher'
              required
              disabled={isGenerating}
              onChange={e => handleChange('teacher', e.target.value)}
            >
              {teachersData?.map(t => (
                <MenuItem value={t._id} key={t._id}>
                  {t?.name}
                </MenuItem>
              ))}
            </Select>
            {!!errors.teacher && (
              <FormHelperText error>{errors.teacher}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth error={!!errors.subject}>
            <InputLabel htmlFor='subject'>Subject</InputLabel>
            <Select
              id='subject'
              value={values.subject || ''}
              label='Subject'
              required
              disabled={isGenerating}
              onChange={e => {
                handleChange('subject', e.target.value)
                setEnableSections(true)
              }}
            >
              {subjectsData?.map(s => (
                <MenuItem value={s._id} key={s._id}>
                  {s?.subject_title}
                </MenuItem>
              ))}
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
                isGenerating
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
          {isGenerating && (
            <Typography align='center' color={theme.palette.warning.main}>
              Generating report, this can take some time
            </Typography>
          )}
          {!!error && (
            <Typography align='center' color={theme.palette.error.main}>
              {error}
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDownload}
          autoFocus
          disabled={
            values.section === '' || values.subject === '' || isGenerating
          }
        >
          {isGenerating ? <CircularProgress size={20} /> : 'Download'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminAttendanceReportModal
