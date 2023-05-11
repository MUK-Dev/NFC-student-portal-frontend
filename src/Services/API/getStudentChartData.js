import axios from 'axios'

export const getStudentChartDataRequest = async token => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/attendance/student/chart-data`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
