import axios from 'axios'

export const updateSectionRequest = async (token, sectionId, dto) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/sections/${sectionId}`,
    method: 'PUT',
    data: dto,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
