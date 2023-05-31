import axios from 'axios'

export const getAllAttendanceSheets = async token => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/all-sheets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
