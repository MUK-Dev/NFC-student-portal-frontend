import axios from 'axios'

export const getProgramById = async (token, programId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/programs/${programId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
