import axios from 'axios'

export const getStudentResultRequest = async (token, studentId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/student-result`,
    data: { studentId },
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
