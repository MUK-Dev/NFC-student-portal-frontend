import { Search } from '@mui/icons-material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {
  Button,
  FormControl,
  Grid,
  IconButton,
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
import { useQuery, useQueryClient } from 'react-query'
import { useSearchParams } from 'react-router-dom'

import MarksErrorDialogBox from '../../Components/DialogBox/MarksErrorDialogBox'
import RepeaterStudentDialogBox from '../../Components/DialogBox/RepeaterStudentDialogBox'
import ResultDialogBox from '../../Components/DialogBox/ResultDialogBox'
import ResultErrorDialogBox from '../../Components/DialogBox/ResultErrorDialogBox'

import useAuth from '../../Hooks/useAuth'

import { getResultSheetByIdRequest } from '../../Services/API/getResultSheetByIdRequest'
import { getSectionById } from '../../Services/API/getSectionByIdRequest'
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
  const { user, token } = useAuth()
  let [searchParams, setSearchParams] = useSearchParams()
  const department = searchParams.get('department')
  const session = searchParams.get('session')
  const program = searchParams.get('program')
  const semester = searchParams.get('semester')
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
  const queryClient = useQueryClient()

  const [repeat, setRepeat] = useState(false)
  const [proSession, setProSession] = useState({
    Program: searchParams.get('program_abbreviation'),
    Session: searchParams.get('session_title'),
    Section: searchParams.get('section_title'),
    Subject: searchParams.get('subject_title'),
  })
  const [subjectID, setSubjectID] = useState({
    Subject: subject,
  })

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
        subject,
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
      Section: sheetData.section_title,
      Subject: sheetData.subject_title,
    })
    setSubjectID({
      Subject: sheetData.subject_Id,
    })
  }, [sheetData])
  const selectedSubject = user?.subjects.filter(
    sub => sub.subject._id === subjectID.Subject,
  )[0]

  const setValue = (id, val, para) => {
    setStudentsList(previousList => {
      const newList = [...previousList]
      let i = 0
      for (let item of newList) {
        if (item._id == id) {
          break
        }
        i++
      }
      newList[i][para] = val
      return newList
    })
  }

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
      ?.map(row => (
        <StyledTableRow key={row._id}>
          <StyledTableCell align='left' sx={{ padding: '1%' }}>
            {proSession.Session}-{proSession.Program}-
            {editMode ? row.student.rollNo : row.rollNo}
          </StyledTableCell>
          <StyledTableCell align='left' sx={{ padding: '1%' }}>
            {editMode ? row.student.name : row.name}
          </StyledTableCell>
          {selectedSubject?.theory_hours > 0 && (
            <>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                <TextField
                  id='outlined-basic'
                  label='Mid Marks'
                  variant='outlined'
                  placeholder='< 30'
                  value={row.mids}
                  required
                  onChange={e => setValue(row._id, e.target.value, 'mids')}
                />
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                <TextField
                  id='outlined-basic'
                  label='Final Marks'
                  variant='outlined'
                  placeholder='< 50'
                  value={row.finals}
                  required
                  onChange={e => setValue(row._id, e.target.value, 'finals')}
                />
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                <TextField
                  id='outlined-basic'
                  label='Sessional Marks'
                  variant='outlined'
                  placeholder='< 20'
                  value={row.sessional}
                  required
                  onChange={e => setValue(row._id, e.target.value, 'sessional')}
                />
              </StyledTableCell>
            </>
          )}
          {selectedSubject?.lab_hours > 0 && (
            <>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                <TextField
                  id='outlined-basic'
                  label='Lab Final Marks'
                  variant='outlined'
                  placeholder='< 50'
                  value={row.lab_final}
                  required
                  onChange={e => setValue(row._id, e.target.value, 'lab_final')}
                />
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                <TextField
                  id='outlined-basic'
                  label='Lab Sessional Marks'
                  variant='outlined'
                  placeholder='< 50'
                  value={row.lab_sessional}
                  required
                  onChange={e =>
                    setValue(row._id, e.target.value, 'lab_sessional')
                  }
                />
              </StyledTableCell>
            </>
          )}
        </StyledTableRow>
      ))

  const updateMarks = async () => {
    setIsSubmitting(prev => true)
    const dto = {
      subject: subjectID.Subject,
      list: studentsList.map(s => ({
        mids: s.mids,
        finals: s.finals,
        sessional: s.sessional,
        student: s._id,
        lab_final: s.lab_final,
        lab_sessional: s.lab_sessional,
      })),
    }
    try {
      const res = await updateMarkListRequest(token, sheetId, dto)
      setIsSubmitting(prev => false)
      setSuccess(true)
      queryClient.invalidateQueries(['result-sheets', token])
      queryClient.invalidateQueries(['all-result-sheets', token])
    } catch (err) {
      console.log(err)
      setErrorModal(err.response.data.message)
      setIsSubmitting(prev => false)
    }
  }

  const submitMarks = async () => {
    setIsSubmitting(prev => true)
    const dto = {
      date: new Date(),
      department: department,
      program: program,
      session: session,
      semester: semester,
      subject: subject,
      section: section,
      theory_teacher: user?._id,
      lab_teacher: user?._id,
      list: studentsList.map(s => ({
        mids: s.mids,
        finals: s.finals,
        sessional: s.sessional,
        student: s._id,
        lab_final: s.lab_final,
        lab_sessional: s.lab_sessional,
      })),
    }

    try {
      const res = await postMarksRequest(token, dto)
      setIsSubmitting(prev => false)
      queryClient.invalidateQueries(['result-sheets', token])
      queryClient.invalidateQueries(['all-result-sheets', token])
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
        (selectedSubject.theory_hours > 0 &&
          (row.mids > 30 ||
            row.finals > 50 ||
            row.sessional > 20 ||
            row.mids === '' ||
            row.finals === '' ||
            row.sessional === '' ||
            row.mids < 0 ||
            row.finals < 0 ||
            row.sessional < 0)) ||
        (selectedSubject.lab_hours > 0 &&
          (row.lab_final > 50 ||
            row.lab_sessional > 50 ||
            row.lab_final === '' ||
            row.lab_sessional === '' ||
            row.lab_final < 0 ||
            row.lab_sessional < 0))
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
    let shouldBreak = false
    studentsList?.map((row, i) => {
      if (shouldBreak) return
      if (
        (selectedSubject.theory_hours > 0 &&
          (row.mids > 30 ||
            row.finals > 50 ||
            row.sessional > 20 ||
            row.mids === '' ||
            row.finals === '' ||
            row.sessional === '' ||
            row.mids < 0 ||
            row.finals < 0 ||
            row.sessional < 0)) ||
        (selectedSubject.lab_hours > 0 &&
          (row.lab_final > 50 ||
            row.lab_sessional > 50 ||
            row.lab_final === '' ||
            row.lab_sessional === '' ||
            row.lab_final < 0 ||
            row.lab_sessional < 0))
      ) {
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
                Enter Section {proSession.Section?.toUpperCase()} Marks{' '}
                <span style={{ padding: '0 0.75em' }}> {'=>'} </span>
                Subject: {proSession.Subject}
              </Typography>
            </Grid>
            <Grid item>
              {editMode && (
                <IconButton
                  aria-label='add'
                  color='primary'
                  padding='1em'
                  onClick={() => setRepeat(true)}
                >
                  <AddCircleIcon />
                </IconButton>
              )}
              <FormControl
                sx={{ width: { xs: '100%', md: '20ch' } }}
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
                <TableRow sx={{ padding: '2%' }}>
                  <StyledTableCell align='left' sx={{ width: '13%' }}>
                    Student Roll No.
                  </StyledTableCell>
                  <StyledTableCell align='left' sx={{ width: '16%' }}>
                    Student Name
                  </StyledTableCell>
                  {selectedSubject?.theory_hours > 0 && (
                    <>
                      <StyledTableCell align='center'>
                        Mid Marks
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Final Marks
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Sessional Marks
                      </StyledTableCell>
                    </>
                  )}
                  {selectedSubject?.lab_hours > 0 && (
                    <>
                      <StyledTableCell align='center'>
                        Lab Final Marks
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Lab Sessional Marks
                      </StyledTableCell>
                    </>
                  )}
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
          Session={proSession.Session}
          Program={proSession.Program}
        />
        <ResultErrorDialogBox
          open={!!errorModal}
          text={errorModal}
          onClose={() => setErrorModal(prev => !prev)}
        />
        <RepeaterStudentDialogBox
          open={repeat}
          onClose={() => setRepeat(prev => !prev)}
          sheetId={sheetId}
          subject={selectedSubject}
        />
        <ResultDialogBox open={success} />
      </Grid>
    </>
  )
}
