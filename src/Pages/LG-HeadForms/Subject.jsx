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

const Subject = () => {
  const [title, subtitle] = useState()

  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography position='center' variant='h3'>
              Subject Registeration
            </Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
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
                <label>Subject:</label>
                <FormControl fullWidth>
                  <Select>
                    <MenuItem value={10}>Elective Subjects</MenuItem>
                  </Select>
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
                <label>Course Code:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='number'
                    placeholder='EL-221'
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Session Id:</label>
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
                <label>Course Title:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='text'
                    placeholder='Basic Electronics'
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Semester:</label>
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
                    value={subtitle}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Credit hrs:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='number'
                    placeholder='2'
                    fullWidth
                  />
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

export default Subject
