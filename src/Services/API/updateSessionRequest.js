import axios from 'axios'

export const updateSessionRequest = async (token, sessionId, dto) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/sessions/${sessionId}`,
    method: 'PUT',
    data: dto,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
