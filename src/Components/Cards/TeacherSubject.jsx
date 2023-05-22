import { useTheme } from '@emotion/react'
import { CardActionArea, Grid, useMediaQuery } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import DialogBox from '../DialogBox/DialogBox'

export default function TeacherSubject({
  department,
  session,
  semester,
  program,
  subject,
}) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectValue, SetSelectValue] = useState({
    department: department,
    program: program,
    session: session,
    semester: semester,
    subject: subject,
  })
  const handleClassClick = () => {
    setShowModal(true)
  }
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Grid item xs={6} md={3}>
      <Card
        component={motion.div}
        initial={{ filter: 'blur(5px)' }}
        animate={{ filter: 'blur(0px)' }}
      >
        <CardActionArea onClick={handleClassClick}>
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              align='center'
            >
              {session.session_title} {program.program_abbreviation}
            </Typography>
            <Typography variant='body2' color='text.secondary' align='center'>
              {subject.subject_title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <DialogBox
        open={showModal}
        onClose={() => setShowModal(prev => !prev)}
        value={selectValue}
      />
    </Grid>
  )
}
