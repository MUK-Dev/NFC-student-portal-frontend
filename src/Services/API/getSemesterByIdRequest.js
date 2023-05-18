import axios from 'axios'

export const getSemesterById = async (token, semesterId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/semesters/${semesterId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
