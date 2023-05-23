import axios from 'axios'

export const getAllResultSheetsRequest = async token => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/result-sheets/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
