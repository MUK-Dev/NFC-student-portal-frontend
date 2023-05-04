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
    <Dialog onClose={onClose} open={open}>
      <DialogTitle color='error'>Result Not Entered</DialogTitle>
      <DialogContentText>
        <Typography>{props.text}</Typography>
      </DialogContentText>
      <DialogActions>
        <Button onClick={onClose}>Stay here?</Button>
        <Button onClick={() => navigate('/teacher/home')}>
          Go to home page?
        </Button>
      </DialogActions>
    </Dialog>
  )
}
