import axios from 'axios'

export const updateStudentRequest = async (token, studentId, dto) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/students/${studentId}`,
    method: 'PUT',
    data: dto,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
