import axios from 'axios'

export const repeaterMarkRequest = async (token, sheetId, marksDTO) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/repeater_marks/student/${sheetId}`,
    method: 'POST',
    data: { marksDTO },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
