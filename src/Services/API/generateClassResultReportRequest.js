import axios from 'axios'

export const generateClassResultReportRequest = async (token, sheetId) => {
  console.log('here1', sheetId)
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/result/subject-report`,
    data: { sheetId },
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log('here2', data)

  return data
}
