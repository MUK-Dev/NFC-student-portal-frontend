import axios from 'axios'

export const updateSubjectRequest = async (token, subjectId, dto) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/subjects/${subjectId}`,
    method: 'PUT',
    data: dto,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
