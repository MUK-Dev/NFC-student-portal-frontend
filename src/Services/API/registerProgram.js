import axios from 'axios'

export const registerProgramRequest = async (token, d) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/programs`,
    method: 'POST',
    data: d,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
