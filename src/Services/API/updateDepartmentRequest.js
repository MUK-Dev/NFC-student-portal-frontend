import axios from 'axios'

export const updateDepartmentRequest = async (token, departmentId, dto) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/departments/${departmentId}`,
    method: 'PUT',
    data: dto,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
