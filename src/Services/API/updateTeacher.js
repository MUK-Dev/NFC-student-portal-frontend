import axios from 'axios'

export const updateTeacherRequest = async (token, teacherId, dto) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/teachers/${teacherId}`,
    method: 'PUT',
    data: dto,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
