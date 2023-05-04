import axios from 'axios'

export const generateSubjectReportRequest = async (token, subjectId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/attendance/subject-report`,
    data: { subjectId },
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
