import { Paper, Typography, useTheme } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { EventCalendar } from 'react-mui-event-calendar'

const StudentAttendance = () => {
  const theme = useTheme()
  return (
    <Paper sx={{ padding: '1em', flexGrow: 1 }}>
      <Typography variant='h4' gutterBottom>
        Previous Attendance
      </Typography>
      <EventCalendar
        width='100%'
        readonly
        showEventPopup={false}
        pallet={{
          primary: theme.palette.primary.main,
          secondary: theme.palette.secondary.main,
        }}
        dataSource={Array.from(Array(10).keys()).map(i => {
          return {
            title: 'Present - FYP',
            date: moment().subtract(Math.floor(Math.random() * 30), 'days'),
            color:
              i % 2 === 0
                ? theme.palette.success.light
                : theme.palette.error.light,
          }
        })}
      />
    </Paper>
  )
}

export default StudentAttendance
