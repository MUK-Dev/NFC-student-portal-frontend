import axios from 'axios'

export const getSubjectRequest = async (token, semesterId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/student/subject`,
    method: 'POST',
    data: { semesterId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
