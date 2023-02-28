import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material'

import TeacherSubject from '../../Components/Cards/TeacherSubject'
import AreaChart from '../../Components/Charts/AreaChart'

function createData(session, program, section, subject) {
  return { session, program, section, subject }
}

const rows = [
  createData('2K19', 'bscs', 'Blue', 'Information Security'),
  createData('2K19', 'bscs', 'Red', 'Information Security'),
  createData('2K19', 'bscs', 'Red', 'Information Security'),
  createData('2K20', 'bscs', 'Blue', 'Digital Image Processing'),
  createData('2K20', 'bscs', 'Red', 'Digital Image Processing'),
  createData('2K20', 'bscs', 'Green', 'Digital Image Processing'),
]

const TeacherDashboard = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid container direction='column' width='100%' gap='1em'>
      <Grid item>
        <Paper sx={{ padding: '1em' }}>
          <Grid container gap='1em'>
            {rows.map(row => (
              <TeacherSubject
                session={row.session}
                program={row.program}
                section={row.section}
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
