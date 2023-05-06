import axios from 'axios'

export const getResultSheetsDataRequest = async token => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/result-sheets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
