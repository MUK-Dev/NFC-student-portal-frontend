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



const Depart = () => {
  const [title,subtitle] = useState();
  
  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography  position= "center" variant='h3'>Department Registeration</Typography>
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
              <label>Dept Abbrev:</label>
              <FormControl fullWidth>
                <TextField
                  variant='outlined'
                  type='text'
                  placeholder='CS'
                  value={subtitle}
                />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
              <label>Dept Name:</label>
              <FormControl fullWidth>
                <TextField
                  variant='outlined'
                  type='text'
                  placeholder='Architecture'
                  value={title}

                />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
              <label>Dept Latitude:</label>
              <FormControl fullWidth>
                <TextField
                  variant='outlined'
                  type='number'
                  placeholder='21'
                  fullWidth
                />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
              <label>No. of Programs:</label>
              <FormControl fullWidth>
                <TextField
                  variant='outlined'
                  type='number'
                  placeholder='3'
                  fullWidth
                />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
              <label>Dept Longitude:</label>
              <FormControl fullWidth>
                <TextField
                  variant='outlined'
                  type='text'
                  placeholder='637'
                  fullWidth
                />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
              <label>Dept Description:</label>
              <FormControl fullWidth>
                <TextField
                  variant='outlined'
                  type='text'
                  placeholder='This department delivers courses related to Computers'
                  fullWidth
                />
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

export default Depart;
