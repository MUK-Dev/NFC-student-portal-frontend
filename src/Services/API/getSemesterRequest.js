import axios from 'axios'

export const getSemesterRequest = async (token, session_id) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/student/semester`,
    method: 'POST',
    data: { session_id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
