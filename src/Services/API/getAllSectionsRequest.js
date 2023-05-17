import axios from 'axios'

export const getAllSections = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/all-sections`,
  )

  return data
}
