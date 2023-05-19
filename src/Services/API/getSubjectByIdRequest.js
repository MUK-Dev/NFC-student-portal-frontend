import axios from 'axios'

export const getSubjectById = async (token, subjectId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/subjects/${subjectId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
