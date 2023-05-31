import {
  Apartment,
  AutoAwesomeMotion,
  CalendarToday,
  FeaturedPlayList,
  Group,
  Layers,
  LibraryBooks,
  List,
  MenuBook,
  Person,
} from '@mui/icons-material'
import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import * as React from 'react'
import { useNavigate } from 'react-router'

import audienceImage from '../../Assets/Images/audience.png'
import notesImage from '../../Assets/Images/notes.png'

const data = [
  {
    title: 'Department',
    description: 'Register or edit Departments',
    link: '/head/register/department',
    icon: <Apartment />,
  },
  {
    title: 'Program',
    description: 'Register or edit Programs',
    link: '/head/register/program',
    icon: <Layers />,
  },
  {
    title: 'Session',
    description: 'Register or edit Sessions',
    link: '/head/register/session',
    icon: <CalendarToday />,
  },
  {
    title: 'Semester',
    description: 'Register or edit Semesters',
    link: '/head/register/semester',
    icon: <MenuBook />,
  },
  {
    title: 'Subject',
    description: 'Register or edit Subjects',
    link: '/head/register/subject',
    icon: <LibraryBooks />,
  },
  {
    title: 'Teacher',
    description: 'Register or edit Teachers',
    link: '/head/register/teacher',
    icon: <Person />,
  },
]

export default function ExampleComponent() {
  const navigate = useNavigate()

  return (
    <Grid container spacing={2} margin={2} padding='0 4em 0 0'>
      <Grid
        item
        xs={6}
        component={motion.div}
        initial={{ filter: 'blur(5px)' }}
        animate={{ filter: 'blur(0px)' }}
      >
        <Card>
          <Button
            fullWidth
            variant='contained'
            disableElevation
            onClick={() => navigate('/head/search/students')}
            sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          >
            <Group />
          </Button>
          <CardContent>
            <Grid container alignItems='center'>
              <Grid item flexGrow={1}>
                <Typography variant='h5' component='div'>
                  Search student
                </Typography>
                <Typography variant='body2'>
                  See individual student attendance, result or update his
                  details
                </Typography>
              </Grid>
              <Grid item>
                <img src={audienceImage} width={80} height={80} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={6}
        component={motion.div}
        initial={{ filter: 'blur(5px)' }}
        animate={{ filter: 'blur(0px)' }}
      >
        <Card>
          <Button
            fullWidth
            variant='contained'
            disableElevation
            onClick={() => navigate('/head/attendance/records')}
            sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          >
            <List />
          </Button>
          <CardContent>
            <Typography variant='h5' component='div' textAlign='center'>
              Attendace records
            </Typography>
            <Typography variant='body2' textAlign='center' padding={2}>
              View or generate report of all attendance records marked by
              teachers
            </Typography>
          </CardContent>
        </Card>
      </Grid>
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
            {i <= 2 && (
              <Button
                fullWidth
                variant='contained'
                disableElevation
                onClick={() => navigate(item.link)}
                sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              >
                {item.icon}
              </Button>
            )}
            <CardContent>
              <Typography variant='h5' component='div' textAlign='center'>
                {item.title}
              </Typography>
              <Typography variant='body2' textAlign='center' padding={2}>
                {item.description}
              </Typography>
            </CardContent>
            {i > 2 && (
              <Button
                fullWidth
                variant='contained'
                disableElevation
                onClick={() => navigate(item.link)}
                sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                {item.icon}
              </Button>
            )}
          </Card>
        </Grid>
      ))}
      <Grid
        item
        xs={6}
        component={motion.div}
        initial={{ filter: 'blur(5px)' }}
        animate={{ filter: 'blur(0px)' }}
      >
        <Card>
          <CardContent>
            <Typography variant='h5' component='div' textAlign='center'>
              Sections
            </Typography>
            <Typography variant='body2' textAlign='center' padding={2}>
              Register or edit sections
            </Typography>
          </CardContent>
          <Button
            fullWidth
            variant='contained'
            disableElevation
            onClick={() => navigate('/head/register/section')}
            sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          >
            <AutoAwesomeMotion />
          </Button>
        </Card>
      </Grid>
      <Grid
        item
        xs={6}
        component={motion.div}
        initial={{ filter: 'blur(5px)' }}
        animate={{ filter: 'blur(0px)' }}
      >
        <Card>
          <CardContent>
            <Grid container alignItems='center'>
              <Grid item flexGrow={1}>
                <Typography variant='h5' component='div'>
                  Result Records
                </Typography>
                <Typography variant='body2'>See all result records</Typography>
              </Grid>
              <Grid item>
                <img src={notesImage} width={80} height={80} />
              </Grid>
            </Grid>
          </CardContent>
          <Button
            fullWidth
            variant='contained'
            disableElevation
            onClick={() => navigate('/head/result-sheets')}
            sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          >
            <FeaturedPlayList />
          </Button>
        </Card>
      </Grid>
    </Grid>
  )
}
