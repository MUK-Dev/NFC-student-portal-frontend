import SearchIcon from '@mui/icons-material/Search'
import { Grid, Select, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import * as React from 'react'

const currencies = [
  {
    value: 'By Name',
    label: 'Name',
  },
  {
    value: 'By Roll Number',
    label: 'Roll no',
  },
]

export default function Parent_Home() {
  return (
    <Grid container>
      <Grid item flexGrow={1}>
        <Stack>
          {/* <Searchbar/> */}
          <Stack direction='row'>
            <Select
              style={{ borderRadius: '0px 0px 0px 0px' }}
              id='outlined-select-currency'
              defaultValue='By Name'
              helperText='Name or Roll no.'
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              fullWidth
              placeholder='Search Google Maps'
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              inputProps={{
                'aria-label': 'search here',
                style: {},
              }}
            />
            <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Stack>
          {/* <StudentsList /> */}
        </Stack>
      </Grid>
      <Grid item md={3} xs={12}>
        <Paper>StudentsList</Paper>
      </Grid>
    </Grid>
  )
}
