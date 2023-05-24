import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'

import useAuth from '../../Hooks/useAuth'
import useGeneratePDFReport from '../../Hooks/useGeneratePDFReport'

import { getSections } from '../../Services/API/sectionsRequest'

const TeacherAttendanceReportModal = ({ ...rest }) => {
  const { generatePDF, isGenerating, error } = useGeneratePDFReport()
  const theme = useTheme()
  const { user } = useAuth()
  const [enableSections, setEnableSections] = useState(false)

  const [values, setValues] = useState({
    department: '',
    program: '',
    session: '',
    subject: '',
    section: '',
  })

  const [errors, setErrors] = useState({
    department: null,
    program: null,
    session: null,
    subject: null,
    section: null,
  })

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
      }))
    } else {
      setValues(prev => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  const handleDownload = () => generatePDF(values.subject, values.section)

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

  return (
    <Dialog fullWidth maxWidth='xs' {...rest}>
      <DialogContent>
        <Stack gap='1em'>
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
              {user?.subjects?.map(s => (
                <MenuItem value={s.subject._id} key={s.subject._id}>
                  {s?.subject.subject_title}
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

export default TeacherAttendanceReportModal
