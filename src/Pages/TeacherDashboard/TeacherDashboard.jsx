import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material'

import TeacherSubject from '../../Components/Cards/TeacherSubject'
import AreaChart from '../../Components/Charts/AreaChart'

import useAuth from '../../Hooks/useAuth'

const TeacherDashboard = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { user } = useAuth()
  return (
    <Grid container direction='column' width='100%' gap='1em'>
      <Grid item>
        <Paper sx={{ padding: '1em' }}>
          <Grid container gap='1em'>
            {user?.subjects?.map(row => (
              <TeacherSubject
                key={row.subject._id}
                department={row.subject.department}
                session={row.subject.session}
                semester={row.subject.semester}
                program={row.subject.program}
                subject={row.subject}
              />
            ))}
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Grid
          container
          direction={isMobile ? 'column' : 'row'}
          width='100%'
          gap='1em'
          justifyContent='space-between'
        >
          <Grid item flexGrow={1} sx={{ width: isMobile ? '100%' : '45%' }}>
            <Paper
              sx={{
                minHeight: '40vh',
                padding: '1em 0 0 0',
              }}
            >
              <AreaChart
                series={[
                  {
                    name: 'Presents',
                    data: [3, 0, 2, 6, 4, 0, 1, 1, 0, 1],
                  },
                ]}
              />
            </Paper>
          </Grid>
          <Grid item flexGrow={1} sx={{ width: isMobile ? '100%' : '45%' }}>
            <Paper sx={{ minHeight: '40vh', padding: '1em' }}>
              Mark Attendance
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TeacherDashboard
