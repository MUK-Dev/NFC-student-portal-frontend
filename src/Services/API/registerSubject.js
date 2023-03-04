import axios from 'axios'

export const registerSubjectRequest = async (token, d) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/subjects`,
    method: 'POST',
    data: d,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
