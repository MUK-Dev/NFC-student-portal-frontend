import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material'

import TeacherSubject from '../../Components/Cards/TeacherSubject'

function createData(section, subject) {
  return { section, subject }
}

const rows = [
  createData('2K19 Blue', 'Information Security'),
  createData('2K19 Red', 'Information Security'),
  createData('2K19 Red', 'Information Security'),
  createData('2K20 Blue', 'Digital Image Processing'),
  createData('2K20 Red', 'Digital Image Processing'),
  createData('2K20 Green', 'Digital Image Processing'),
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
              <TeacherSubject section={row.section} subject={row.subject} />
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
                padding: '1em',
              }}
            >
              Block 2
            </Paper>
          </Grid>
          <Grid item flexGrow={1} sx={{ width: isMobile ? '100%' : '45%' }}>
            <Paper sx={{ minHeight: '40vh', padding: '1em' }}>Block 3</Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TeacherDashboard
