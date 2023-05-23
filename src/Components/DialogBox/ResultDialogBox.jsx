import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'
import * as React from 'react'
import { useNavigate } from 'react-router'

export default function ResultDialogBox(props) {
  const { onClose, selectedValue, open } = props
  const navigate = useNavigate()

  return (
    <Dialog onClose={onClose ? onClose : () => {}} open={open}>
      <DialogTitle color='error'>Result Entered</DialogTitle>
      <DialogContentText>Result Entered Successfully</DialogContentText>
      <DialogActions>
        <Button onClick={() => navigate('/teacher/result-sheets')}>
          Go to Record Page
        </Button>
      </DialogActions>
    </Dialog>
  )
}
