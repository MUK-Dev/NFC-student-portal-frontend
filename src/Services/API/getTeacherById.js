import axios from 'axios'

export const getTeacherById = async (token, teacherId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/teachers/${teacherId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
