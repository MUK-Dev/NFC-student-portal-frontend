import axios from 'axios'

export const getDepartments = async () => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/departments`,
    method: 'GET',
  })
  return data
}
