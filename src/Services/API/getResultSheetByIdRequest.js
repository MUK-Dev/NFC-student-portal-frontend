import axios from 'axios'

export const getResultSheetByIdRequest = async (token, sheetId) => {
  console.log(sheetId)
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/result-sheet/${sheetId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  console.log(data)
  return data
}
