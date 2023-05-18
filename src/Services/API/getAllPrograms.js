import axios from 'axios'

export const getAllPrograms = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/all-programs`,
  )

  return data
}
