import axios from 'axios'

export const generateSubjectReportRequest = async (
  token,
  subjectId,
  sectionId,
) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/attendance/subject-report`,
    data: { subjectId, sectionId },
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
