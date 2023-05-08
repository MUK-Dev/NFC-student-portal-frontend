import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Grid, Paper, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import React from 'react'
import { useQuery } from 'react-query'

import ResultDetailTable from '../../Components/Result/ResultDetailTable'

import useAuth from '../../Hooks/useAuth'

import { getStudentResultRequest } from '../../Services/API/getStudentResultRequest'

const StudentDetailProgress = () => {
  const semesterArray = [1, 2, 3, 4, 5, 6, 7, 8]

  const { token } = useAuth()

  const { isError, isLoading, data } = useQuery(
    ['student-result', token],
    () => getStudentResultRequest(token),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )
  console.log(data)

  const resultsBySemester = {}
  if (data) {
    for (let result of data) {
      if (!resultsBySemester[result.semester_title]) {
        resultsBySemester[result.semester_title] = []
      }
      resultsBySemester[result.semester_title].push(result)
    }

    console.log(resultsBySemester)
  }
  return (
    <div>
      {Object.keys(resultsBySemester)?.map((row, i) => (
        <Accordion container='true' gap='2em' key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography variant='h6' align='center'>
              Semester {row} Details
            </Typography>
          </AccordionSummary>

          <Paper
            sx={{
              padding: '1em',
            }}
          >
            <AccordionDetails>
              <ResultDetailTable result={resultsBySemester[row]} />
            </AccordionDetails>
          </Paper>
        </Accordion>
      ))}
    </div>
  )
}

export default StudentDetailProgress
