import axios from 'axios'

export const getPrograms = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/programs`)
  return data
}
