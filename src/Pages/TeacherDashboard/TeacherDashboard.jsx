import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material'

import AreaChart from '../../Components/Charts/AreaChart'

const TeacherDashboard = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid container direction='column' width='100%' gap='1em'>
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
