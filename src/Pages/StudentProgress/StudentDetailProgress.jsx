import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Grid, Paper, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import ResultDetailTable from '../../Components/Result/ResultDetailTable'

import useAuth from '../../Hooks/useAuth'

import { getStudentResultRequest } from '../../Services/API/getStudentResultRequest'

const StudentDetailProgress = () => {
  const { token } = useAuth()
  const [resultList, setResultList] = useState({})
  const [result, setResult] = useState({})

  const { isError, isLoading, data } = useQuery(
    ['student-result', token],
    () => getStudentResultRequest(token),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )
  console.log('28', data)
  useEffect(() => {
    if (data) {
      setResultList(data?.detailResult)
      setResult(data?.result)
      console.log('34', data.detailResult)
      console.log('35', data.result)
    }
  }, [data])

  return (
    <div>
      {!isLoading &&
        !!data &&
        Object.keys(resultList)?.map((row, i) => (
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
                <ResultDetailTable
                  resultList={resultList[row]}
                  result={result[row]}
                />
              </AccordionDetails>
            </Paper>
          </Accordion>
        ))}
    </div>
  )
}

export default StudentDetailProgress
