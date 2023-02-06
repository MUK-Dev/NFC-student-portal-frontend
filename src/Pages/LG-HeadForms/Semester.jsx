import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

const Semester = () => {
  const [title, subtitle] = useState()

  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography position='center' variant='h3'>
              Semester Registeration
            </Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Session:</label>
                <FormControl fullWidth>
                  <Select>
                    <MenuItem value={10}>2k19</MenuItem>
                    <MenuItem value={20}>2k20</MenuItem>
                    <MenuItem value={30}>2k21</MenuItem>
                    <MenuItem value={30}>2k22</MenuItem>
                    value={title}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Semester Start:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='yy/mm/dd'
                    placeholder='12-10-2021'
                    value={subtitle}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Dept Id:</label>
                <FormControl fullWidth>
                  <Select>
                    <MenuItem value={10}>01</MenuItem>
                    <MenuItem value={20}>02</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Semester End:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='yy/mm/dd'
                    placeholder='12-10-2021'
                    value={subtitle}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Program Id:</label>
                <FormControl fullWidth>
                  <Select>
                    <MenuItem value={10}>01</MenuItem>
                    <MenuItem value={20}>02</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Semester Type:</label>
                <FormControl fullWidth>
                  <Select>
                    <MenuItem value={10}>1st</MenuItem>
                    <MenuItem value={20}>2nd</MenuItem>
                    <MenuItem value={30}>3rd</MenuItem>
                    <MenuItem value={40}>4th</MenuItem>
                    <MenuItem value={50}>5th</MenuItem>
                    <MenuItem value={60}>6th</MenuItem>
                    <MenuItem value={70}>7th</MenuItem>
                    <MenuItem value={80}>8th</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant='contained'
              sx={{ margin: '.5em .5em .5em 0' }}
              display='flex'
              justify-content='flex-end'
            >
              Save
            </Button>

            <Button
              variant='contained'
              sx={{ margin: '.5em .5em .5em 0' }}
              display='flex'
              justify-content='flex-end'
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Semester
