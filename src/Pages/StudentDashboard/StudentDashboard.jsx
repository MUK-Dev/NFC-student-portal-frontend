import {
  DocumentScanner,
  FactCheck,
  Grading,
  Scanner,
  TrendingUp,
} from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

import AreaChart from '../../Components/Charts/AreaChart'
import Progress from '../../Components/Progress/Progress'

import useAuth from '../../Hooks/useAuth'

import { getStudentChartDataRequest } from '../../Services/API/getStudentChartData'

const data = [
  {
    icon: <DocumentScanner sx={{ width: 50, height: 50 }} />,
    link: '/student/scanner',
    title: 'QR Scanner',
  },
  {
    icon: <FactCheck sx={{ width: 50, height: 50 }} />,
    link: '/student/attendance',
    title: 'Attendance',
  },
  {
    icon: <TrendingUp sx={{ width: 50, height: 50 }} />,
    link: '/student/progress',
    title: 'Progress',
  },
  {
    icon: <Grading sx={{ width: 50, height: 50 }} />,
    link: '/student/detail-progress',
    title: 'Result',
  },
]

const Dashboard = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const { token } = useAuth()

  const { data: chartData } = useQuery(
    ['student-chart-data', token],
    () => getStudentChartDataRequest(token),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )

  return (
    <Grid container direction='column' width='100%' gap='1em'>
      <Grid item>
        <Paper
          component={motion.div}
          initial={{ filter: 'blur(5px)' }}
          animate={{ filter: 'blur(0px)' }}
          sx={{ height: { xs: 'auto', md: '40vh' }, padding: '2em' }}
        >
          <Progress />
        </Paper>
      </Grid>
      <Grid item>
        <Grid
          container
          direction={isMobile ? 'column' : 'row'}
          width='100%'
          gap='1em'
          justifyContent='space-between'
        >
          <Grid item flexGrow={1} sx={{ width: isMobile ? '100%' : '45%' }}>
            <Paper
              component={motion.div}
              initial={{ filter: 'blur(5px)' }}
              animate={{ filter: 'blur(0px)' }}
              sx={{
                minHeight: '40vh',
                padding: '1em 0 0 0',
              }}
            >
              <AreaChart
                series={[
                  {
                    name: 'Presents',
                    data: chartData ?? [],
                  },
                ]}
              />
            </Paper>
          </Grid>
          <Grid item sx={{ width: isMobile ? '100%' : '35%' }}>
            <Grid
              container
              spacing={2}
              justifyContent='stretch'
              minHeight='41.7vh'
            >
              {data.map((item, i) => (
                <Grid
                  item
                  xs={6}
                  key={item.link}
                  component={motion.div}
                  initial={{ filter: 'blur(5px)' }}
                  animate={{ filter: 'blur(0px)' }}
                >
                  <Tooltip placement='top' title={item.title}>
                    <Card sx={{ height: '100%' }}>
                      <CardActionArea
                        sx={{ p: '1em', textAlign: 'center', height: '100%' }}
                        onClick={() => navigate(item.link)}
                      >
                        {item.icon}
                      </CardActionArea>
                    </Card>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Dashboard
