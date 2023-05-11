import axios from 'axios'

export const getSubjects = async () => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/all-subjects`,
    method: 'GET',
  })

  return data
}
