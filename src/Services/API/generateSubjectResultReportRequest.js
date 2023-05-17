import axios from 'axios'

export const generateSubjectResultReportRequest = async (token, sheetId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/result/subject-report`,
    data: { sheetId },
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
