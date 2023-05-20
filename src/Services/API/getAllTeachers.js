import axios from 'axios'

export const getAllTeachers = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/all-teachers`,
  )

  return data
}
