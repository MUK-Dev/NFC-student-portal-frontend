import { Button, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BarChart from '../../Components/Charts/BarChart';
// import Scheduler from 'react-mui-scheduler';
// import { useState } from 'react';
import Progress from '../../Components/Progress/Progress';
import SemesterDetailTable from '../../Components/Progress/SemesterDetailTable';

const StudentProgress = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  return (
    <Grid container direction='column' width='100%' gap='1em'>
      <Grid item>
        <Paper sx={{ height: { xs: 'auto', md: '40vh' }, padding: '2em' }}>
          <Progress />
        </Paper>
      </Grid>
      <Grid item>
        <Grid
          container
          width='100%'
          gap='1em'
          direction={isMobile ? 'column' : 'row'}
          justifyContent='space-between'
        >
          <Grid item flexGrow={1} sx={{ width: isMobile ? '100%' : '45%' }}>
            <Paper
              sx={{
                height: '40vh',
                padding: '1em',
                // height: '100%',
                // overflow: 'hidden',
                // maxWidth: { xs: 'inherit', md: '45vw' },
              }}
            >
              <SemesterDetailTable />
            </Paper>
          </Grid>
          <Grid item flexGrow={1} sx={{ width: isMobile ? '100%' : '45%' }}>
            <Paper
              sx={{
                height: '40vh',
                padding: '1em 0 0 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                // height: '100%',
                // flexGrow: 1,
                // overflow: 'hidden',
                // maxWidth: { xs: 'inherit', md: '45vw' },
              }}
            >
              <BarChart
                series={[
                  {
                    name: 'Semester 1',
                    data: [3.4, 0, 0, 0, 0, 0, 0, 0],
                  },
                  {
                    name: 'Semester 2',
                    data: [0, 3.3, 0, 0, 0, 0, 0, 0],
                  },
                  {
                    name: 'Semester 3',
                    data: [0, 0, 3, 0, 0, 0, 0, 0],
                  },
                  {
                    name: 'Semester 4',
                    data: [0, 0, 0, 3.3, 0, 0, 0, 0],
                  },
                ]}
              />
              <Button
                variant='contained'
                sx={{
                  width: '100%',
                  marginTop: '1em',
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                }}
                onClick={() => navigate('/student/detail-progress')}
                disableElevation
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StudentProgress;
