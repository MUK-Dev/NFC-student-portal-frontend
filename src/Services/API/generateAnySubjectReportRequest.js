import axios from 'axios'

export const generateAnySubjectReportRequest = async (
  token,
  teacherId,
  subjectId,
  sectionId,
) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/attendance/any-subject-report`,
    data: { subjectId, sectionId, teacherId },
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
