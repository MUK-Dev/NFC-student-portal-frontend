import axios from 'axios'

export const searchRequest = async (token, queryDTO) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/students/search`,
    method: 'POST',
    data: queryDTO,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
