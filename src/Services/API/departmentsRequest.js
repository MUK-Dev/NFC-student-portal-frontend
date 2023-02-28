import axios from 'axios'

export const getDepartments = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/departments`,
  )
  return data
}
