import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem

} from '@mui/material';


const Session = () => {
  const [title,subtitle] = useState();
  
  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography  position= "center" variant='h3'>Session Registeration</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
              
            <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
              <label>Program Type:</label>
              <FormControl fullWidth>
              <Select>
                    <MenuItem value={10}>BS</MenuItem>
                    <MenuItem value={20}>MS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <label>Department</label>
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
              <label>Session Start:</label>
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
              <label>Session Title:</label>
              <FormControl fullWidth>
              <TextField
                  variant='outlined'
                  type='text'
                  value={subtitle}
                />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
              <label>Session End:</label>
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
              <label>Session Type:</label>
              <FormControl fullWidth>
              <Select>
                    <MenuItem value={10}>Spring</MenuItem>
                    <MenuItem value={20}>Fall</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button variant='contained' sx={{ margin: '.5em .5em .5em 0' }}  display= 'flex'
  justify-content= 'flex-end'>
              Save
            </Button>

            <Button variant='contained' sx={{ margin: '.5em .5em .5em 0' }}  display= 'flex'
  justify-content= 'flex-end'>
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
   
    </Grid>
  );
};

export default Session;
