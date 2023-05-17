import { DialogContentText } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import * as React from 'react'

export default function MarksErrorDialogBox(props) {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle color='error'>Enter Valid Number</DialogTitle>
      <DialogContentText>
        <Typography>Name: {props.value.name}</Typography>
        <Typography>
          Roll No.: {props.Session}-{props.Program}-{props.value.rollNo}
        </Typography>
        <Typography>Entered Marks Error!</Typography>
      </DialogContentText>
    </Dialog>
  )
}
