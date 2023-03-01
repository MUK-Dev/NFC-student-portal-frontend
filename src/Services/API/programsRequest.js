import axios from 'axios'

export const getPrograms = async department => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/programs?department=${department}`,
  )
  return data
}
