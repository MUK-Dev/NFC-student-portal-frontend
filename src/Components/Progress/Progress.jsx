import { Typography, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { Stack } from '@mui/system'
import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const steps = [
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7',
  'Semester 8',
]

const maxVal = 65

const Progress = () => {
  const [activeStep, setActiveStep] = useState(-1)
  const [value, setValue] = useState(0)
  const [bufferValue, setBufferValue] = useState(10)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const increaseValue = () => {
    setActiveStep(prev => {
      if (prev >= 6) return prev
      else {
        setTimeout(increaseValue, 500)
        return (prev += 1)
      }
    })
  }

  const increaseProgressValue = () => {
    setValue(prev => {
      if (prev >= maxVal) return prev
      else {
        setTimeout(increaseProgressValue, 15)
        return (prev += 1)
      }
    })
  }

  const increaseBufferValue = () => {
    setBufferValue(prev => {
      if (prev >= maxVal + 2) return prev
      else {
        setTimeout(increaseBufferValue, 15)
        return (prev += 1)
      }
    })
  }

  useEffect(() => {
    increaseValue()
    increaseProgressValue()
    increaseBufferValue()
  }, [])

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
          <Typography variant='h4' color=''>
            65%
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
        <Stack
        // sx={{ width: '25%' }}
        >
          <Typography variant='h5' align={isMobile ? 'left' : 'right'}>
            Expiry Date!
          </Typography>
          <Typography variant='h5' align={isMobile ? 'left' : 'right'}>
            12 Dec, 2022
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
