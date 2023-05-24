import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import useSubjectResultPDFReport from '../../Hooks/useSubjectResultPDFReport'

export default function ClassResultDialogBox(props) {
  const { onClose, selectedValue, open } = props
  const { generateSubjectResultPDF, isGenerating, error } =
    useSubjectResultPDFReport()
  const theme = useTheme()
  const { user } = useAuth()

  const handleDownload = () => generateSubjectResultPDF(props.value.SheetId)

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle color='success'>Generate Class Result Report</DialogTitle>
      <DialogContent>
        <Stack gap='1em'>
          <DialogContentText>
            <Typography>
              Class: {props.value.Session} {props.value.Program}{' '}
              {props.value.Section}
            </Typography>
            <Typography>Subject: {props.value.Subject}</Typography>
          </DialogContentText>
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
        <Button onClick={handleDownload} autoFocus disabled={isGenerating}>
          {isGenerating ? <CircularProgress size={20} /> : 'Download'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
