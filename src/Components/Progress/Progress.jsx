import { Typography, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { Stack } from '@mui/system'
import moment from 'moment'
import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

import useAuth from '../../Hooks/useAuth'

import { getSemesterRequest } from '../../Services/API/getSemesterRequest'

const Progress = () => {
  const [activeStep, setActiveStep] = useState(-1)
  const [value, setValue] = useState(0)
  const [bufferValue, setBufferValue] = useState(10)
  const [selectedSemester, setSelectedSemester] = useState(0)
  const [maxVal, setMaxVal] = useState(0)
  const [endDate, setEndDate] = useState()
  const theme = useTheme()
  const { token, user } = useAuth()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const session_id = user?.session
  const program_type = user?.program.type

  const steps = []
  let semester = 0
  if (program_type === '1 Year') {
    semester = 2
  } else if (program_type === '2 Year') {
    semester = 4
  } else if (program_type === '3 Year') {
    semester = 6
  } else if (program_type === '4 Year') {
    semester = 8
  } else if (program_type === '5 Year') {
    semester = 10
  }
  for (let index = 0; index < semester; index++) {
    steps.push(`Semester ${index + 1}`)
  }

  const {
    isLoading: isProgramLoading,
    isError: isProgramError,
    data: programData,
  } = useQuery(['semester', session_id, token], () =>
    getSemesterRequest(token, session_id),
  )

  const increaseValue = sSemester => {
    setActiveStep(prev => {
      if (prev >= sSemester - 1) {
        return prev
      } else {
        setTimeout(() => increaseValue(sSemester), 500)
        return (prev += 1)
      }
    })
  }

  const increaseProgressValue = p => {
    setValue(prev => {
      if (prev >= p) return prev
      else {
        setTimeout(() => increaseProgressValue(p), 15)
        return (prev += 1)
      }
    })
  }

  const increaseBufferValue = p => {
    setBufferValue(prev => {
      if (prev >= p + 3) return prev
      else {
        setTimeout(() => increaseBufferValue(p), 15)
        return (prev += 1)
      }
    })
  }
  useEffect(() => {
    if (isProgramLoading || isProgramError) return
    setSelectedSemester(parseInt(programData.semester_title))
    setMaxVal(parseInt(programData.percentage))
    setEndDate(moment(new Date(programData.ending)))
    increaseValue(parseInt(programData.semester_title))
    increaseProgressValue(parseInt(programData.percentage))
    increaseBufferValue(parseInt(programData.percentage))
  }, [programData])

  return (
    <Stack
      direction={isMobile ? 'row' : 'column'}
      sx={{
        height: '100%',
        width: '100%',
      }}
      gap='2em'
      justifyContent='space-between'
    >
      <Stack
        direction={isMobile ? 'column' : 'row'}
        width='100%'
        justifyContent='space-between'
        flexGrow={1}
      >
        <Typography variant='h5' fontWeight={500} sx={{ width: '25%' }}>
          Current Semester
        </Typography>
        <Stack
          direction='column'
          gap='1em'
          alignItems='center'
          sx={{ width: isMobile ? null : '25%' }}
        >
          <Typography variant='h5' color=''>
            {maxVal} % Completed
          </Typography>
          <LinearProgress
            variant='buffer'
            value={value}
            valueBuffer={bufferValue}
            sx={{
              width: '100%',
            }}
          />
        </Stack>
        <Stack>
          <Typography variant='h5' align={isMobile ? 'left' : 'right'}>
            End Date
          </Typography>
          <Typography variant='h5' align={isMobile ? 'left' : 'right'}>
            {endDate?.format('LL')}
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ width: { xs: '50%', md: '100%' } }}>
        <Stepper
          orientation={isMobile ? 'vertical' : 'horizontal'}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Stack>
  )
}

export default Progress
