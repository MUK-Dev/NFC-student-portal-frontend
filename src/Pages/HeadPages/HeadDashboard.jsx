import { Build, Cached, EmojiPeople, Height } from '@mui/icons-material'
import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import * as React from 'react'
import { useNavigate } from 'react-router'

import audienceImage from '../../Assets/Images/audience.png'

const data = [
  {
    title: 'Department',
    description: 'Register or edit Departments',
    link: '/head/register/department',
  },
  {
    title: 'Program',
    description: 'Register or edit Programs',
    link: '/head/register/program',
  },
  {
    title: 'Session',
    description: 'Register or edit Sessions',
    link: '/head/register/session',
  },
  {
    title: 'Semester',
    description: 'Register or edit Semesters',
    link: '/head/register/semester',
  },
  {
    title: 'Subject',
    description: 'Register or edit Subjects',
    link: '/head/register/subject',
  },
  {
    title: 'Teacher',
    description: 'Register or edit Teachers',
    link: '/head/register/teacher',
  },
]

export default function ExampleComponent() {
  const navigate = useNavigate()

  return (
    <Grid container spacing={2} margin={2} padding='0 4em 0 0'>
      <Grid
        item
        xs={12}
        component={motion.div}
        initial={{ filter: 'blur(5px)' }}
        animate={{ filter: 'blur(0px)' }}
      >
        <Card>
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
          <Button
            fullWidth
            variant='contained'
            disableElevation
            onClick={() => navigate('/head/search/students')}
            sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          >
            <EmojiPeople />
          </Button>
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
            <CardContent>
              <Typography variant='h5' component='div' textAlign='center'>
                {item.title}
              </Typography>
              <Typography variant='body2' textAlign='center' padding={2}>
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
              <Build />
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
