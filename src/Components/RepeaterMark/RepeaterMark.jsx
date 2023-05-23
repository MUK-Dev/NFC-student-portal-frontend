import styled from '@emotion/styled'
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  tableCellClasses,
} from '@mui/material'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'

import useAuth from '../../Hooks/useAuth'

import { repeaterMarkRequest } from '../../Services/API/repeaterMarkRequest'

import ResultDialogBox from '../DialogBox/ResultDialogBox'
import ResultErrorDialogBox from '../DialogBox/ResultErrorDialogBox'

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

const RepeaterMark = props => {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const { user, token } = useAuth()
  const queryClient = useQueryClient()
  const [value, setValue] = useState({
    mids: '',
    sessional: '',
    finals: '',
    lab_final: '',
    lab_sessional: '',
  })

  const submitMarks = async () => {
    const dto = {
      subject: props.subject.subject._id,
      mark: {
        student: props.student._id,
        mids: value.mids,
        finals: value.finals,
        sessional: value.sessional,
        lab_final: value.lab_final,
        lab_sessional: value.lab_sessional,
      },
    }
    try {
      const res = await repeaterMarkRequest(token, props.sheetId, dto)
      queryClient.invalidateQueries(['sheet', props.sheetId, token])
      setSuccess(true)
    } catch (err) {
      setErrorModal(err.response.data.message)
    }
  }

  const handleSubmit = () => {
    let shouldBreak = true
    if (
      (props.subject.theory_hours > 0 &&
        (value.mids > 30 ||
          value.finals > 50 ||
          value.sessional > 20 ||
          value.mids === '' ||
          value.finals === '' ||
          value.sessional === '' ||
          value.mids < 0 ||
          value.finals < 0 ||
          value.sessional < 0)) ||
      (props.subject.lab_hours > 0 &&
        (value.lab_final > 50 ||
          value.lab_sessional > 50 ||
          value.lab_final === '' ||
          value.lab_sessional === '' ||
          value.lab_final < 0 ||
          value.lab_sessional < 0))
    ) {
      setError(true)
      shouldBreak = false
      return
    }
    if (shouldBreak) {
      submitMarks()
    }
  }
  return (
    <>
      <Table stickyHeader aria-label='customized table'>
        <TableHead>
          <TableRow sx={{ padding: '2%' }}>
            {props.subject.theory_hours > 0 && (
              <>
                <StyledTableCell align='center'>Mid Marks</StyledTableCell>
                <StyledTableCell align='center'>Final Marks</StyledTableCell>
                <StyledTableCell align='center'>
                  Sessional Marks
                </StyledTableCell>
              </>
            )}
            {props.subject.lab_hours > 0 && (
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
        <TableBody sx={{ overflowY: 'auto' }}>
          <StyledTableRow>
            {props.subject.theory_hours > 0 && (
              <>
                <StyledTableCell align='center' sx={{ padding: '1%' }}>
                  <TextField
                    id='outlined-basic'
                    label='Mid Marks'
                    variant='outlined'
                    placeholder='< 30'
                    value={value.mids}
                    required
                    onChange={e =>
                      setValue(prev => ({ ...prev, mids: e.target.value }))
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ padding: '1%' }}>
                  <TextField
                    id='outlined-basic'
                    label='Final Marks'
                    variant='outlined'
                    placeholder='< 50'
                    value={value.finals}
                    required
                    onChange={e =>
                      setValue(prev => ({ ...prev, finals: e.target.value }))
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ padding: '1%' }}>
                  <TextField
                    id='outlined-basic'
                    label='Sessional Marks'
                    variant='outlined'
                    placeholder='< 20'
                    value={value.sessional}
                    required
                    onChange={e =>
                      setValue(prev => ({ ...prev, sessional: e.target.value }))
                    }
                  />
                </StyledTableCell>
              </>
            )}
            {props.subject.lab_hours > 0 && (
              <>
                <StyledTableCell align='center' sx={{ padding: '1%' }}>
                  <TextField
                    id='outlined-basic'
                    label='Lab Final Marks'
                    variant='outlined'
                    placeholder='< 50'
                    value={value.lab_final}
                    required
                    onChange={e =>
                      setValue(prev => ({ ...prev, lab_final: e.target.value }))
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align='center' sx={{ padding: '1%' }}>
                  <TextField
                    id='outlined-basic'
                    label='Lab Sessional Marks'
                    variant='outlined'
                    placeholder='< 50'
                    value={value.lab_sessional}
                    required
                    onChange={e =>
                      setValue(prev => ({
                        ...prev,
                        lab_sessional: e.target.value,
                      }))
                    }
                  />
                </StyledTableCell>
              </>
            )}
          </StyledTableRow>
        </TableBody>
      </Table>
      <Stack
        direction={'row'}
        justifyContent={error ? 'space-between' : 'right'}
        width={'100%'}
      >
        {error && <Typography color='error'>Enter Valid Numbers</Typography>}
        <Button
          variant='contained'
          sx={{ margin: '1em' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
      <ResultDialogBox open={success} onClose={() => setSuccess(false)} />
      <ResultErrorDialogBox
        open={!!errorModal}
        onClose={() => setErrorModal(null)}
        text={errorModal}
      />
    </>
  )
}

export default RepeaterMark
