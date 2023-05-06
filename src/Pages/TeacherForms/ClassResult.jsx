import { Search } from '@mui/icons-material'
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  LinearProgress,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
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

import MarksErrorDialogBox from '../../Components/DialogBox/MarksErrorDialogBox'
import ResultDialogBox from '../../Components/DialogBox/ResultDialogBox'
import ResultErrorDialogBox from '../../Components/DialogBox/ResultErrorDialogBox'

import useAuth from '../../Hooks/useAuth'

import { getResultSheetByIdRequest } from '../../Services/API/getResultSheetByIdRequest'
import { getMarksSheet } from '../../Services/API/marksSheetRequest'
import { postMarksRequest } from '../../Services/API/postMarksRequest'
import { updateMarkListRequest } from '../../Services/API/updateMarkList'

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
  const program_abbreviation = searchParams.get('program_abbreviation')
  const session_title = searchParams.get('session_title')
  const section = searchParams.get('section')
  const subject = searchParams.get('subject')
  const sheetId = searchParams.get('sheetId')
  const editMode = !!sheetId
  const [studentsList, setStudentsList] = useState([])
  const [selectValue, SetSelectValue] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [success, setSuccess] = useState(false)
  const [search, setSearch] = useState('')
  const [proSession, setProSession] = useState({
    Program: '',
    Session: '',
  })

  const { user, token } = useAuth()

  const {
    isLoading: isSheetLoading,
    isError: isSheetError,
    data: sheetData,
  } = useQuery(
    ['sheet', sheetId, token],
    () => getResultSheetByIdRequest(token, sheetId),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: editMode,
    },
  )

  const { data, error, isError, isLoading } = useQuery(
    ['marks-sheet', section, subject],
    () =>
      getMarksSheet(token, {
        session,
        program,
        section,
      }),
    {
      enabled: !editMode,
      staleTime: 1000 * 60 * 60 * 24,
    },
  )
  useEffect(() => {
    if (isError || isLoading) return
    setStudentsList(data)
  }, [data])

  useEffect(() => {
    if (isSheetError || isSheetLoading || !editMode) return
    setStudentsList(sheetData.list)
    setProSession({
      Program: sheetData.program_abbreviation,
      Session: sheetData.session_title,
    })
  }, [sheetData])
  // console.log(studentsList)

  const dataList =
    !isLoading &&
    !isError &&
    !!studentsList &&
    studentsList
      ?.filter(r => {
        if (search === '') return true
        else if (
          editMode
            ? r?.student.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
              r?.student?.rollNo?.toLowerCase()?.includes(search?.toLowerCase())
            : r?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
              r?.rollNo?.toLowerCase()?.includes(search?.toLowerCase())
        )
          return true
      })
      ?.map((row, i) => (
        <StyledTableRow key={row._id}>
          {editMode ? (
            <>
              <StyledTableCell align='left' sx={{ padding: '1%' }}>
                {proSession.Session}-{proSession.Program}-{row.student.rollNo}
              </StyledTableCell>
              <StyledTableCell align='left' sx={{ padding: '1%' }}>
                {row.student.name}
              </StyledTableCell>
            </>
          ) : (
            <>
              <StyledTableCell align='left' sx={{ padding: '1%' }}>
                {session_title}-{program_abbreviation}-{row.rollNo}
              </StyledTableCell>
              <StyledTableCell align='left' sx={{ padding: '1%' }}>
                {row.name}
              </StyledTableCell>
            </>
          )}
          <StyledTableCell align='center' sx={{ padding: '1%' }}>
            <TextField
              id='outlined-basic'
              label='Mid Marks'
              variant='outlined'
              value={row.mids || ''}
              required
              onChange={e => setValue(i, e.target.value, 'mids')}
            />
          </StyledTableCell>
          <StyledTableCell align='center' sx={{ padding: '1%' }}>
            <TextField
              id='outlined-basic'
              label='Final Marks'
              variant='outlined'
              value={row.finals || ''}
              required
              onChange={e => setValue(i, e.target.value, 'finals')}
            />
          </StyledTableCell>
          <StyledTableCell align='center' sx={{ padding: '1%' }}>
            <TextField
              id='outlined-basic'
              label='Sessional Marks'
              variant='outlined'
              value={row.sessional || ''}
              required
              onChange={e => setValue(i, e.target.value, 'sessional')}
            />
          </StyledTableCell>
        </StyledTableRow>
      ))

  const setValue = (i, val, para) => {
    setStudentsList(previousList => {
      const newList = [...previousList]
      newList[i][para] = val
      return newList
    })
  }

  const updateMarks = async () => {
    setIsSubmitting(prev => true)
    const dto = {
      list: studentsList.map(s => ({
        mids: s.mids,
        finals: s.finals,
        sessional: s.sessional,
        student: s._id,
      })),
    }
    try {
      const res = await updateMarkListRequest(token, sheetId, dto)
      setIsSubmitting(prev => false)
      setSuccess(true)
    } catch (err) {
      setErrorModal(err.response.data.message)
      setIsSubmitting(prev => false)
    }
  }

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
      list: studentsList.map(s => ({
        mids: s.mids,
        finals: s.finals,
        sessional: s.sessional,
        student: s._id,
      })),
    }

    try {
      const res = await postMarksRequest(token, dto)
      setIsSubmitting(prev => false)
      setSuccess(true)
    } catch (err) {
      setErrorModal(err.response.data.message)
      setIsSubmitting(prev => false)
    }
  }

  const handleUpdate = () => {
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
        SetSelectValue(prev => row)
        setShowModal(true)
        shouldBreak = true
        return row
      }
      return null
    })
    if (!shouldBreak) {
      updateMarks()
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
        <Paper sx={{ height: '77vh', position: 'relative' }}>
          {(isLoading || isSubmitting || isSheetLoading) && (
            <LinearProgress
              sx={{
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          )}
          <Grid
            sx={{ height: '10%' }}
            container
            justifyContent='space-between'
            alignItems='center'
            padding='0.5em'
          >
            <Grid item>
              <Typography
                variant='h6'
                sx={{ textAlign: { xs: 'center', md: 'left' } }}
                gutterBottom
              >
                Enter Marks
              </Typography>
            </Grid>
            <Grid item>
              <FormControl
                sx={{ width: { xs: '100%', md: '30ch' } }}
                size='small'
                variant='outlined'
              >
                <OutlinedInput
                  size='small'
                  value={search}
                  endAdornment={
                    <InputAdornment position='end'>
                      <Search />
                    </InputAdornment>
                  }
                  onChange={e => setSearch(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <TableContainer sx={{ height: '90%' }}>
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
              <TableBody sx={{ overflowY: 'auto' }}>{dataList}</TableBody>
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
          onClick={editMode ? handleUpdate : handleSubmit}
        >
          {editMode ? 'Update' : 'Submit'}
        </Button>
        <MarksErrorDialogBox
          open={showModal}
          onClose={() => setShowModal(prev => !prev)}
          value={selectValue}
          Session={editMode ? proSession.Session : session_title}
          Program={editMode ? proSession.Program : program_abbreviation}
        />
        <ResultErrorDialogBox
          open={!!errorModal}
          text={errorModal}
          onClose={() => setErrorModal(prev => !prev)}
        />
        <ResultDialogBox open={success} />
      </Grid>
    </>
  )
}
