import { useTheme } from '@mui/material'
import Chart from 'react-apexcharts'

const AreaChart = ({ series }) => {
  const theme = useTheme()
  return (
    <Chart
      options={{
        chart: {
          width: '100%',
          id: 'attendance',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {},
        },
        dataLabels: {
          formatter: function (val, { ctx, seriesIndex, dataPointIndex, w }) {
            if (val === null) {
              return 0
            } else {
              return val
            }
          },
        },
        xaxis: {
          type: 'datetime',
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
