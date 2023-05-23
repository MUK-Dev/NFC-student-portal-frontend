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

export default function ResultErrorDialogBox(props) {
  const { onClose, selectedValue, open } = props
  const navigate = useNavigate()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color='error'>Result Not Entered</DialogTitle>
      <DialogContentText>
        <Typography>{props.text}</Typography>
      </DialogContentText>
      <DialogActions>
        <Button onClick={() => navigate('/teacher/result-sheets')}>
          Go to Record Page
        </Button>
        <Button onClick={() => navigate('/teacher/home')}>
          Go to Home Page
        </Button>
      </DialogActions>
    </Dialog>
  )
}
