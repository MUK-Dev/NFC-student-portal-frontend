import { useTheme } from '@mui/material'
import Chart from 'react-apexcharts'

const BarChart = ({ series }) => {
  const theme = useTheme()
  return (
    <Chart
      options={{
        chart: {
          width: '100%',
          id: 'basic-bar',
          toolbar: {
            show: false,
          },
          stacked: true,
          parentHeightOffset: 0,
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
          theme.palette.warning.main,
          theme.palette.success.main,
          theme.palette.error.main,
        ],
      }}
      series={series}
      type='bar'
      height='80%'
      width='100%'
    />
  )
}

export default BarChart
