import axios from 'axios'

export const generateStudentResultReportRequest = async token => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/student-result/report`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
