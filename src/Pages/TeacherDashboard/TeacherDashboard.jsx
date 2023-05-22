import { Blinds } from '@mui/icons-material'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

import TeacherSubject from '../../Components/Cards/TeacherSubject'

import useAuth from '../../Hooks/useAuth'

const data = [
  {
    title: 'Mark Attendance',
    description: 'Mark todays or some other days attendance',
    link: '/teacher/mark-attandence',
  },
  {
    title: 'Attendance Records',
    description: 'View or update attendance previously marked by you',
    link: '/teacher/sheets',
  },
  {
    title: 'Result Records',
    description: 'View or update result previously marked by you',
    link: '/teacher/result-sheets',
  },
]

const TeacherDashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <Grid container direction='column' width='100%' gap='1em'>
      <Grid item>
        <Grid container spacing={2}>
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
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          {data.map((item, i) => (
            <Grid
              item
              xs={6}
              md={4}
              key={item.title}
              component={motion.div}
              initial={{ filter: 'blur(5px)' }}
              animate={{ filter: 'blur(0px)' }}
            >
              <Card>
                <CardContent>
                  <Typography variant='h5' textAlign='center' gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography
                    variant='body2'
                    textAlign='center'
                    padding='2em 0'
                  >
                    {item.description}
                  </Typography>
                </CardContent>
                <Button
                  fullWidth
                  variant='contained'
                  disableElevation
                  onClick={() => navigate(item.link)}
                  sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                >
                  <Blinds />
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TeacherDashboard
