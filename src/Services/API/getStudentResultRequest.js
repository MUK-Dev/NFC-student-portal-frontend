import axios from 'axios'

export const getStudentResultRequest = async token => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/student-result`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
