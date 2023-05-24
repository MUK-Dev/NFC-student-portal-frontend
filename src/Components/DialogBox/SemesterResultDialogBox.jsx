import { CircularProgress } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

const SemesterResultDialogBox = props => {
  const navigate = useNavigate()
  const { onClose, open } = props

  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle>Select Section & Semester</DialogTitle>
    </Dialog>
  )
}

export default SemesterResultDialogBox
