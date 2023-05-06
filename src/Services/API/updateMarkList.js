import axios from 'axios'

export const updateMarkListRequest = async (token, sheetId, marksDTO) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/marks/student/${sheetId}`,
    method: 'PATCH',
    data: marksDTO,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
