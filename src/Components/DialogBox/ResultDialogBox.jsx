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
    <Dialog onClose={onClose} open={open}>
      <DialogTitle color='error'>Result Entered</DialogTitle>
      <DialogContentText>
        <Typography>Result Entered Successfully</Typography>
      </DialogContentText>
      <DialogActions>
        <Button onClick={() => navigate('/teacher/home')}>
          Go to home page
        </Button>
      </DialogActions>
    </Dialog>
  )
}
