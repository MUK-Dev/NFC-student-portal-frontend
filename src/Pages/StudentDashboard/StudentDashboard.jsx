import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from 'react-query'

import AreaChart from '../../Components/Charts/AreaChart'
import Progress from '../../Components/Progress/Progress'

import useAuth from '../../Hooks/useAuth'

import { getStudentChartDataRequest } from '../../Services/API/getStudentChartData'

const Dashboard = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { token } = useAuth()

  const { data: chartData } = useQuery(
    ['student-chart-data', token],
    () => getStudentChartDataRequest(token),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )

  return (
    <Grid container direction='column' width='100%' gap='1em'>
      <Grid item>
        <Paper sx={{ height: { xs: 'auto', md: '40vh' }, padding: '2em' }}>
          <Progress />
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
                    data: chartData ?? [],
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

export default Dashboard
