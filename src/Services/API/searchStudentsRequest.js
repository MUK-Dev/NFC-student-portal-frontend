import axios from 'axios'

export const searchStudentRequest = async (token, searchDTO) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/students/search`,
    method: 'POST',
    data: searchDTO,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
