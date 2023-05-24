import {
  Collapse,
  LinearProgress,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { EventCalendar } from 'react-mui-event-calendar'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

import useAuth from '../../Hooks/useAuth'

import { getStudentCalendarDataByIdRequest } from '../../Services/API/getStudentCalendarDataById'

const SearchedStudentAttendance = () => {
  const theme = useTheme()
  const { studentId } = useParams()
  const [collapseIn, setCollapseIn] = useState(false)

  const { token } = useAuth()

  const { data, isLoading, isError } = useQuery(
    ['student-calendar-data-by-id', token, studentId],
    () => getStudentCalendarDataByIdRequest(token, studentId),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )

  useEffect(() => {
    if (!!data && !collapseIn) setTimeout(() => setCollapseIn(true), 500)
  }, [data])

  return (
    <Paper sx={{ padding: '1em', flexGrow: 1, position: 'relative' }}>
      {isLoading && (
        <LinearProgress
          sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <Typography variant='h4' gutterBottom>
        Previous Attendance
      </Typography>
      <Collapse in={collapseIn}>
        {!!data && (
          <EventCalendar
            width='100%'
            readonly
            showEventPopup={false}
            elevation={0}
            pallet={{
              primary: theme.palette.primary.main,
              secondary: theme.palette.secondary.main,
            }}
            dataSource={data}
          />
        )}
      </Collapse>
    </Paper>
  )
}

export default SearchedStudentAttendance
