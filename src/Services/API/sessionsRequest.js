import axios from 'axios'

export const getSessions = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sessions`)
  return data
}
