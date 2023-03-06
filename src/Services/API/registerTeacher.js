import axios from 'axios'

export const registerTeacherRequest = async (token, d) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/teacher/register`,
    method: 'POST',
    data: d,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
