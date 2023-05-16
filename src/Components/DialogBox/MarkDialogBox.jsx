import { Card, DialogContentText, Grid } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import * as React from 'react'

export default function MarkDialogBox(props) {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle textAlign='center'>Subject GPA Detail</DialogTitle>
      <DialogContentText padding='0 1em 1em 1em'>
        <Grid padding='1em 0'>
          <Typography>Subject Name: {props.value?.subject_title}</Typography>
          <Typography>Subject Code: {props.value?.subject_code}</Typography>
        </Grid>
        <Grid padding='1em 0'>
          {props.value?.subject_theory === '0' ? (
            <Typography>No Theory</Typography>
          ) : (
            <>
              <Typography>Theory Mid Marks: {props.value?.mids}</Typography>
              <Typography>Theory Final Marks: {props.value?.finals}</Typography>
              <Typography>
                Theory Sessional Marks: {props.value?.sessional}
              </Typography>
              <Typography>
                Theory Total Marks: {props.value?.theory_total}
              </Typography>
              <Typography>
                Theory Hours: {props.value?.subject_theory}
              </Typography>
            </>
          )}

          {props.value?.subject_lab === '0' ? (
            <Typography>No Lab</Typography>
          ) : (
            <>
              <Typography>Lab Final Marks: {props.value?.lab_final}</Typography>
              <Typography>
                Lab Sessional Marks: {props.value?.lab_sessional}
              </Typography>
              <Typography>Lab Total Marks: {props.value?.lab_total}</Typography>
              <Typography>Lab Hours: {props.value?.subject_lab}</Typography>
            </>
          )}
        </Grid>
        <Grid padding='1em 0'>
          <Typography>
            Total Calculation: ({props.value?.theory_total} *{' '}
            {props.value?.subject_theory}) + ({props.value?.lab_total} *{' '}
            {props.value?.subject_lab}) / ({props.value?.subject_theory} +{' '}
            {props.value?.subject_lab}){' '}
          </Typography>
          <Typography>Subject Total: {props.value?.total}</Typography>
          <Typography>Subject GPA: {props.value?.gpa}</Typography>
          <Typography>Subject Grade: {props.value?.grade}</Typography>
        </Grid>
      </DialogContentText>
    </Dialog>
  )
}
