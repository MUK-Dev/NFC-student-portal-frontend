import AssessmentIcon from '@mui/icons-material/Assessment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Icon from '@mui/material/Icon'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useState } from 'react'

import useAuth from '../../Hooks/useAuth'

export default function ParentOptions() {
  return (
    <Grid container gap={'1em'} justifyContent={'space-around'}>
      <Grid item flexGrow={'1'}>
        <Card sx={{ p: '15px' }} align='center'>
          <CalendarMonthIcon sx={{ fontSize: 200 }}></CalendarMonthIcon>
          <Typography
            sx={{ display: 'block' }}
            component='span'
            variant='body2'
            color='text.primary'
          >
            See Students Attendence
          </Typography>
        </Card>
      </Grid>
      <Grid item flexGrow={'1'}>
        <Card sx={{ p: '15px' }} align='center'>
          <AssessmentIcon sx={{ fontSize: 200 }}></AssessmentIcon>
          <Typography
            sx={{ display: 'block' }}
            component='span'
            align='center'
            variant='body2'
            color='text.primary'
          >
            See Students Result
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}
