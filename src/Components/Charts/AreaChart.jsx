import { useTheme } from '@mui/material'
import Chart from 'react-apexcharts'

const AreaChart = ({ series }) => {
  const theme = useTheme()
  return (
    <Chart
      options={{
        chart: {
          width: '100%',
          id: 'basic-area',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {},
        },
        xaxis: {
          categories: [
            15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
          ].reverse(),
        },
        colors: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.error.main,
          theme.palette.warning.main,
        ],
      }}
      series={series}
      type='area'
      height='95%'
      width='100%'
    />
  )
}

export default AreaChart
