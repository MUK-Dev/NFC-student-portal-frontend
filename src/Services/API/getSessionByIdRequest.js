import axios from 'axios'

export const getSessionById = async (token, sessionId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/sessions/${sessionId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
