import axios from 'axios'

export const getStudentById = async (token, studentId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/students/${studentId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
