import axios from 'axios'

export const generateStudentResultReportRequest = async token => {
  console.log('here1')
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/student-result/report`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  console.log('here2', data)
  return data
}
