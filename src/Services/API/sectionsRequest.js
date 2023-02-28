import axios from 'axios'

export const getSections = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sections`)
  return data
}
