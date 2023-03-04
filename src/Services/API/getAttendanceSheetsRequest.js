import axios from 'axios'

export const getAttendanceSheetsDataRequest = async token => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sheets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
