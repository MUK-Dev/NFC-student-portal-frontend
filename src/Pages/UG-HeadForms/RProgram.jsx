import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

const RProgram = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const theme = useTheme();

  const drawer = (
    <Drawer
      anchor='right'
      open={showDrawer}
      onClose={() => setShowDrawer((prev) => !prev)}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {[
            'Untitled Session',
            'Untitled Session',
            'Untitled Session',
            'Untitled Session',
            'Untitled Session',
          ].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography variant='h4'>Register Program</Typography>
            <Typography gutterBottom>Enter the Program details</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select label='Department'>
                    <MenuItem value={10}>Computer Science</MenuItem>
                    <MenuItem value={20}>Mechanical Engineering</MenuItem>
                    <MenuItem value={20}>Electrical Engineering</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Program Title'
                  type='text'
                  placeholder='BSCS'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Program Type</InputLabel>
                  <Select label='Program Type'>
                    <MenuItem value={10}>1 Year</MenuItem>
                    <MenuItem value={20}>2 Year</MenuItem>
                    <MenuItem value={20}>3 Year</MenuItem>
                    <MenuItem value={20}>4 Year</MenuItem>
                    <MenuItem value={20}>5 Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <MobileDatePicker
                  label='Starting Date'
                  inputFormat='MM/DD/YYYY'
                  value={moment()}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>

              {/* <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Ending  Date'
                  type='text'
                  fullWidth
                  placeholder='mm/dd/yyyy'
                />
              </Grid> */}
            </Grid>

            <Button variant='contained' sx={{ margin: '.5em .5em .5em 0' }}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          height='100%'
          onClick={() => setShowDrawer((prev) => !prev)}
          sx={{
            cursor: 'pointer',
          }}
        >
          <Typography
            variant='caption'
            sx={{
              writingMode: 'vertical-rl',
            }}
          >
            Session
          </Typography>
          <ArrowForwardIos htmlColor={theme.palette.warning.main} />
        </Stack>
      </Grid>
      {drawer}
    </Grid>
  );
};

export default RProgram;
