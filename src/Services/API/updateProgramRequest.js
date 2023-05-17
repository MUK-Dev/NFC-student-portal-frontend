import axios from 'axios'

export const updateProgramRequest = async (token, programId, dto) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/programs/${programId}`,
    method: 'PUT',
    data: dto,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
