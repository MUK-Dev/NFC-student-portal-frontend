import axios from 'axios'

export const getSectionById = async (token, sectionId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/sections/${sectionId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
