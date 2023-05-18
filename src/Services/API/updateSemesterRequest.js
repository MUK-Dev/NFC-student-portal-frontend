import axios from 'axios'

export const updateSemesterRequest = async (token, semesterId, dto) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/semesters/${semesterId}`,
    method: 'PUT',
    data: dto,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
