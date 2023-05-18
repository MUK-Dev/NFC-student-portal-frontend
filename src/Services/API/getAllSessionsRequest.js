import axios from 'axios'

export const getAllSessions = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/all-sessions`,
  )

  return data
}
