import { useTheme } from '@emotion/react'
import { CardActionArea, Grid, useMediaQuery } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
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
    <Grid
      item
      sx={{
        width: isMobile ? '48%' : '24%',
        height: isMobile ? 'auto' : '50%',
      }}
    >
      <Card>
        <CardActionArea onClick={handleClassClick}>
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              padding='0 0 0 0.5em'
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
