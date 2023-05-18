import axios from 'axios'

export const getAllSemesters = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/all-semesters`,
  )

  return data
}
