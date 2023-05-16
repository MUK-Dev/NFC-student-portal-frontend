import { useTheme } from '@emotion/react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import ResultDetailTable from '../../Components/Result/ResultDetailTable'

import useAuth from '../../Hooks/useAuth'
import useStudentResultPDFReport from '../../Hooks/useStudentResultPDFReport'

import { getStudentResultRequest } from '../../Services/API/getStudentResultRequest'

const StudentDetailProgress = () => {
  const { token, user } = useAuth()
  const [resultList, setResultList] = useState({})
  const [result, setResult] = useState({})
  const theme = useTheme()
  const [overallResult, setOverallResult] = useState({})
  const { generateStudentResultPDF, isGenerating, error } =
    useStudentResultPDFReport()

  const handleDownload = () => generateStudentResultPDF(user._id)

  const { isError, isLoading, data } = useQuery(
    ['student-result', token],
    () => getStudentResultRequest(token),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )

  useEffect(() => {
    if (data) {
      setResultList(data?.detailResult)
      setResult(data?.result)
      setOverallResult(data?.overall)
    }
  }, [data])

  return (
    <div>
      {isLoading ? (
        <Stack alignItems='center' width='100%'>
          <CircularProgress />
        </Stack>
      ) : (
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
                  overallResult={overallResult[row]}
                />
              </AccordionDetails>
            </Paper>
          </Accordion>
        ))
      )}
      {!(Object.keys(resultList).length === 0) && (
        <Stack direction={'row'} justifyContent='end' width={'100%'}>
          <Button
            variant='contained'
            sx={{ margin: '1em' }}
            onClick={handleDownload}
            disabled={isGenerating}
          >
            Download
          </Button>
        </Stack>
      )}
      {isGenerating && (
        <Stack direction={'row'} justifyContent='end' width={'100%'}>
          <Typography align='center' color={theme.palette.warning.main}>
            Generating report, this can take some time
          </Typography>
        </Stack>
      )}
    </div>
  )
}

export default StudentDetailProgress
