import axios from 'axios'

export const registerSemestemRequest = async (token, d) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/semestems`,
    method: 'POST',
    data: d,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
