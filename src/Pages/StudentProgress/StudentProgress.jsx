import { Button, Grid, Paper, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { object } from 'yup'

import BarChart from '../../Components/Charts/BarChart'
// import Scheduler from 'react-mui-scheduler';
// import { useState } from 'react';
import Progress from '../../Components/Progress/Progress'
import SemesterDetailTable from '../../Components/Progress/SemesterDetailTable'

import useAuth from '../../Hooks/useAuth'

import { getStudentResultRequest } from '../../Services/API/getStudentResultRequest'

const StudentProgress = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [result, setResult] = useState({})
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const { isError, isLoading, data } = useQuery(
    ['student-result', token],
    () => getStudentResultRequest(token, user?._id),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )

  useEffect(() => {
    if (data) {
      setResult(data?.result)
    }
  }, [data])

  return (
    <Grid container direction='column' width='100%' gap='1em'>
      <Grid item>
        <Paper sx={{ height: { xs: 'auto', md: '40vh' }, padding: '2em' }}>
          <Progress />
        </Paper>
      </Grid>
      <Grid item>
        <Grid
          container
          width='100%'
          gap='1em'
          direction={isMobile ? 'column' : 'row'}
          justifyContent='space-between'
        >
          <Grid item flexGrow={1} sx={{ width: isMobile ? '100%' : '45%' }}>
            <Paper
              sx={{
                height: '40vh',
                padding: '1em',
              }}
            >
              <SemesterDetailTable />
            </Paper>
          </Grid>
          <Grid item flexGrow={1} sx={{ width: isMobile ? '100%' : '45%' }}>
            <Paper
              sx={{
                height: '40vh',
                padding: '1em 0 0 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <BarChart
                series={[
                  {
                    name: 'Semester 1',
                    data: [parseFloat(result[1]?.sGPA) || 0],
                  },
                  {
                    name: 'Semester 2',
                    data: [0, parseFloat(result[2]?.sGPA) || 0],
                  },
                  {
                    name: 'Semester 3',
                    data: [0, 0, parseFloat(result[3]?.sGPA) || 0],
                  },
                  {
                    name: 'Semester 4',
                    data: [0, 0, 0, parseFloat(result[4]?.sGPA) || 0],
                  },
                  {
                    name: 'Semester 5',
                    data: [0, 0, 0, 0, parseFloat(result[5]?.sGPA) || 0],
                  },
                  {
                    name: 'Semester 6',
                    data: [0, 0, 0, 0, 0, parseFloat(result[6]?.sGPA) || 0],
                  },
                  {
                    name: 'Semester 7',
                    data: [0, 0, 0, 0, 0, 0, parseFloat(result[7]?.sGPA) || 0],
                  },
                  {
                    name: 'Semester 8',
                    data: [
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      parseFloat(result[8]?.sGPA) || 0,
                    ],
                  },
                ]}
              />
              <Button
                variant='contained'
                sx={{
                  width: '100%',
                  marginTop: '1em',
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                }}
                onClick={() => navigate('/student/detail-progress')}
                disableElevation
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StudentProgress
