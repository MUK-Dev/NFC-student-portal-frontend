import axios from 'axios'

export const getDepartmentById = async (token, departmentId) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/departments/${departmentId}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
