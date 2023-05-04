import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Grid, Paper, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import React from 'react'

import ResultDetailTable from '../../Components/Result/ResultDetailTable'

const StudentDetailProgress = () => {
  const semesterArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div>
      {semesterArray?.map((row, i) => (
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
              <ResultDetailTable />
            </AccordionDetails>
          </Paper>
        </Accordion>
      ))}
    </div>
  )
}

export default StudentDetailProgress
