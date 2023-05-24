import {
  Collapse,
  LinearProgress,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'
import moment from 'moment'
import { EventCalendar } from 'react-mui-event-calendar'
import { useQuery } from 'react-query'

import useAuth from '../../Hooks/useAuth'

import { getStudentCalendarDataRequest } from '../../Services/API/getStudentCalendarData'

const StudentAttendance = () => {
  const theme = useTheme()

  const { token } = useAuth()

  const { data, isLoading, isError } = useQuery(
    ['student-calendar-data', token],
    () => getStudentCalendarDataRequest(token),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )

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
      <Collapse in={!!data} unmountOnExit>
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
      </Collapse>
    </Paper>
  )
}

export default StudentAttendance
