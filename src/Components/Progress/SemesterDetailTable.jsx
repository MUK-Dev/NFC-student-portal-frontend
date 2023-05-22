import { CircularProgress, Stack, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'

import useAuth from '../../Hooks/useAuth'

import { getSemesterRequest } from '../../Services/API/getSemesterRequest'
import { getSubjectRequest } from '../../Services/API/getSubjectRequest'

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

function createData(subject, teacher, hours) {
  return { subject, teacher, hours }
}

export default function SemesterDetailTable() {
  const { token, user } = useAuth()
  const [semesterId, setSemesterId] = useState()
  const [enable, setEnable] = useState(false)
  const [show, setShow] = useState(false)
  const session_id = user?.session
  const [rows, setRows] = useState([])

  const {
    isLoading: isProgramLoading,
    isError: isProgramError,
    data: programData,
  } = useQuery(['semester', session_id, token], () =>
    getSemesterRequest(token, session_id),
  )
  useEffect(() => {
    if (isProgramLoading || isProgramError) return
    setSemesterId(programData.semester_id)
    setEnable(true)
  }, [programData])

  const {
    isLoading: isSubjectLoading,
    isError: isSubjectError,
    data: subjectData,
  } = useQuery(
    ['subject', semesterId, token],
    () => getSubjectRequest(token, semesterId),
    {
      enabled: enable,
    },
  )
  useEffect(() => {
    if (
      isProgramLoading ||
      isProgramError ||
      isSubjectLoading ||
      isSubjectError ||
      !subjectData
    )
      return
    setRows(
      subjectData?.map(row => createData(row.title, row.teacher, row.hours)),
    )
    setShow(true)
  }, [subjectData])

  return (
    <>
      {(isSubjectLoading || !show) && (
        <Stack
          width='100%'
          direction='row'
          justifyContent='center'
          padding='1em'
        >
          <CircularProgress />
        </Stack>
      )}
      {show && (
        <TableContainer sx={{ height: '100%', width: '100%' }}>
          <Table stickyHeader aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align='left'
                  sx={{ padding: '2%', width: '40%' }}
                >
                  Subject
                </StyledTableCell>
                <StyledTableCell
                  align='left'
                  sx={{ padding: '2%', width: '40%' }}
                >
                  Teacher
                </StyledTableCell>
                <StyledTableCell
                  align='center'
                  sx={{ padding: '2%', width: '40%' }}
                >
                  Hours
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflowY: 'auto' }}>
              {rows.length === 0 ? (
                <StyledTableRow>
                  <StyledTableCell
                    align='left'
                    sx={{ padding: '1%' }}
                  ></StyledTableCell>
                  <StyledTableCell align='left' sx={{ padding: '1%' }}>
                    No Subject Found
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    sx={{ padding: '1%' }}
                  ></StyledTableCell>
                </StyledTableRow>
              ) : (
                rows.map(row => (
                  <StyledTableRow key={row.subject}>
                    <StyledTableCell align='left' sx={{ padding: '1%' }}>
                      {row.subject}
                    </StyledTableCell>
                    <StyledTableCell align='left' sx={{ padding: '1%' }}>
                      {row.teacher}
                    </StyledTableCell>
                    <StyledTableCell align='center' sx={{ padding: '1%' }}>
                      {row.hours}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
