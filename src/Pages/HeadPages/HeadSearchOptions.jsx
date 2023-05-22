import { CardActionArea, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import * as React from 'react'
import { useNavigate } from 'react-router'
import { useParams, useSearchParams } from 'react-router-dom'

import audienceImage from '../../Assets/Images/audience.png'
import notesImage from '../../Assets/Images/notes.png'
import updateStudentImage from '../../Assets/Images/update-student.png'

export default function HeadSearchOptions() {
  const navigate = useNavigate()
  const { studentId } = useParams()

  return (
    <>
      <Grid container gap='1em' justifyContent='space-around'>
        <Grid item flexGrow='1'>
          <Card
            component={motion.div}
            initial={{ x: -20, filter: 'blur(10px)' }}
            animate={{ x: 0, filter: 'blur(0px)' }}
          >
            <CardActionArea
              sx={{ p: '1em', textAlign: 'center' }}
              onClick={() => navigate(`/head/search/${studentId}/attendance`)}
            >
              <img src={audienceImage} width={80} height={80} />

              <Typography variant='h6'>See Students Attendence</Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item flexGrow='1'>
          <Card
            component={motion.div}
            initial={{ x: 20, filter: 'blur(10px)' }}
            animate={{ x: 0, filter: 'blur(0px)' }}
          >
            <CardActionArea
              sx={{ p: '1em', textAlign: 'center' }}
              onClick={() =>
                navigate(`/student/detail-progress?studentId=${studentId}`)
              }
            >
              <img src={notesImage} width={80} height={80} />
              <Typography variant='h6'>See Students Result</Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Grid container paddingTop='1em'>
        <Grid item flexGrow='1'>
          <Card
            component={motion.div}
            initial={{ y: 20, filter: 'blur(10px)' }}
            animate={{ y: 0, filter: 'blur(0px)' }}
          >
            <CardActionArea
              sx={{ p: '1em', textAlign: 'center' }}
              onClick={() => navigate(`/head/search/${studentId}/update`)}
            >
              <img src={updateStudentImage} width={80} height={80} />

              <Typography variant='h6'>Update student information</Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
