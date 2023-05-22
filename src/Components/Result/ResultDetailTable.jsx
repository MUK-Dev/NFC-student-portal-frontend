import { Button } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useState } from 'react'

import MarkDialogBox from '../DialogBox/MarkDialogBox'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function createData(id, subject, teacher, gpa, grade) {
  return { id, subject, teacher, gpa, grade }
}

export default function ResultDetailTable(props) {
  const [value, setValue] = useState()
  const resultListRows = []
  const resultList = props.resultList
  const result = props.result

  const overallResult = props.overallResult
  resultList.map(row =>
    resultListRows.push(
      createData(
        row._id,
        row.subject_title,
        row.theory_teacher,
        row.gpa,
        row.grade,
      ),
    ),
  )

  return (
    <>
      <TableContainer sx={{ height: '100%', width: '100%' }}>
        <Table stickyHeader aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell
                align='left'
                sx={{ padding: '2%', width: '30%' }}
              >
                Subject
              </StyledTableCell>
              <StyledTableCell
                align='left'
                sx={{ padding: '2%', width: '30%' }}
              >
                Teacher
              </StyledTableCell>
              <StyledTableCell
                align='center'
                sx={{ padding: '2%', width: '20%' }}
              >
                GPA
              </StyledTableCell>
              <StyledTableCell
                align='left'
                sx={{ padding: '2%', width: '20%' }}
              >
                Grade
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflowY: 'auto' }}>
            {resultListRows.map((row, i) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align='left' sx={{ padding: '1%' }}>
                  {row.subject}
                </StyledTableCell>
                <StyledTableCell align='left' sx={{ padding: '1%' }}>
                  {row.teacher}
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ padding: '1%' }}>
                  <Button onClick={e => setValue(resultList[i])}>
                    {row.gpa}
                  </Button>
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ padding: '1%' }}>
                  {row.grade}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell
                align='left'
                sx={{ padding: '1%' }}
              ></StyledTableCell>
              <StyledTableCell align='left' sx={{ padding: '1%' }}>
                SGPA
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                {result?.sGPA}
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                {result?.sGrade}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell
                align='left'
                sx={{ padding: '1%' }}
              ></StyledTableCell>
              <StyledTableCell align='left' sx={{ padding: '1%' }}>
                CGPA
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                {overallResult?.cGPA}
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                {overallResult?.cGrade}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell
                align='left'
                sx={{ padding: '1%' }}
              ></StyledTableCell>
              <StyledTableCell align='left' sx={{ padding: '1%' }}>
                PCGPA
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                {overallResult?.pcGPA === 0
                  ? result?.sGPA
                  : overallResult?.pcGPA}
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                {overallResult?.pcGrade === 'F'
                  ? result?.sGrade
                  : overallResult?.pcGrade}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <MarkDialogBox open={!!value} value={value} onClose={() => setValue()} />
    </>
  )
}
