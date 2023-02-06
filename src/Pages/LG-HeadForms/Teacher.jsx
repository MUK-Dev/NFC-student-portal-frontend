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

const Teacher = () => {
  const [title, subtitle] = useState()

  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography position='center' variant='h3'>
              Teacher Registeration
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
                <label>Program Id:</label>
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

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>First Name:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='text'
                    placeholder='Ayesha'
                    fullWidth
                    value={subtitle}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Last Name:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='text'
                    placeholder='Naeem'
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>City:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='text'
                    placeholder='Lahore'
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Gender:</label>
                <FormControl fullWidth>
                  <Select>
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                    value={title}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Address:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='text'
                    placeholder='Lahore'
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>State:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='text'
                    placeholder='Punjab'
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

export default Teacher
