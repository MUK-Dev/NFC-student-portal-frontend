import { useTheme } from '@emotion/react'
import { CardActionArea, Grid, useMediaQuery } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useNavigate } from 'react-router'

export default function TeacherSubject({ section, subject }) {
  const navigate = useNavigate()

  const handleClassClick = () => {
    navigate(`/teacher/result-form?section=${section}&subject=${subject}`)
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
      <Card
        sx={
          {
            // width: isMobile ? '50%' : '25%',
            // height: isMobile ? 'auto' : '50%',
          }
        }
      >
        <CardActionArea onClick={handleClassClick}>
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              padding='0 0 0 0.5em'
            >
              {section}
            </Typography>
            <Typography variant='body2' color='text.secondary' align='center'>
              {subject}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
