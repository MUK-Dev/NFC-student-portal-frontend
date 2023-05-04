import { Button, Grid, LinearProgress, Paper, TextField } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

import ResultDialogBox from '../../Components/DialogBox/MarksErrorDialogBox'
import MarksErrorDialogBox from '../../Components/DialogBox/MarksErrorDialogBox'
import ResultErrorDialogBox from '../../Components/DialogBox/ResultErrorDialogBox'

import useAuth from '../../Hooks/useAuth'

import { getMarksSheet } from '../../Services/API/marksSheetRequest'
import { postMarksRequest } from '../../Services/API/postMarksRequest'

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

export default function ClassResult() {
  let [searchParams, setSearchParams] = useSearchParams()
  const department = searchParams.get('department')
  const session = searchParams.get('session')
  const program = searchParams.get('program')
  const semester = searchParams.get('semester')
  const section = searchParams.get('section')
  const subject = searchParams.get('subject')
  const Session = searchParams.get('session_title')
  const Program = searchParams.get('program_abbreviation')
  // console.log(session)
  const [studentsList, setStudentsList] = useState([])
  const [selectValue, SetSelectValue] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorModal, setErrorModal] = useState(false)

  const { user, token } = useAuth()
  const { data, error, isError, isLoading } = useQuery(
    ['marks-sheet', section, subject],
    () =>
      getMarksSheet(token, {
        session,
        program,
        section,
      }),
    {
      enabled: !!token,
      staleTime: 1000 * 60 * 60 * 24,
    },
  )
  useEffect(() => {
    console.log('Use Effect')
    if (isError || isLoading) return
    setStudentsList(data)
  }, [data])

  const setValue = (i, val, para) => {
    setStudentsList(previousList => {
      const newList = [...previousList]
      newList[i][para] = val
      return newList
    })
  }
  // console.log(studentsList)

  const submitMarks = async () => {
    console.log('Final Submit')
    setIsSubmitting(prev => true)
    const dto = {
      date: new Date(),
      department: department,
      program: program,
      session: session,
      semester: semester,
      subject: subject,
      section: section,
      teacher: user._id,
      list: studentsList,
    }

    try {
      const res = await postMarksRequest(token, dto)
      setIsSubmitting(prev => false)
    } catch (err) {
      setErrorModal(err.response.data.message)
      setIsSubmitting(prev => false)
    }
  }

  const handleSubmit = () => {
    console.log(studentsList)
    let shouldBreak = false
    studentsList?.map((row, i) => {
      if (shouldBreak) return
      if (
        row.mids > 30 ||
        row.finals > 50 ||
        row.sessional > 20 ||
        row.mids === '' ||
        row.finals === '' ||
        row.sessional === '' ||
        row.mids < 0 ||
        row.finals < 0 ||
        row.sessional < 0
      ) {
        console.log(row)
        SetSelectValue(prev => row)
        setShowModal(true)
        shouldBreak = true
        return row
      }
      return null
    })
    if (!shouldBreak) {
      submitMarks()
    }
  }

  return (
    <>
      <Grid>
        <Paper sx={{ height: '77vh', position: 'relative', paddingY: '4px' }}>
          {(isLoading || isSubmitting) && (
            <LinearProgress
              sx={{
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          )}
          <TableContainer sx={{ height: '100%' }}>
            <Table stickyHeader aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align='left'
                    sx={{ padding: '2%', width: '20%' }}
                  >
                    Student Roll No.
                  </StyledTableCell>
                  <StyledTableCell
                    align='left'
                    sx={{ padding: '2%', width: '20%' }}
                  >
                    Student Name
                  </StyledTableCell>
                  <StyledTableCell
                    align='left'
                    sx={{ padding: '2%', width: '20%' }}
                  >
                    Mid Marks
                  </StyledTableCell>
                  <StyledTableCell
                    align='left'
                    sx={{ padding: '2%', width: '20%' }}
                  >
                    Final Marks
                  </StyledTableCell>
                  <StyledTableCell
                    align='left'
                    sx={{ padding: '2%', width: '20%' }}
                  >
                    Sessional Marks
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflowY: 'auto' }}>
                {studentsList?.map((row, i) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell align='left' sx={{ padding: '1%' }}>
                      {Session}-{Program}-{row.rollNo}
                    </StyledTableCell>
                    <StyledTableCell align='left' sx={{ padding: '1%' }}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align='center' sx={{ padding: '1%' }}>
                      <TextField
                        id='outlined-basic'
                        label='Mid Marks'
                        variant='outlined'
                        required
                        onChange={e => setValue(i, e.target.value, 'mids')}
                      />
                    </StyledTableCell>
                    <StyledTableCell align='center' sx={{ padding: '1%' }}>
                      <TextField
                        id='outlined-basic'
                        label='Final Marks'
                        variant='outlined'
                        required
                        onChange={e => setValue(i, e.target.value, 'finals')}
                      />
                    </StyledTableCell>
                    <StyledTableCell align='center' sx={{ padding: '1%' }}>
                      <TextField
                        id='outlined-basic'
                        label='Sessional Marks'
                        variant='outlined'
                        required
                        onChange={e => setValue(i, e.target.value, 'sessional')}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Button
          variant='contained'
          sx={{
            width: '100%',
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          }}
          disableElevation
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <MarksErrorDialogBox
          open={showModal}
          onClose={() => setShowModal(prev => !prev)}
          value={selectValue}
        />
        <ResultErrorDialogBox
          open={!!errorModal}
          text={errorModal}
          onClose={() => setErrorModal(prev => !prev)}
        />
      </Grid>
    </>
  )
}
