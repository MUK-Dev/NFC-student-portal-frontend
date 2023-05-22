import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import * as React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

import useAuth from '../../Hooks/useAuth'

import { searchStudentRequest } from '../../Services/API/searchStudentsRequest'

import RepeaterMark from '../RepeaterMark/RepeaterMark'

export default function RepeaterStudentDialogBox(props) {
  const { onClose, selectedValue, open } = props
  const fieldRef = useRef('')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('name')
  const { token } = useAuth()

  const options = [
    {
      value: 'name',
      label: 'Name',
    },
    {
      value: 'rollNo',
      label: 'Roll no',
    },
  ]

  const handleSearch = e => {
    e.preventDefault()
    setQuery(fieldRef.current.value)
  }

  let displayType
  if (type === 'rollNo') displayType = 'roll no'
  else if (type === 'name') displayType = 'name'

  const { isError, isLoading, data } = useQuery(
    ['students', query, type],
    () => searchStudentRequest(token, { type, query }),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token && query !== '',
    },
  )

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Mark Repeater Students</DialogTitle>
      <Stack width='100%'>
        <Box component='form' onSubmit={handleSearch} sx={{ width: '100%' }}>
          <Stack direction='row' padding='1em'>
            <Select
              id='outlined-select-currency'
              value={type}
              onChange={e => setType(e.target.value)}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              fullWidth
              placeholder='Name or Roll no'
              inputRef={fieldRef}
            />
            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Stack>
        </Box>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {isLoading && (
            <Stack width='100%' alignItems='center' margin='2em 0'>
              <CircularProgress />
            </Stack>
          )}
          {data?.length > 0 && !isLoading ? (
            !isLoading &&
            !isError &&
            data?.map((student, i) => (
              <Accordion container='true' gap='2em' key={i}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Avatar alt={student?.name} src={student?.avatar} />
                  <Typography variant='h6' align='center'>
                    {student?.name} ({student?.session.session_title}-
                    {student?.program.program_abbreviation}-{student?.rollNo})
                  </Typography>
                </AccordionSummary>
                <Paper
                  sx={{
                    padding: '1em',
                  }}
                >
                  <AccordionDetails>
                    <RepeaterMark
                      subject={props.subject}
                      student={student}
                      sheetId={props.sheetId}
                    />
                  </AccordionDetails>
                </Paper>
              </Accordion>
            ))
          ) : query === '' ? (
            <Typography color='error' align='center'>
              Enter the {displayType} of student
            </Typography>
          ) : (
            <Typography color='error' align='center'>
              Could not find student by that {displayType}
            </Typography>
          )}
        </List>
      </Stack>
    </Dialog>
  )
}
