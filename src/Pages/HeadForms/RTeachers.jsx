import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import {
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

const icon = <CheckBoxOutlineBlank fontSize='small' />
const checkedIcon = <CheckBox fontSize='small' />

const RTeachers = () => {
  const [theory, setTheory] = useState()
  const [lab, setLab] = useState()

  const theoryEventHandler = e => {
    setTheory(e.target.checked)
  }
  const labEventHandler = e => {
    setLab(e.target.checked)
  }
  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography variant='h4'>Register Teacher in Subject</Typography>
            <Typography gutterBottom>Enter the Teacher details</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={Array.from(Array(20).keys()).map(i => ({
                    title: `Teacher ${i}`,
                  }))}
                  fullWidth
                  getOptionLabel={option => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      <Avatar
                        sx={{
                          marginRight: '1em',
                        }}
                      />
                      {option.title}
                    </li>
                  )}
                  renderInput={params => (
                    <TextField {...params} label='Teachers' />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select label='Department'>
                    <MenuItem value={10}>Computer Science</MenuItem>
                    <MenuItem value={20}>Mechanical Engineering</MenuItem>
                    <MenuItem value={30}>Electrical Engineering</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Program</InputLabel>
                  <Select label='Program'>
                    <MenuItem value={10}>BS</MenuItem>
                    <MenuItem value={20}>MS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Session</InputLabel>
                  <Select label='Session'>
                    <MenuItem value={10}>2k19</MenuItem>
                    <MenuItem value={20}>2k20</MenuItem>
                    <MenuItem value={20}>2k21</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Section</InputLabel>
                  <Select label='Session'>
                    <MenuItem value={10}>Blue</MenuItem>
                    <MenuItem value={20}>Red</MenuItem>
                    <MenuItem value={20}>Green</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Semester</InputLabel>
                  <Select label='Semester'>
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                    <MenuItem value={40}>4</MenuItem>
                    <MenuItem value={50}>5</MenuItem>
                    <MenuItem value={60}>6</MenuItem>
                    <MenuItem value={70}>7</MenuItem>
                    <MenuItem value={80}>8</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Subject</InputLabel>
                  <Select label='Subject'>
                    <MenuItem value={10}>
                      CS-111 Programming Fundamentals
                    </MenuItem>
                    <MenuItem value={20}>El-111 Basic Electronics</MenuItem>
                    <MenuItem value={30}>PK-111 Islamic Studies</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControlLabel
                  control={<Checkbox onChange={theoryEventHandler} />}
                  label='Theory'
                />
                <FormControlLabel
                  control={<Checkbox onChange={labEventHandler} />}
                  label='Lab'
                />
              </Grid>
              {theory && (
                <Grid item xs={12} md={6} padding='.5em'>
                  <Typography gutterBottom>Theory Credit Hours</Typography>
                  <Slider
                    aria-label='Theory Credit Hours'
                    valueLabelDisplay='auto'
                    marks
                    min={1}
                    max={5}
                  />
                </Grid>
              )}
              {lab && (
                <Grid item xs={12} md={6} padding='.5em'>
                  <Typography gutterBottom>Lab Credit Hours</Typography>
                  <Slider
                    aria-label='Theory Credit Hours'
                    valueLabelDisplay='auto'
                    marks
                    min={1}
                    max={5}
                  />
                </Grid>
              )}
            </Grid>

            <Button variant='contained' sx={{ margin: '.5em .5em .5em 0' }}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RTeachers
