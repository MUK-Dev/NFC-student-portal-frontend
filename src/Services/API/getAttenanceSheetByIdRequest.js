import axios from 'axios'

export const getAttendanceSheetByIdRequest = async (token, sheetId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/sheet/${sheetId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
