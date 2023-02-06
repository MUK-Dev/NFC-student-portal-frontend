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

const Program = () => {
  const [title, subtitle] = useState()

  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography position='center' variant='h3'>
              Program Registeration
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
                <label>Start Date:</label>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    type='yy/mm/dd'
                    placeholder='2022/02/09'
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
                <label>Duration:</label>
                <FormControl fullWidth>
                  <Select>
                    <MenuItem value={10}>2 years</MenuItem>
                    <MenuItem value={20}>4 years</MenuItem>
                    <MenuItem value={30}>5 years</MenuItem>
                    value={title}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Program Title:</label>
                <FormControl fullWidth>
                  <Select>
                    <MenuItem value={10}>BS Computer Science</MenuItem>
                    <MenuItem value={20}>BS Architecture</MenuItem>
                    <MenuItem value={30}>Bio-medical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Program Type:</label>
                <FormControl fullWidth>
                  <Select>
                    <MenuItem value={10}>BS</MenuItem>
                    <MenuItem value={20}>MS</MenuItem>
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

export default Program
