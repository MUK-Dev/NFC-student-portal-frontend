import axios from 'axios'

export const getAllSubjects = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/all-subjects`,
  )

  return data
}
